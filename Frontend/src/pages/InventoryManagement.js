import React, { useState, useEffect } from "react";
import { Form, Button, Table, Modal } from "react-bootstrap";

function InventoryManagement() {
  const initialProduct = {
    id: "",
    name: "",
    quantity: 0,
    lowStockThreshold: 5,
  };

  const [products, setProducts] = useState([]);
  const [pendingOrders, setPendingOrders] = useState([]);
  const [currentProduct, setCurrentProduct] = useState(initialProduct);
  const [editMode, setEditMode] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [productToDelete, setProductToDelete] = useState(null);

  // Simulate fetching pending orders from a backend
  useEffect(() => {
    // Example pending orders, should be replaced with actual data fetching
    setPendingOrders([{ id: "1", productId: "2", quantity: 2 }]);
  }, []);

  // Handle form submission for adding or updating a product
  const handleSubmit = (e) => {
    e.preventDefault();
    if (editMode) {
      // Update existing product
      setProducts(
        products.map((product) =>
          product.id === currentProduct.id ? currentProduct : product
        )
      );
      setEditMode(false);
    } else {
      // Create new product
      const newProduct = {
        ...currentProduct,
        id: Date.now().toString(), // Unique product ID
      };
      setProducts([...products, newProduct]);
    }
    resetForm();
  };

  // Reset form to initial state
  const resetForm = () => {
    setCurrentProduct(initialProduct);
    setEditMode(false);
  };

  // Edit a product
  const handleEdit = (product) => {
    setCurrentProduct(product);
    setEditMode(true);
  };

  // Remove a product
  const removeProduct = (product) => {
    if (!pendingOrders.some((order) => order.productId === product.id)) {
      setProducts(products.filter((p) => p.id !== product.id));
      setShowDeleteModal(false);
    } else {
      alert("Cannot remove a product that is part of pending orders.");
    }
  };

  // Handle low stock alert
  const checkLowStock = (product) => {
    if (product.quantity <= product.lowStockThreshold) {
      alert(`Low stock alert for ${product.name}. Notify vendor!`);
      // Notify vendor logic can be added here
    }
  };

  return (
    <div className="container mt-5">
      <h2>Inventory Management</h2>

      {/* Product Form */}
      <Form onSubmit={handleSubmit} className="mb-4">
        <Form.Group controlId="productName" className="mb-3">
          <Form.Label>Product Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter product name"
            value={currentProduct.name}
            onChange={(e) =>
              setCurrentProduct({ ...currentProduct, name: e.target.value })
            }
            required
          />
        </Form.Group>

        <Form.Group controlId="quantity" className="mb-3">
          <Form.Label>Quantity</Form.Label>
          <Form.Control
            type="number"
            min="0"
            value={currentProduct.quantity}
            onChange={(e) =>
              setCurrentProduct({
                ...currentProduct,
                quantity: parseInt(e.target.value, 10),
              })
            }
            required
          />
        </Form.Group>

        <Form.Group controlId="lowStockThreshold" className="mb-3">
          <Form.Label>Low Stock Threshold</Form.Label>
          <Form.Control
            type="number"
            min="1"
            value={currentProduct.lowStockThreshold}
            onChange={(e) =>
              setCurrentProduct({
                ...currentProduct,
                lowStockThreshold: parseInt(e.target.value, 10),
              })
            }
            required
          />
        </Form.Group>

        <Button variant="primary" type="submit">
          {editMode ? "Update Product" : "Add Product"}
        </Button>
        <Button variant="secondary" className="ms-2" onClick={resetForm}>
          Clear
        </Button>
      </Form>

      {/* Products Table */}
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Product ID</th>
            <th>Product Name</th>
            <th>Quantity</th>
            <th>Low Stock Threshold</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => {
            checkLowStock(product); // Check for low stock alert
            return (
              <tr key={product.id}>
                <td>{product.id}</td>
                <td>{product.name}</td>
                <td>{product.quantity}</td>
                <td>{product.lowStockThreshold}</td>
                <td>
                  <Button
                    variant="info"
                    size="sm"
                    onClick={() => handleEdit(product)}
                    className="me-2"
                  >
                    Edit
                  </Button>
                  <Button
                    variant="danger"
                    size="sm"
                    onClick={() => {
                      setProductToDelete(product);
                      setShowDeleteModal(true);
                    }}
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>

      {/* Delete Confirmation Modal */}
      <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Delete Product</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to delete the product{" "}
          {productToDelete?.name}?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>
            No
          </Button>
          <Button
            variant="danger"
            onClick={() => removeProduct(productToDelete)}
          >
            Yes, Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default InventoryManagement;
