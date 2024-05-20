import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import { useFormik } from "formik";

import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Alert from "react-bootstrap/Alert";
import Spinner from "react-bootstrap/Spinner";

import { useDispatch } from "react-redux";
import { registerUser } from "@store/slices/authSlice";

import slyles from "./SingUp.module.scss";

const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

const validate = (values) => {
  const errors = {};
  if (!values.displayName) {
    errors.displayName = "Name is required";
  }
  if (!values.email) {
    errors.email = "Email is required";
  } else if (!emailRegex.test(values.email)) {
    errors.email = "Invalid email address";
  }
  if (!values.password) {
    errors.password = "Password is required";
  } else if (values.password.length < 6) {
    errors.password = "Password must be at least 6 characters";
  }
  if (!values.confirmPassword) {
    errors.confirmPassword = "Confirm Password is required";
  } else if (values.password !== values.confirmPassword) {
    errors.confirmPassword = "Passwords must match";
  }
  return errors;
};

const SingUp = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      displayName: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    validate,
    onSubmit: (values, { setSubmitting }) => {
      dispatch(registerUser(values))
        .unwrap()
        .then(() => {
          toast.success("Registration successful!");
          navigate("/notes");
        })
        .catch((error) => {
          console.log(error);
          toast.error(`Registration failed: ${error}`);
        })
        .finally(() => {
          setSubmitting(false);
        });
    },
  });

  return (
    <Form onSubmit={formik.handleSubmit}>
      <div className={slyles.container}>
        <div className={slyles.entrance}>
          <div className={slyles.entranceBlock}>
            <InputGroup className="mb-3">
              <input
                type="text"
                name="displayName"
                placeholder="Name"
                aria-label="Name"
                aria-describedby="basic-name"
                className="form-control"
                value={formik.values.displayName}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                required
              />
              {formik.touched.displayName && formik.errors.displayName ? (
                <Alert key="danger" variant="danger">
                  {formik.errors.displayName}
                </Alert>
              ) : null}
            </InputGroup>
            <InputGroup className="mb-3">
              <input
                type="email"
                name="email"
                placeholder="Email"
                aria-label="Email"
                aria-describedby="basic-email"
                className="form-control"
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                required
              />
              {formik.touched.email && formik.errors.email ? (
                <Alert key="danger" variant="danger">
                  {formik.errors.email}
                </Alert>
              ) : null}
            </InputGroup>
            <InputGroup className="mb-3">
              <input
                type="password"
                name="password"
                placeholder="Password"
                aria-label="Password"
                aria-describedby="basic-password"
                className="form-control"
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                required
              />
              {formik.touched.password && formik.errors.password ? (
                <Alert key="danger" variant="danger">
                  {formik.errors.password}
                </Alert>
              ) : null}
            </InputGroup>
            <InputGroup className="mb-3">
              <input
                type="password"
                name="confirmPassword"
                placeholder="Confirm Password"
                aria-label="Confirm Password"
                aria-describedby="basic-confirm-password"
                className="form-control"
                value={formik.values.confirmPassword}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                required
              />
              {formik.touched.confirmPassword &&
              formik.errors.confirmPassword ? (
                <Alert key="danger" variant="danger">
                  {formik.errors.confirmPassword}
                </Alert>
              ) : null}
            </InputGroup>
            <Button
              type="submit"
              variant="success"
              disabled={formik.isSubmitting}>
              {formik.isSubmitting ? (
                <Spinner animation="border" size="sm" />
              ) : (
                "Go"
              )}
            </Button>
            <div className={slyles.links}>
              <Link to="/signin">SignIn</Link>
            </div>
          </div>
        </div>
      </div>
    </Form>
  );
};

export default SingUp;
