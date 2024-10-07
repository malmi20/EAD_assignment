import React, { useState, useEffect } from 'react';
import { Col, Row, Card, InputGroup, Badge } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { BsSearch } from 'react-icons/bs';
import Table from "../components/custom/CustomTable";
import CustomModal from "../components/custom/CustomModal";
import SampleImg from '../assets/upload-img.png'

function ProductManager() {
  const [file, setFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const expenseData={img:""}
  const initialData = {
    id: "",
    name: "",
    description: "",
    price: "",
    quantity: "",
    category: "",
    isActive: true,
  };
  const defaultState = "Add";
  const [initialValues, setValues] = useState(initialData);
  const [productData, setProductData] = useState([]);
  const [tableData, setTableData] = useState([]);
  const [currentState, setCurrentState] = useState(defaultState);
  const [show, setShow] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitting, setSubmitting] = useState(false);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetchProductData();
    fetchCategories();
  }, []);

  const fetchProductData = async () => {
    setIsLoading(true);
    try {
      const response = await fetchProducts();
      setProductData(response.data.details);
      setTableData(response.data.details);
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await fetchCategoriesData();
      setCategories(response.data.categories);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  const fetchProducts = async () => {
    // Mock data (replace this with actual API call)
    return {
      data: {
        details: [
          { id: "prod_001", name: 'Product 1', description: 'Product 1 description', price: 10.99, quantity: 10, category: 'Electronics', isActive: true },
          { id: "prod_002", name: 'Product 2', description: 'Product 2 description', price: 9.99, quantity: 20, category: 'Clothing', isActive: false },
          { id: "prod_003", name: 'Product 3', description: 'Product 3 description', price: 12.99, quantity: 30, category: 'Home', isActive: true },
        ],
      },
    };
  };

  const fetchCategoriesData = async () => {
    // Mock data (replace this with actual API call)
    return {
      data: {
        categories: ['Electronics', 'Clothing', 'Home', 'Books', 'Toys'],
      },
    };
  };

  const submitHandler = async (values) => {
    setSubmitting(true);
    try {
      const payload = {
        id: values.id || `prod_${Date.now()}`, // Generate a unique ID if it's a new product
        name: values.name,
        description: values.description,
        price: values.price,
        quantity: values.quantity,
        category: values.category,
        isActive: values.isActive,
      };

      if (currentState === "Add") {
        await saveProduct(payload);
      } else {
        await updateProduct(payload);
      }

      resetForm();
      setValues(initialData);
      setCurrentState(defaultState);
      // fetchProductData();
    } catch (error) {
      console.error("Error submitting form:", error);
    } finally {
      setSubmitting(false);
    }
  };

  const resetForm = () => {
    setValues(initialData);
    setCurrentState(defaultState);
  };

  const saveProduct = async (payload) => {
    // Mock API call
    console.log("Saving product:", payload);
    setProductData(prev => ([...prev,{...payload}]));
    setTableData(prev => ([...prev,{...payload}]));
    return {
      data: { message: 'Product saved successfully' },
    };
  };

  const updateProduct = async (payload) => {
    // Mock API call
    console.log("Updating product:", payload);
    return {
      data: { message: 'Product updated successfully' },
    };
  };

  const onSearchHandler = (e =null) => {
    const query = e?.target?.value?.toLowerCase();
    setTableData(
      query
        ? productData.filter(
            (item) =>
              item.name.toLowerCase().includes(query) ||
              item.description.toLowerCase().includes(query) ||
              item.category.toLowerCase().includes(query)
          )
        : productData
    );
  };

  const onEditHandler = (item) => {
    setValues(item);
    setCurrentState("Update");
  };

  const onDeleteHandler = async () => {
    try {
      await deleteProduct(selectedItem.id);
      // fetchProductData();
      setSelectedItem(null);
      setShow(false);
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  const deleteProduct = async (id) => {
    // Mock API call
    console.log("Deleting product:", id);
    return {
      data: { message: 'Product deleted successfully' },
    };
  };

  const toggleProductStatus = async (id, currentStatus) => {
    try {
      await updateProductStatus(id, !currentStatus);
      fetchProductData();
    } catch (error) {
      console.error("Error toggling product status:", error);
    }
  };

  const updateProductStatus = async (id, newStatus) => {
    // Mock API call
    console.log("Updating product status:", id, newStatus);
    return {
      data: { message: 'Product status updated successfully' },
    };
  };

  const COLUMNS = [
    { label: "ID", renderCell: (item) => item.id },
    { label: "Name", renderCell: (item) => item.name },
    { label: "Description", renderCell: (item) => item.description },
    { label: "Price", renderCell: (item) => item.price },
    { label: "Quantity", renderCell: (item) => item.quantity },
    { label: "Category", renderCell: (item) => item.category },
    { label: "Status", renderCell: (item) => (
      <Badge bg={item.isActive ? "success" : "danger"}>
        {item.isActive ? "Active" : "Inactive"}
      </Badge>
    )},
    {
      label: "Action",
      renderCell: (item) => (
        <>
          
          <Button
            variant={item.isActive ? "warning" : "success"}
            className="me-2"
            size="sm"
            onClick={() => toggleProductStatus(item.id, item.isActive)}
          >
            {item.isActive ? "Deactivate" : "Activate"}
          </Button>
          <Button
            variant="primary"
            className="me-2"
            size="sm"
            onClick={() => onEditHandler(item)}
          >
            Edit
          </Button>
          <Button
            variant="danger"
            size="sm"
            onClick={() => {
              setShow(true);
              setSelectedItem(item);
            }}
          >
            Delete
          </Button>
        </>
      ),
    },
  ];
  
  return (
    <Row className="px-5 pt-4">
      <Card body className="shadow p-3 mb-3 bg-white rounded">
        <Card.Title>
          <u>Product Management</u>
        </Card.Title>
        <Col md={12}>
          <CustomModal
            setShow={setShow}
            show={show}
            submitBtnVariant="danger"
            submitAction={onDeleteHandler}
            cancelAction={() => setSelectedItem(null)}
          />
          <Form
            noValidate
            onSubmit={(e) => {
              e.preventDefault();
              submitHandler(initialValues);
            }}
          >
            <Row>
              <Col md={4}>
                <Form.Group controlId="name">
                  <Form.Label>Name</Form.Label>
                  <Form.Control
                    name="name"
                    value={initialValues.name}
                    onChange={(e) =>
                      setValues({ ...initialValues, name: e.target.value })
                    }
                  />
                </Form.Group>
              </Col>
              <Col md={4}>
                <Form.Group controlId="description">
                  <Form.Label>Description</Form.Label>
                  <Form.Control
                    name="description"
                    value={initialValues.description}
                    onChange={(e) =>
                      setValues({
                        ...initialValues,
                        description: e.target.value,
                      })
                    }
                  />
                </Form.Group>
              </Col>
              <Col md={4}>
                <Form.Group controlId="price">
                  <Form.Label>Price</Form.Label>
                  <Form.Control
                    name="price"
                    type="number"
                    value={initialValues.price}
                    onChange={(e) =>
                      setValues({ ...initialValues, price: e.target.value })
                    }
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col md={4}>
                <Form.Group controlId="quantity">
                  <Form.Label>Quantity</Form.Label>
                  <Form.Control
                    name="quantity"
                    type="number"
                    value={initialValues.quantity}
                    onChange={(e) =>
                      setValues({ ...initialValues, quantity: e.target.value })
                    }
                  />
                </Form.Group>
              </Col>
              <Col md={4}>
                <Form.Group controlId="category">
                  <Form.Label>Category</Form.Label>
                  <Form.Select
                    name="category"
                    value={initialValues.category}
                    onChange={(e) =>
                      setValues({ ...initialValues, category: e.target.value })
                    }
                  >
                    <option value="">Select a category</option>
                    {categories.map((category) => (
                      <option key={category} value={category}>
                        {category}
                      </option>
                    ))}
                  </Form.Select>
                </Form.Group>
              </Col>
              <Col md={4}>
                <Form.Group controlId="isActive">
                  <Form.Label>Status</Form.Label>
                  <Form.Check
                    type="switch"
                    id="custom-switch"
                    label={initialValues.isActive ? "Active" : "Inactive"}
                    checked={initialValues.isActive}
                    onChange={(e) =>
                      setValues({ ...initialValues, isActive: e.target.checked })
                    }
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row className='mt-3'>
              <Form.Label>Upload The Product Image</Form.Label>
              <br/><br/>
              <div className="img-wrapper">
                  <label htmlFor="img-upload" className="img-upload-label">
                      <img 
                          src={expenseData.img != '' && file === null ? expenseData.img : file === null ? SampleImg : imagePreview} 
                          id="expense-updateable-img"
                      />
                      <input 
                          id="img-upload" 
                          className="img-upload" 
                          name="img-upload" 
                          type="file" 
                          accept="image/png, image/jpg, image/gif, image/jpeg"
                          onChange={(e) => {
                              const img = e.target.files[0];
                              if (img) {
                                  const reader = new FileReader();
                                  reader.onloadend = () => {
                                      setImagePreview(reader.result);
                                  };
                                  reader.readAsDataURL(img);
                              }
                              setFile(img);
                          }}
                          required
                      />
                  </label>
              </div>
            </Row>
            <Row className="mt-2">
              <Col className="d-flex justify-content-start">
                {initialValues.name || initialValues.description || initialValues.price || initialValues.quantity ? (
                  <Button variant="secondary" type="reset" onClick={resetForm}>
                    Cancel
                  </Button>
                ) : null}
              </Col>
              <Col className="d-flex justify-content-end">
                <Button variant="primary" type="submit" disabled={isSubmitting}>
                  {currentState}
                </Button>
              </Col>
            </Row>
          </Form>
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
                  name="search"
                  placeholder="Search by Name/Description/Category"
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
      </Card>
    </Row>
  );
}

export default ProductManager;