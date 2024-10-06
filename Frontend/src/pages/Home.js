import React, { useContext } from "react";

import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Button } from "react-bootstrap";
import { AppContext } from "../context/AuthContext";

const Home = () => {
  const { user } = useContext(AppContext);
  const isAdmin = user?.role === "Admin";
  const vendor =  user?.role === "Vendor";
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
