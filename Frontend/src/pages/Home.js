import React, { useContext, useEffect } from "react";

import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Button } from "react-bootstrap";
import { AppContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  const { user } = useContext(AppContext);
  const isAdmin = user?.role === "Admin";
  const vendor =  user?.role === "Vendor";
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
