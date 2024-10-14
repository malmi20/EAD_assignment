import React, { useContext, useEffect } from "react";

import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Button } from "react-bootstrap";
import { AppContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  const { user } = useContext(AppContext);
  const isAdmin = user?.assignedRoles?.includes("ADMIN");
  const vendor =  user?.assignedRoles?.includes("VENDOR");
  useEffect(() => {
    navigate("/productManager")
  })
  console.log(user);
  
  return (
    <Row>
      <Col md={12} className="bg-primary">
        {isAdmin && <Button> Inventory Management </Button>}
        <Button> Order Management </Button>
        {(vendor || isAdmin) && <Button> Product Management </Button> }
        {(vendor || isAdmin) && <Button> Vendor Management </Button>}
      </Col>
    </Row>
  );
};

export default Home;
