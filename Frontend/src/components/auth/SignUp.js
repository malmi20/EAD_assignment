import { Row } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import { UserRegSchema } from "../../schemas/UserSchema";
import { useState, forwardRef, useImperativeHandle } from "react";
import { Formik } from "formik";
import { notify } from "../custom/ToastMessage";
import Spinner from "react-bootstrap/Spinner";
import { register } from "../../services/userService";

const SignUpForm = forwardRef(({ changeState }, ref) => {
  const [formKey, setFormKey] = useState(0); // add a key to reset the form
  useImperativeHandle(ref, () => ({
    resetFormChanges() {
      setFormKey((prevKey) => prevKey + 1); // increment the key to reset the form
      setInitialValues(initData);
    },
  }));
  const initData = {
    email: "",
    password: "",
    confirmPassword: "",
    Roles: "",
    firstName: "",
    lastName: "",
    userName: "",
    address: "",
    contactNo: "",
  };
  const [initialValues, setInitialValues] = useState(initData);
  const [isLoading, setIsLoading] = useState(false);
  const submitHandler = async (values, { setSubmitting, resetForm }) => {
    try {
      setSubmitting(true);
      setIsLoading(true);
      if (!Array.isArray(values.Roles)) {
        values.Roles = [values.Roles];
      }
      const authData = await register(values);
      if (authData.status === 200) {
        setSubmitting(false);
        setIsLoading(false);
        resetForm();
        notify("success", authData.data.message);
        changeState("signIn");
      } else {
        notify("error", authData?.data?.message);
      }
    } catch (error) {
      console.error(`error`, error);
      let errorMessage = "";
      if (error.message) {
        errorMessage = error.message;
      } else {
        errorMessage = "Something went wrong";
      }
      setSubmitting(false);
      setIsLoading(false);
      notify("error", errorMessage);
    }
  };

  return (
    <div className="form-container sign-up-container">
      {isLoading && (
        <div className="loading-overlay">
          <Spinner animation="border" role="status" />
        </div>
      )}
      <Formik
        key={formKey} // add the key to reset the form
        validationSchema={UserRegSchema}
        onSubmit={submitHandler}
        initialValues={initialValues}
        enableReinitialize={true}
      >
        {({ handleSubmit, handleChange, values, touched, errors }) => (
          <Form noValidate onSubmit={handleSubmit} className="auth_form">
            <Row className="my-4 py-4" style={{overflowY: 'scroll'}}>
              <Form.Group md="4" controlId="email">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  name="email"
                  value={values.email}
                  onChange={handleChange}
                  isValid={touched.email && !errors.email}
                  isInvalid={touched.email && errors.email}
                />
                <Form.Control.Feedback type="invalid" data-testid="error-email">
                  {errors.email}
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group md="4" controlId="password">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  name="password"
                  value={values.password}
                  onChange={handleChange}
                  isValid={touched.password && !errors.password}
                  isInvalid={touched.password && errors.password}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.password}
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group md="4" controlId="confirmPassword">
                <Form.Label>Confirm Password</Form.Label>
                <Form.Control
                  type="password"
                  name="confirmPassword"
                  value={values.confirmPassword}
                  onChange={handleChange}
                  isValid={touched.confirmPassword && !errors.confirmPassword}
                  isInvalid={touched.confirmPassword && errors.confirmPassword}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.confirmPassword}
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group md="4" controlId="firstName">
                <Form.Label>First Name</Form.Label>
                <Form.Control
                  type="text"
                  name="firstName"
                  value={values.firstName}
                  onChange={handleChange}
                  isValid={touched.firstName && !errors.firstName}
                  isInvalid={touched.firstName && errors.firstName}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.firstName}
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group md="4" controlId="lastName">
                <Form.Label>Last Name</Form.Label>
                <Form.Control
                  type="text"
                  name="lastName"
                  value={values.lastName}
                  onChange={handleChange}
                  isValid={touched.lastName && !errors.lastName}
                  isInvalid={touched.lastName && errors.lastName}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.lastName}
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group md="4" controlId="userName">
                <Form.Label>User Name</Form.Label>
                <Form.Control
                  type="text"
                  name="userName"
                  value={values.userName}
                  onChange={handleChange}
                  isValid={touched.userName && !errors.userName}
                  isInvalid={touched.userName && errors.userName}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.userName}
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group md="4" controlId="address">
                <Form.Label>Address</Form.Label>
                <Form.Control
                  type="text"
                  name="address"
                  value={values.address}
                  onChange={handleChange}
                  isValid={touched.address && !errors.address}
                  isInvalid={touched.address && errors.address}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.address}
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group md="4" controlId="contactNo">
                <Form.Label>Contact Number</Form.Label>
                <Form.Control
                  type="text"
                  name="contactNo"
                  value={values.contactNo}
                  onChange={handleChange}
                  isValid={touched.contactNo && !errors.contactNo}
                  isInvalid={touched.contactNo && errors.contactNo}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.contactNo}
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group md="4" className="mt-1" controlId="Roles">
                <Form.Label>Role</Form.Label>
                <Form.Control
                  as="select"
                  name="Roles"
                  value={values.Roles}
                  onChange={handleChange}
                  isValid={touched.Roles && !errors.Roles}
                  isInvalid={touched.Roles && errors.Roles}
                >
                  <option value="">Select Role</option>
                  <option value="ADMIN">Admin</option>
                  <option value="CSR">CSR</option>
                  <option value="VENDOR">Vendor</option>
                </Form.Control>
                <Form.Control.Feedback type="invalid">
                  {errors.Roles}
                </Form.Control.Feedback>
              </Form.Group>
            </Row>
            <button className="auth_btn" type="submit">
              Register
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
});

export default SignUpForm;