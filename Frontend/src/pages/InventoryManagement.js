import React, { useState, useEffect } from 'react';
import { Col, Row, Card, InputGroup, Badge } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { BsSearch } from 'react-icons/bs';
import Table from "../components/custom/CustomTable";
import { getInventoryService } from '../services/inventoryService';
import { getProductsService } from '../services/productService';
import { notify } from '../components/custom/ToastMessage';
import { updateInventoryService } from '../services/inventoryService'; // Import the update service
import axios from 'axios';
import jsPDF from 'jspdf';
import 'jspdf-autotable'; // Import the autoTable plugin for jsPDF

function InventoryManager() {
  const [inventoryData, setInventoryData] = useState([]);
  const [tableData, setTableData] = useState([]);
  const [productData, setProductData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [stockUpdate, setStockUpdate] = useState(0);

  useEffect(() => {
    fetchInventoryData();
    fetchProductData();
  }, []);

  const fetchProductData = async () => {
    setIsLoading(true);
    try {
      const response = await getProductsService();
      setProductData(response);
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchInventoryData = async () => {
    setIsLoading(true);
    try {
      const response = await getInventoryService();
      setInventoryData(response);
      setTableData(response);
    } catch (error) {
      console.error("Error fetching inventory data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const onSearchHandler = (e) => {
    const query = e.target.value.toLowerCase();
    setTableData(
      query
        ? inventoryData.filter(
            (item) =>
              productData?.find((p) => p.id === item.productId)?.name?.toLowerCase()?.includes(query) ||
              productData?.find((p) => p.id === item.productId)?.category?.toLowerCase()?.includes(query)
          )
        : inventoryData
    );
  };

  const handleStockUpdate = async () => {
    setIsSubmitting(true);
    try {
        const updatedProduct = {
            newQuantity: selectedProduct.quantity + stockUpdate
        };

        const response = await axios.put(`http://localhost:7163/api/inventory/${selectedProduct.productId}`, updatedProduct);
        
        if (response.status === 200) {
            notify('success', 'Stock updated successfully!');
            fetchInventoryData();
            setSelectedProduct(null);
            setStockUpdate(0);
        } else {
            notify('error', 'Failed to update stock!');
        }
    } catch (error) {
        notify('error', 'Error updating stock!');
        console.error('Error updating stock:', error);
    } finally {
        setIsSubmitting(false);
    }
  };

  // Function to generate and download the PDF report
  const generatePDF = () => {
    const doc = new jsPDF();

    // Add a title to the PDF
    doc.setFontSize(18);
    doc.text('Inventory Report', 14, 22);

    // Define the columns and rows for the table
    const columns = ["Product Name", "Price", "Quantity", "Category", "Stock Status"];
    const rows = inventoryData.map(item => {
      const product = productData.find(p => p.id === item.productId);
      const stockStatus = item.quantity > 5
        ? "In Stock"
        : item.quantity > 0
        ? "Low Stock"
        : "Out of Stock";
      return [
        product?.name || "Unknown",
        `$${product?.price?.toFixed(2) || 0.00}`,
        item.quantity,
        product?.category || "N/A",
        stockStatus
      ];
    });

    // Add the table to the PDF
    doc.autoTable({
      startY: 30,
      head: [columns],
      body: rows
    });

    // Save the PDF with a dynamic name
    doc.save(`Inventory_Report_${new Date().toLocaleDateString()}.pdf`);
  };

  const COLUMNS = [
    { label: "Name", renderCell: (item) => productData?.find((p) => p.id === item.productId)?.name },
    { label: "Price", renderCell: (item) => `$${productData?.find(p => p.id === item.productId)?.price?.toFixed(2) || 0.00}` },
    { label: "Quantity", renderCell: (item) => item.quantity },
    { label: "Category", renderCell: (item) => productData?.find((p) => p.id === item.productId)?.category },
    { label: "Stock Status", renderCell: (item) => (
      <Badge bg={item.quantity > 5 ? "success" : item.quantity > 0 ? "warning" : "danger"}>
        {item.quantity > 5 ? "In Stock" : item.quantity > 0 ? "Low Stock" : "Out of Stock"}
      </Badge>
    )},
    {
      label: "Action",
      renderCell: (item) => (
        <Button
          variant="primary"
          size="sm"
          onClick={() => setSelectedProduct(item)}
        >
          Update Stock
        </Button>
      ),
    },
  ];

  return (
    <Row className="px-5 pt-4">
      <Card body className="shadow p-3 mb-3 bg-white rounded">
        <Card.Title>
          <u>Inventory Management</u>
        </Card.Title>
        <Col md={12}>
          {/* Button to download the PDF */}
         
          {selectedProduct && (
            <Form
              onSubmit={(e) => {
                e.preventDefault();
                handleStockUpdate();
              }}
            >
              <Form.Group as={Row} className="mb-3">
                <Form.Label column sm="2">Product</Form.Label>
                <Col sm="4">
                  <Form.Control plaintext readOnly value={productData?.find(p => p.id === selectedProduct.productId)?.name} />
                </Col>
              </Form.Group>
              <Form.Group as={Row} className="mb-3">
                <Form.Label column sm="2">Current Stock</Form.Label>
                <Col sm="2">
                  <Form.Control plaintext readOnly value={selectedProduct.quantity} />
                </Col>
              </Form.Group>
              <Form.Group as={Row} className="mb-3">
                <Form.Label column sm="2">Update Stock</Form.Label>
                <Col sm="4">
                  <Form.Control
                    type="number"
                    value={stockUpdate}
                    onChange={(e) => setStockUpdate(Number(e.target.value))}
                  />
                </Col>
              </Form.Group>
              <Button variant="primary" type="submit" disabled={isSubmitting}>
                {isSubmitting ? 'Updating...' : 'Update Stock'}
              </Button>
            </Form>
          )}
        </Col>
        <hr />
        <Col md={12}>
          <Row className="mt-4 d-flex justify-content-between">
            <Col md={4}>
              <InputGroup className="mb-3">
                <InputGroup.Text>
                  <BsSearch />
                </InputGroup.Text>
                <Form.Control
                  type="text"
                  placeholder="Search by Name/Category"
                  onChange={onSearchHandler}
                />
              </InputGroup>
            </Col>
          </Row>
          {isLoading ? (
            <div>Loading...</div>
          ) : (
            <Table nodes={tableData} columns={COLUMNS} />
          )}
        </Col>
        <Button variant="success" onClick={generatePDF}>
            Download Inventory Report
          </Button>
      </Card>
    </Row>
    
  );
}

export default InventoryManager;
