import React, { useState } from 'react';
import { Container, Row, Col, Form, Button, Table } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

// Assuming userId is available globally or passed as a prop.
const userId = 'currentCustomerId';

const vendorsData = [
  { id: 'V001', name: 'Vendor A', ranking: 4.5, comments: [{ comment: 'Good service', ranking: 5, userId: 'currentCustomerId' }] },
  { id: 'V002', name: 'Vendor B', ranking: 3.8, comments: [] }
];

const VendorManagement = ({ isAdmin }) => {
  const [vendors, setVendors] = useState(vendorsData);
  const [newVendorId, setNewVendorId] = useState('');
  const [newVendorName, setNewVendorName] = useState('');
  const [vendorInputs, setVendorInputs] = useState({}); // State to manage individual vendor inputs

  const [editingComment, setEditingComment] = useState(null); // Track the comment being edited

  // Function to add a new vendor (Admin only)
  const addVendor = () => {
    if (newVendorId && newVendorName) {
      const newVendor = { id: newVendorId, name: newVendorName, ranking: 0, comments: [] };
      setVendors([...vendors, newVendor]);
      setNewVendorId(''); // Reset input field
      setNewVendorName(''); // Reset input field
    } else {
      alert('Vendor ID and Vendor Name cannot be empty.');
    }
  };

  // Function to add a comment and ranking for a specific vendor
  const addCommentAndRanking = (vendorId) => {
    const { comment, ranking } = vendorInputs[vendorId] || {};
    if (comment && ranking) {
      const updatedVendors = vendors.map((vendor) => {
        if (vendor.id === vendorId) {
          const newComments = [...vendor.comments, { comment, ranking: parseInt(ranking), userId }];
          const newAvgRanking = calculateAverageRanking(newComments);
          return { ...vendor, comments: newComments, ranking: newAvgRanking };
        }
        return vendor;
      });
      setVendors(updatedVendors);
      setVendorInputs({ ...vendorInputs, [vendorId]: { comment: '', ranking: 0 } }); // Clear the input for the vendor
    } else {
      alert('Please enter a comment and a ranking.');
    }
  };

  // Calculate average ranking based on the comments
  const calculateAverageRanking = (comments) => {
    const totalRanking = comments.reduce((total, { ranking }) => total + ranking, 0);
    return (totalRanking / comments.length).toFixed(2);
  };

  // Function to handle input change for individual vendors
  const handleInputChange = (vendorId, field, value) => {
    setVendorInputs({
      ...vendorInputs,
      [vendorId]: {
        ...vendorInputs[vendorId],
        [field]: value
      }
    });
  };

  // Function to initiate editing of a comment
  const startEditComment = (vendorId, commentIndex) => {
    setEditingComment({ vendorId, commentIndex });
    const commentToEdit = vendors.find(v => v.id === vendorId).comments[commentIndex];
    setVendorInputs({ ...vendorInputs, [vendorId]: { comment: commentToEdit.comment } });
  };

  // Function to save the edited comment
  const saveEditedComment = (vendorId, commentIndex) => {
    const { comment } = vendorInputs[vendorId] || {};
    if (comment) {
      const updatedVendors = vendors.map((vendor) => {
        if (vendor.id === vendorId) {
          const updatedComments = vendor.comments.map((c, index) => {
            if (index === commentIndex) {
              return { ...c, comment };
            }
            return c;
          });
          return { ...vendor, comments: updatedComments };
        }
        return vendor;
      });
      setVendors(updatedVendors);
      setEditingComment(null); // Stop editing mode
      setVendorInputs({ ...vendorInputs, [vendorId]: { comment: '' } }); // Clear the input for the vendor
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
                <th>Comments</th>
                <th>Add Comment & Ranking</th>
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
                      {vendor.comments.map((comment, idx) => (
                        <li key={idx}>
                          {editingComment && editingComment.vendorId === vendor.id && editingComment.commentIndex === idx ? (
                            <>
                              <Form.Control
                                type="text"
                                value={vendorInputs[vendor.id]?.comment || ''}
                                onChange={(e) => handleInputChange(vendor.id, 'comment', e.target.value)}
                              />
                              <Button variant="success" onClick={() => saveEditedComment(vendor.id, idx)}>
                                Save
                              </Button>
                            </>
                          ) : (
                            <>
                              {comment.comment} - <strong>Rating:</strong> {comment.ranking}
                              {comment.userId === userId && (
                                <Button variant="link" onClick={() => startEditComment(vendor.id, idx)}>
                                  Edit
                                </Button>
                              )}
                            </>
                          )}
                        </li>
                      ))}
                    </ul>
                  </td>
                  <td>
                    <Form.Group>
                      <Form.Control
                        type="text"
                        placeholder="Add a comment"
                        value={vendorInputs[vendor.id]?.comment || ''}
                        onChange={(e) =>
                          handleInputChange(vendor.id, 'comment', e.target.value)
                        }
                      />
                      <Form.Control
                        type="number"
                        min="1"
                        max="5"
                        placeholder="Rank (1-5)"
                        className="mt-2"
                        value={vendorInputs[vendor.id]?.ranking || ''}
                        onChange={(e) =>
                          handleInputChange(vendor.id, 'ranking', e.target.value)
                        }
                      />
                      <Button
                        variant="success"
                        className="mt-2"
                        onClick={() => addCommentAndRanking(vendor.id)}
                      >
                        Submit
                      </Button>
                    </Form.Group>
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
