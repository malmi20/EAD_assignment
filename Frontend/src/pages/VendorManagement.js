import React, { useState, useContext, useEffect } from 'react';
import { Container, Row, Col, Form, Button, Table } from 'react-bootstrap';
import { AppContext } from "../context/AuthContext";
import axios from 'axios'; // for database interaction
import bcrypt from 'bcryptjs'; // for hashing
import 'bootstrap/dist/css/bootstrap.min.css';

// Mock data for comments fetched from the backend
const mockCommentsData = {
  V001: [{ comment: 'Good service', ranking: 5, userId: 'user1' }],
  V002: [{ comment: 'Average experience', ranking: 3, userId: 'user2' }],
  V003: [{ comment: 'Excellent products', ranking: 5, userId: 'user3' }]
};

// Function to generate a random password
const generatePassword = (length = 10) => {
  const charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()";
  let password = "";
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * charset.length);
    password += charset[randomIndex];
  }
  return password;
};

// VendorManagement component
const VendorManagement = () => {
  const { user } = useContext(AppContext);
  const isAdmin = user?.assignedRoles?.includes("ADMIN");
  const [vendors, setVendors] = useState([]);
  const [formData, setFormData] = useState({
    FirstName: '',
    LastName: '',
    UserName: '',
    Address: '',
    ContactNo: '',
  });
  const [generatedCredentials, setGeneratedCredentials] = useState(null);

  // Fetch vendors from the backend on component mount
  useEffect(() => {
    const fetchVendors = async () => {
      try {
        const response = await axios.get('/vendor'); // Adjust the endpoint as necessary
        setVendors(response.data);
        console.log(response.data); // Assume the response data is an array of vendors
      } catch (error) {
        console.error("Error fetching vendors:", error);
      }
    };
    fetchVendors();
  }, []);

  // Function to handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  // Function to add a new vendor and store in the database
  const addVendor = async () => {
    const { FirstName, UserName } = formData;

    if (FirstName && UserName) {
      // Auto-generate email and password
      const email = `${UserName}@vendor.com`; // Example email format
      const password = generatePassword(); // Generate random password

      // Hash the password before sending to the backend
      const hashedPassword = bcrypt.hashSync(password, 10);

      const newVendor = {
        FirstName,
        LastName: formData.LastName, // Optional
        UserName,
        Email: email,
        Address: formData.Address,
        ContactNo: formData.ContactNo,
        PasswordHash: hashedPassword, // Set the hashed password
        Roles: ['VENDOR'], // Assign vendor role
      };

      try {
        // Post the new vendor to the database
        await axios.post('/vendor', newVendor);
        setVendors([...vendors, { id: UserName, name: FirstName, ranking: 0 }]);
        setGeneratedCredentials({ email, password });
        
        // Show credentials to admin
        setFormData({
          FirstName: '',
          LastName: '',
          UserName: '',
          Address: '',
          ContactNo: '',
        });
      } catch (error) {
        console.error("Error adding vendor:", error);
      }
    } else {
      alert('First Name and User Name are required.');
    }
  };

  return (
    <Container className="mt-5">

      {isAdmin && (
        <Row className="mb-5">
          <Col md={8} lg={6} className="mx-auto">
            <Form className="shadow p-4 rounded border border-light">
              <Form.Group className="mb-3">
                <Form.Label>First Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter first name"
                  name="FirstName"
                  value={formData.FirstName}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Last Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter last name"
                  name="LastName"
                  value={formData.LastName}
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>User Name (Vendor ID)</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter user name"
                  name="UserName"
                  value={formData.UserName}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Address</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter address"
                  name="Address"
                  value={formData.Address}
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Contact No</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter contact number"
                  name="ContactNo"
                  value={formData.ContactNo}
                  onChange={handleChange}
                />
              </Form.Group>
              <Button variant="primary" onClick={addVendor} className="w-100">
                Add Vendor
              </Button>
            </Form>
          </Col>
        </Row>
      )}

      {/* Show generated email and password */}
      {generatedCredentials && (
        <Row className="mb-5">
          <Col md={6} className="mx-auto text-center">
            <div className="alert alert-success">
              <h5>Vendor created Successfully!</h5>
              <h5>Generated Credentials</h5>
              <div>
                <strong>Email:</strong> {generatedCredentials.email}
              </div>
              <div>
                <strong>Password:</strong> {generatedCredentials.password}
              </div>
            </div>
          </Col>
        </Row>
      )}

      {/* Vendor List */}
      <Row>
        <Col>
          <Table striped bordered hover responsive className="table-light">
            <thead className="bg-primary text-white">
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
                  <td>{vendor.userName}</td> {/* Use UserName for the ID */}
                  <td>{vendor.firstName}</td> {/* Use FirstName for the name */}
                  <td>{vendor.ranking || 0}</td> {/* Use ranking or default to 0 */}
                  <td>
                    <ul className="list-unstyled mb-0">
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
