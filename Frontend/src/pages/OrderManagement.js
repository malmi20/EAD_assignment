import React, { useState } from "react";
import { Form, Button, Table, Modal } from "react-bootstrap";

function OrderManagement() {
  const initialOrder = {
    id: "",
    customerName: "",
    product: "",
    quantity: 1,
    status: "Processing", // default status
    vendors: [], // List of vendors involved in the order
    partiallyDelivered: false, // Track if partially delivered
  };

  const [orders, setOrders] = useState([]);
  const [currentOrder, setCurrentOrder] = useState(initialOrder);
  const [editMode, setEditMode] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [orderToCancel, setOrderToCancel] = useState(null);
  const [cancelNote, setCancelNote] = useState("");

  // Handle form submission for creating or updating an order
  const handleSubmit = (e) => {
    e.preventDefault();
    if (editMode) {
      // Update order
      setOrders(
        orders.map((order) =>
          order.id === currentOrder.id ? currentOrder : order
        )
      );
      setEditMode(false);
    } else {
      // Create new order
      const newOrder = {
        ...currentOrder,
        id: Date.now().toString(), // Unique order ID
      };
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
        order.id === orderId ? { ...order, status: status } : order
      )
    );
    notifyCustomer(orderId, status);
  };

  // Cancel an order (before it's dispatched or delivered)
  const cancelOrder = (order) => {
    if (order.status !== "Dispatched" && order.status !== "Delivered") {
      setOrders(orders.filter((o) => o.id !== order.id));
      setShowModal(false);
      notifyCustomer(order.id, "Cancelled");
    } else {
      alert("Cannot cancel the order after it is dispatched or delivered.");
    }
  };

  // Notify customer about order status
  const notifyCustomer = (orderId, status) => {
    const order = orders.find((o) => o.id === orderId);
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
        o.id === order.id ? { ...o, partiallyDelivered: true, status: "Partially Delivered" } : o
      )
    );
    notifyCustomer(order.id, "Partially Delivered");
  };

  return (
    <div className="container mt-5">
      <h2>Order Management</h2>

      {/* Order Form */}
      <Form onSubmit={handleSubmit} className="mb-4">
        <Form.Group controlId="customerName" className="mb-3">
          <Form.Label>Customer Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter customer name"
            value={currentOrder.customerName}
            onChange={(e) =>
              setCurrentOrder({ ...currentOrder, customerName: e.target.value })
            }
            required
          />
        </Form.Group>

        <Form.Group controlId="product" className="mb-3">
          <Form.Label>Product</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter product name"
            value={currentOrder.product}
            onChange={(e) =>
              setCurrentOrder({ ...currentOrder, product: e.target.value })
            }
            required
          />
        </Form.Group>

        <Form.Group controlId="quantity" className="mb-3">
          <Form.Label>Quantity</Form.Label>
          <Form.Control
            type="number"
            min="1"
            value={currentOrder.quantity}
            onChange={(e) =>
              setCurrentOrder({
                ...currentOrder,
                quantity: parseInt(e.target.value, 10),
              })
            }
            required
          />
        </Form.Group>

        <Button variant="primary" type="submit">
          {editMode ? "Update Order" : "Create Order"}
        </Button>
        <Button variant="secondary" className="ms-2" onClick={resetForm}>
          Clear
        </Button>
      </Form>

      {/* Orders Table */}
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Order ID</th>
            <th>Customer Name</th>
            <th>Product</th>
            <th>Quantity</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order.id}>
              <td>{order.id}</td>
              <td>{order.customerName}</td>
              <td>{order.product}</td>
              <td>{order.quantity}</td>
              <td>{order.status}</td>
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
                    updateOrderStatus(order.id, "Dispatched")
                  }
                  className="me-2"
                  disabled={order.status === "Dispatched" || order.status === "Delivered"}
                >
                  Dispatch
                </Button>
                <Button
                  variant="danger"
                  size="sm"
                  onClick={() => confirmCancelOrder(order)}
                  disabled={order.status === "Dispatched" || order.status === "Delivered"}
                >
                  Cancel
                </Button>
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
