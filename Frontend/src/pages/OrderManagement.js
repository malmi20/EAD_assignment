import React, { useState, useContext, useEffect } from "react";
import { Form, Button, Table, Modal } from "react-bootstrap";
import { AppContext } from "../context/AuthContext";
import { createOrderService } from "../services/orderService.js";
import { getProductsService } from "../services/productService.js";
import { getInventoryService } from "../services/inventoryService.js";
import { notify } from "../components/custom/ToastMessage.jsx";

function OrderManagement() {
  const initialOrder = {
    _id: "",
    customerId: "",
    customerName: "",
    items: [{ productId: "", quantity: 1 }],
    status: "Processing", // default status
    vendors: [], // List of vendors involved in the order
    partiallyDelivered: false, // Track if partially delivered
    deliveryAddress: "",
    totalAmount: 0,
  };

  const [orders, setOrders] = useState([]);
  const [currentOrder, setCurrentOrder] = useState(initialOrder);
  const [editMode, setEditMode] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [orderToCancel, setOrderToCancel] = useState(null);
  const [cancelNote, setCancelNote] = useState("");
  const [productData, setProductData] = useState([]);
  const [inventoryData, setInventoryData] = useState([]);

  const { user } = useContext(AppContext);
  const isCSR = user?.assignedRoles?.includes("CSR");
  const isAdmin = user?.assignedRoles?.includes("ADMIN");

  useEffect(() => {
    fetchProductData();
    fetchInventoryData();
  }, []);

  const fetchInventoryData = async () => {
    try {
      const response = await getInventoryService(); // Fetch inventory (same as product data, but focus on stock)
      setInventoryData(response);
    } catch (error) {
      console.error("Error fetching inventory data:", error);
    }
  };

  const fetchProductData = async () => {
    try {
      const response = await getProductsService();
      setProductData(response);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  // Calculate total amount
  const calculateTotalAmount = (items) => {
    return items.reduce((total, item) => {
      const product = productData.find((product) => product.id === item.productId);
      return total + (product ? product.price * item.quantity : 0);
    }, 0);
  };

  // Handle form submission for creating or updating an order
  const handleSubmit = async (e) => {
    e.preventDefault();
    const totalAmount = calculateTotalAmount(currentOrder.items);
    if (editMode) {
      // Update order
      setOrders(
        orders.map((order) =>
          order._id === currentOrder._id ? { ...currentOrder, totalAmount } : order
        )
      );
      setEditMode(false);
    } else {
      // Create new order
      const newOrder = {
        ...currentOrder,
        items: currentOrder.items.map((item) => item.productId), // Remove empty items
        // _id: Date.now().toString(), // Unique order ID
        totalAmount,
      };
      delete newOrder._id; // Remove customerId from the order
      await createOrderService(newOrder);
      setOrders([...orders, newOrder]);
    }
    resetForm();
  };

  // Reset form to initial state
  const resetForm = () => {
    setCurrentOrder(initialOrder);
    setEditMode(false);
  };

  // Edit an order
  const handleEdit = (order) => {
    if (order.status !== "Dispatched" && order.status !== "Delivered") {
      setCurrentOrder(order);
      setEditMode(true);
    } else {
      alert("Cannot edit the order after it is dispatched or delivered.");
    }
  };

  // Handle status update
  const updateOrderStatus = (orderId, status) => {
    setOrders(
      orders.map((order) =>
        order._id === orderId ? { ...order, status: status } : order
      )
    );
    notifyCustomer(orderId, status);
  };

  // Cancel an order (before it's dispatched or delivered)
  const cancelOrder = (order) => {
    if (order.status !== "Dispatched" && order.status !== "Delivered") {
      setOrders(orders.filter((o) => o._id !== order._id));
      setShowModal(false);
      notifyCustomer(order._id, "Cancelled");
    } else {
      alert("Cannot cancel the order after it is dispatched or delivered.");
    }
  };

  // Notify customer about order status
  const notifyCustomer = (orderId, status) => {
    const order = orders.find((o) => o._id === orderId);
    if (order) {
      alert(`Notification sent to customer: Order ${orderId} is now ${status}`);
    }
  };

  // Handle modal confirmation for canceling an order with a note
  const confirmCancelOrder = (order) => {
    setOrderToCancel(order);
    setShowModal(true);
  };

  // Mark order as partially delivered
  const markAsPartiallyDelivered = (order) => {
    setOrders(
      orders.map((o) =>
        o._id === order._id ? { ...o, partiallyDelivered: true, status: "Partially Delivered" } : o
      )
    );
    notifyCustomer(order._id, "Partially Delivered");
  };

  // Update CustomerId when customerName is typed
  const handleCustomerNameChange = (e) => {
    const customerName = e.target.value;
    setCurrentOrder({
      ...currentOrder,
      customerName,
      customerId: customerName.replace(/\s+/g, '').toLowerCase(),
    });
  };

  // Handle product selection change
  const handleProductChange = (index, productId) => {
    const inventoryItem = inventoryData.find(item => item.productId === productId);

    if (inventoryItem && inventoryItem.quantity > 0) {
      const updatedItems = [...currentOrder.items];
      updatedItems[index].productId = productId;
      setCurrentOrder({ ...currentOrder, items: updatedItems });
    } else {
      notify('warning', `Selected product is out of stock.`);
    }
  };

  // Handle quantity change
  const handleQuantityChange = (index, quantity) => {
    const updatedItems = [...currentOrder.items];
    const productId = updatedItems[index].productId;
    const inventoryItem = inventoryData.find(item => item.productId === productId);

    if (inventoryItem && quantity <= inventoryItem.quantity) {
      updatedItems[index].quantity = quantity;
      setCurrentOrder({ ...currentOrder, items: updatedItems });
    } else {
      notify('warning', `Current stock for ${productData.find(product => product.id === productId)?.name} is ${inventoryItem?.quantity}`);
    }
  };

  // Add a new product item to the order
  const addProductItem = () => {
    setCurrentOrder({
      ...currentOrder,
      items: [...currentOrder.items, { productId: "", quantity: 1 }]
    });
  };

  // Remove a product item from the order
  const removeProductItem = (index) => {
    const updatedItems = currentOrder.items.filter((_, i) => i !== index);
    setCurrentOrder({ ...currentOrder, items: updatedItems });
  };

  return (
    <div className="container mt-5">
      <h2>Order Management</h2>

      {/* Order Form */}
      {(isCSR || isAdmin) && <Form onSubmit={handleSubmit} className="mb-4">
        <Form.Group controlId="customerName" className="mb-3">
          <Form.Label>Customer Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter customer name"
            value={currentOrder.customerName}
            onChange={handleCustomerNameChange}
            required
          />
        </Form.Group>

        {currentOrder.items.map((item, index) => (
          <div key={index} className="mb-3">
            <Form.Group controlId={`product-${index}`} className="mb-3">
              <Form.Label>Product</Form.Label>
              <Form.Control
                as="select"
                value={item.productId}
                onChange={(e) => handleProductChange(index, e.target.value)}
                required
              >
                <option value="">Select a product</option>
                {productData?.map((product) => (
                  <option key={product.id} value={product.id}>
                    {product.name}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>

            <Form.Group controlId={`quantity-${index}`} className="mb-3">
              <Form.Label>Quantity</Form.Label>
              <Form.Control
                type="number"
                disabled={!item.productId}
                min="1"
                value={item.quantity}
                onChange={(e) => handleQuantityChange(index, parseInt(e.target.value, 10))}
                required
              />
            </Form.Group>

            <Button variant="danger" onClick={() => removeProductItem(index)}>
              Remove Product
            </Button>
          </div>
        ))}

        <Button variant="secondary" onClick={addProductItem}>
          Add Product
        </Button>

        <Form.Group controlId="deliveryAddress" className="mb-3">
          <Form.Label>Delivery Address</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter delivery address"
            value={currentOrder.deliveryAddress}
            onChange={(e) =>
              setCurrentOrder({ ...currentOrder, deliveryAddress: e.target.value })
            }
            required
          />
        </Form.Group>

        <Form.Group controlId="totalAmount" className="mb-3">
          <Form.Label>Total Amount</Form.Label>
          <Form.Control
            type="text"
            value={calculateTotalAmount(currentOrder.items)}
            readOnly
          />
        </Form.Group>

        <Button variant="primary" type="submit">
          {editMode ? "Update Order" : "Create Order"}
        </Button>
        <Button variant="secondary" className="ms-2" onClick={resetForm}>
          Clear
        </Button>
      </Form>}

      {/* Orders Table */}
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Order ID</th>
            <th>Customer Name</th>
            <th>Products</th>
            <th>Status</th>
            <th>Delivery Address</th>
            <th>Total Amount</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {orders?.map((order) => (
            <tr key={order._id}>
              <td>{order._id}</td>
              <td>{order.customerName}</td>
              <td>
                {order.items.map((item, index) => (
                  <div key={index}>
                    {productData.find(product => product.id === item.productId)?.name} - {item.quantity}
                  </div>
                ))}
              </td>
              <td>{order.status}</td>
              <td>{order.deliveryAddress}</td>
              <td>{order.totalAmount}</td>
              <td>
                <Button
                  variant="info"
                  size="sm"
                  onClick={() => handleEdit(order)}
                  disabled={order.status === "Dispatched" || order.status === "Delivered"}
                  className="me-2"
                >
                  Edit
                </Button>
                <Button
                  variant="warning"
                  size="sm"
                  onClick={() =>
                    updateOrderStatus(order._id, "Dispatched")
                  }
                  className="me-2"
                  disabled={order.status === "Dispatched" || order.status === "Delivered"}
                >
                  Dispatch
                </Button>
                {(isCSR || isAdmin) && <Button
                  variant="danger"
                  size="sm"
                  className="me-2"
                  onClick={() => confirmCancelOrder(order)}
                  disabled={order.status === "Dispatched" || order.status === "Delivered"}
                >
                  Cancel
                </Button>}
                <Button
                  variant="success"
                  size="sm"
                  onClick={() => markAsPartiallyDelivered(order)}
                  disabled={order.partiallyDelivered || order.status === "Delivered"}
                >
                  Mark as Partially Delivered
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {/* Cancel Confirmation Modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Cancel Order</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Are you sure you want to cancel the order for {orderToCancel?.customerName}?</p>
          <Form.Group controlId="cancelNote" className="mb-3">
            <Form.Label>Cancel Note</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter reason for cancellation"
              value={cancelNote}
              onChange={(e) => setCancelNote(e.target.value)}
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            No
          </Button>
          <Button
            variant="danger"
            onClick={() => cancelOrder(orderToCancel)}
          >
            Yes, Cancel
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default OrderManagement;