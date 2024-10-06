import React, { useState } from 'react';
import { Container, Row, Col, Form, Button, Table } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

// Mock data for comments fetched from the backend
const mockCommentsData = {
  V001: [{ comment: 'Good service', ranking: 5, userId: 'user1' }],
  V002: [{ comment: 'Average experience', ranking: 3, userId: 'user2' }],
  V003: [{ comment: 'Excellent products', ranking: 5, userId: 'user3' }]
};

// Initial vendor data
const vendorsData = [
  { id: 'V001', name: 'Vendor A', ranking: 4.5 },
  { id: 'V002', name: 'Vendor B', ranking: 3.8 }
];

// Mock vendor credentials storage
const mockVendorCredentials = {};

// VendorManagement component
const VendorManagement = ({ isAdmin }) => {
  const [vendors, setVendors] = useState(vendorsData);
  const [newVendorId, setNewVendorId] = useState('');
  const [newVendorName, setNewVendorName] = useState('');
  const [generatedCredentials, setGeneratedCredentials] = useState(null);

  // Function to add a new vendor (Admin only)
  const addVendor = () => {
    if (newVendorId && newVendorName) {
      const newVendor = { id: newVendorId, name: newVendorName, ranking: 0 };
      const username = `${newVendorId}_user`;
      const password = `${Math.random().toString(36).substring(2, 8)}`;

      // Save the new vendor in the state
      setVendors([...vendors, newVendor]);

      // Store credentials in the mock storage
      mockVendorCredentials[newVendorId] = { username, password };
      setGeneratedCredentials({ username, password }); // Save generated credentials

      setNewVendorId(''); // Reset input fields
      setNewVendorName('');
    } else {
      alert('Vendor ID and Vendor Name cannot be empty.');
    }
  };

  return (
    <Container>
      <h1 className="my-4 text-center">Vendor Management</h1>

        <Row className="mb-5">
          <Col md={6}>
            <Form>
              <Form.Group className="mb-3">
                <Form.Label>Vendor ID</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter vendor ID"
                  value={newVendorId}
                  onChange={(e) => setNewVendorId(e.target.value)}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Vendor Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter vendor name"
                  value={newVendorName}
                  onChange={(e) => setNewVendorName(e.target.value)}
                />
              </Form.Group>
              <Button variant="primary" onClick={addVendor}>
                Add Vendor
              </Button>
            </Form>
          </Col>
        </Row>

      {/* Show generated username and password */}
      {generatedCredentials && (
        <Row className="mb-5">
          <Col md={6}>
            <h5>Generated Credentials</h5>
            <p>Username: {generatedCredentials.username}</p>
            <p>Password: {generatedCredentials.password}</p>
          </Col>
        </Row>
      )}

      {/* Vendor List */}
      <Row>
        <Col>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>#</th>
                <th>Vendor ID</th>
                <th>Vendor Name</th>
                <th>Average Ranking</th>
                <th>Customer Comments</th>
              </tr>
            </thead>
            <tbody>
              {vendors.map((vendor, index) => (
                <tr key={vendor.id}>
                  <td>{index + 1}</td>
                  <td>{vendor.id}</td>
                  <td>{vendor.name}</td>
                  <td>{vendor.ranking}</td>
                  <td>
                    <ul>
                      {mockCommentsData[vendor.id] ? (
                        mockCommentsData[vendor.id].map((comment, idx) => (
                          <li key={idx}>
                            {comment.comment} - <strong>Rating:</strong> {comment.ranking}
                          </li>
                        ))
                      ) : (
                        <li>No comments yet</li>
                      )}
                    </ul>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Col>
      </Row>
    </Container>
  );
};

export default VendorManagement;
