import { useContext, forwardRef, useImperativeHandle, useState } from "react";
import { Row } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import { UserSignInSchema } from "../../schemas/UserSchema";
import { Formik } from "formik";
import { notify } from "../custom/ToastMessage";
import { AppContext } from "../../context/AuthContext";
import Spinner from "react-bootstrap/Spinner";
import { login } from "../../services/userService";

const SignInForm = forwardRef((_props, ref) => {
  const [formKey, setFormKey] = useState(0); // add a key to reset the form
  useImperativeHandle(ref, () => ({
    resetFormChanges() {
      setFormKey((prevKey) => prevKey + 1); // increment the key to reset the form
      setInitialValues(initData);
    },
  }));
  const initData = {
    password: "",
    email: "",
  };
  const { handleSignIn } = useContext(AppContext);
  const [initialValues, setInitialValues] = useState(initData);
  const [isLoading, setIsLoading] = useState(false);
  const submitHandler = async (values, { setSubmitting, resetForm }) => {
    try {
      setSubmitting(true);
      setIsLoading(true);
      const authData = await login(values);
      if (authData.status === 200) {
        setSubmitting(false);
        setIsLoading(false);
        resetForm();
        notify("success", authData.data.message);
        handleSignIn(authData.data.details);
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
    <div className="form-container sign-in-container">
      {isLoading && (
        <div className="loading-overlay">
          <Spinner animation="border" role="status" />
        </div>
      )}
      <Formik
        key={formKey} // add the key to reset the form
        validationSchema={UserSignInSchema}
        onSubmit={submitHandler}
        initialValues={initialValues}
        enableReinitialize={true}
      >
        {({
          handleSubmit,
          handleChange,
          values,
          touched,
          errors,
          resetForm,
        }) => (
          <Form noValidate onSubmit={handleSubmit} className="auth_form">
            <Row className="mb-3">
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
            </Row>
            <button className="auth_btn" type="submit">
              Sign In
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
});

export default SignInForm;
