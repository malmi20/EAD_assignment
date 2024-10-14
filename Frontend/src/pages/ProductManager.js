import React, { useState, useEffect, useContext } from 'react';
import { Col, Row, Card, InputGroup, Badge } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { BsSearch } from 'react-icons/bs';
import Table from "../components/custom/CustomTable";
import CustomModal from "../components/custom/CustomModal";
import SampleImg from '../assets/upload-img.png';
import { notify } from "../components/custom/ToastMessage";
import { AppContext } from "../context/AuthContext";
import { activeProductService, createProductService, deactiveProductService, deleteProduct, getCategoryService, getProductsService, updateProductService } from '../services/productService';


function ProductManager() {
  const { user } = useContext(AppContext);
  const [file, setFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const expenseData={img:""}
  const isAdmin = user?.assignedRoles.includes("ADMIN");
  const vendor =  user?.assignedRoles.includes("VENDOR");
  const initialData = {
    id: "",
    name: "",
    description: "",
    price: "",
    ratingValue: 0,
    categoryID: "",
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
      const response = await getProductsService();
      setProductData(response);
      setTableData(response);
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await getCategoryService();
      setCategories(response);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };
  const submitHandler = async (values) => {
    setSubmitting(true);
    try {
      const payload = {
        id: values.id || `prod_${Date.now()}`, // Generate a unique ID if it's a new product
        name: values.name,
        title: values.name,
        description: values.description,
        price: values.price,
        categoryID: values.categoryID,
        category: categories.find((i) => i.categoryID === values.categoryID)?.name || "",
        image: 'https://via.placeholder.com/150', // BACKEND API expects an image URL
        RatingValue: values.ratingValue,
        isActive: values.isActive,
      };

      if (currentState === "Add") {
        delete payload.id;
        await createProductService(payload);
      } else {
        await updateProductService(values.id, payload);
      }

      resetForm();
      setValues(initialData);
      setCurrentState(defaultState);
      notify("success", `Product ${currentState === "Add" ? "added" : "updated"} successfully`);
      fetchProductData();
    } catch (error) {
      console.error("Error submitting form :", error);
      notify("error", `Error ${currentState === "Add" ? "adding" : "updating"} product`);
    } finally {
      setSubmitting(false);
    }
  };

  const resetForm = () => {
    setValues(initialData);
    setCurrentState(defaultState);
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
      fetchProductData();
      setSelectedItem(null);
      setShow(false);
    } catch (error) {
      notify("error", "Error deleting product");
      console.error("Error deleting product:", error);
    }
  };

  const toggleProductStatus = async (id, currentStatus) => {
    try {
      if(currentStatus) await deactiveProductService(id);
      else await activeProductService(id);
      notify("success", "Product status updated successfully");
      fetchProductData();
    } catch (error) {
      notify("error", "Error toggling product status");
      console.error("Error toggling product status:", error);
    }
  };

  const COLUMNS = [
    { label: "ID", renderCell: (item) => item.id },
    { label: "Name", renderCell: (item) => item.name },
    { label: "Description", renderCell: (item) => item.description },
    { label: "Price", renderCell: (item) => item.price },
    { label: "Rating", renderCell: (item) => item.ratingValue },
    { label: "Category", renderCell: (item) => categories.find(i => item.categoryID === i.categoryID)?.name },
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
            disabled={!isAdmin}
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
  
  console.log(user);
  
  return (
    <Row className="px-5 pt-4">
      {
        (isAdmin || vendor) &&
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
                      required
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
                      required
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
                      required
                      value={initialValues.price}
                      onChange={(e) =>
                        setValues({ ...initialValues, price: e.target.value })
                      }
                    />
                  </Form.Group>
                </Col>
                <Col md={4}>
                  <Form.Group controlId="rating">
                    <Form.Label>Rating</Form.Label>
                    <Form.Control
                      name="rating"
                      type="double"
                      min={0}
                      max={5}
                      required
                      value={initialValues.ratingValue}
                      onChange={(e) =>
                        setValues({ ...initialValues, ratingValue: e.target.value && parseFloat(e.target.value) > 5 ? 5 : parseFloat(e.target.value) || 0 })
                      }
                    />
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                <Col md={4}>
                  <Form.Group controlId="categoryID">
                    <Form.Label>Category</Form.Label>
                    <Form.Select
                      required
                      name="categoryID"
                      value={initialValues.categoryID}
                      onChange={(e) =>
                        setValues({ ...initialValues, categoryID: e.target.value })
                      }
                    >
                      <option value="">Select a category</option>
                      {categories?.map((category) => (
                        <option key={category.categoryID} value={category.categoryID}>
                          {category.name}
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
                <div className="img-wrapper" style={{width: "20%"}}>
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
                        />
                    </label>
                </div>
              </Row>
              <Row className="mt-2">
                <Col className="d-flex justify-content-start">
                  {initialValues.name || initialValues.description || initialValues.price ? (
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
      }
    </Row>
  );
}

export default ProductManager;