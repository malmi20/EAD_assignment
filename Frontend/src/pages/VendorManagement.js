import React, { useState, useEffect } from "react";

// Mock Data (for vendors and customers)
const initialVendors = [
  { id: 1, name: "Vendor A", rankings: [], comments: [] },
  { id: 2, name: "Vendor B", rankings: [], comments: [] }
];

const VendorManagement = () => {
  const [vendors, setVendors] = useState(initialVendors);
  const [newVendorName, setNewVendorName] = useState("");
  const [isAdmin, setIsAdmin] = useState(true); // Change to 'false' if not admin

  // Customer state for adding rankings/comments
  const [currentVendor, setCurrentVendor] = useState(null);
  const [comment, setComment] = useState("");
  const [rank, setRank] = useState(0);
  const [isCommentEditable, setIsCommentEditable] = useState(false);

  // Add new vendor (Admin only)
  const addVendor = () => {
    if (newVendorName) {
      setVendors([...vendors, { id: vendors.length + 1, name: newVendorName, rankings: [], comments: [] }]);
      setNewVendorName("");
    }
  };

  // Handle ranking submission for a customer
  const submitRanking = (vendorId) => {
    const updatedVendors = vendors.map((vendor) => {
      if (vendor.id === vendorId) {
        // Prevent customer from changing their ranking after submission
        if (!vendor.rankings.some((r) => r.userId === 1)) {
          vendor.rankings.push({ userId: 1, rank: parseInt(rank) });
        }
        vendor.comments.push({ userId: 1, comment });
      }
      return vendor;
    });
    setVendors(updatedVendors);
    setCurrentVendor(null);
  };

  // Calculate average ranking
  const getAverageRanking = (vendor) => {
    const total = vendor.rankings.reduce((sum, r) => sum + r.rank, 0);
    return vendor.rankings.length ? (total / vendor.rankings.length).toFixed(1) : "No rankings yet";
  };

  // Handle comment editing for customer
  const editComment = (vendorId) => {
    const updatedVendors = vendors.map((vendor) => {
      if (vendor.id === vendorId) {
        const commentIndex = vendor.comments.findIndex((c) => c.userId === 1); // Assuming userId is 1 for now
        if (commentIndex !== -1) {
          vendor.comments[commentIndex].comment = comment;
        }
      }
      return vendor;
    });
    setVendors(updatedVendors);
    setCurrentVendor(null);
  };

  return (
    <div>
      {/* Admin Section for Vendor Creation */}
      {isAdmin && (
        <div>
          <h2>Admin - Add Vendor</h2>
          <input
            type="text"
            placeholder="New Vendor Name"
            value={newVendorName}
            onChange={(e) => setNewVendorName(e.target.value)}
          />
          <button onClick={addVendor}>Add Vendor</button>
        </div>
      )}

      {/* Customer Section for Ranking and Commenting */}
      <h2>Vendors</h2>
      <ul>
        {vendors.map((vendor) => (
          <li key={vendor.id}>
            <h3>{vendor.name}</h3>
            <p>Average Ranking: {getAverageRanking(vendor)}</p>
            <p>Customer Comments:</p>
            <ul>
              {vendor.comments.map((c, index) => (
                <li key={index}>
                  {c.comment} {c.userId === 1 && "(Your comment)"}
                </li>
              ))}
            </ul>
            <button onClick={() => setCurrentVendor(vendor)}>Rate & Comment</button>
          </li>
        ))}
      </ul>

      {/* Ranking & Comment Submission */}
      {currentVendor && (
        <div>
          <h3>Rate & Comment for {currentVendor.name}</h3>
          <label>Ranking (1-5):</label>
          <input
            type="number"
            value={rank}
            onChange={(e) => setRank(e.target.value)}
            disabled={currentVendor.rankings.some((r) => r.userId === 1)} // Disable ranking if already submitted
            min={1}
            max={5}
          />
          <label>Comment:</label>
          <input
            type="text"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
          {!isCommentEditable ? (
            <button onClick={() => submitRanking(currentVendor.id)}>Submit</button>
          ) : (
            <button onClick={() => editComment(currentVendor.id)}>Update Comment</button>
          )}
        </div>
      )}
    </div>
  );
};

export default VendorManagement;
