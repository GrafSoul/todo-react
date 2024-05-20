import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { useFormik } from "formik";

import Button from "react-bootstrap/Button";
import InputGroup from "react-bootstrap/InputGroup";
import Alert from "react-bootstrap/Alert";
import Spinner from "react-bootstrap/Spinner";

import { loginUser } from "@store/slices/authSlice";
import styles from "./SingIn.module.scss";

const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

const validate = (values) => {
  const errors = {};
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
  return errors;
};

const SingIn = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validate,
    onSubmit: (values, { setSubmitting }) => {
      dispatch(loginUser(values))
        .unwrap()
        .then(() => {
          toast.success("Login successful!");
          navigate("/notes");
        })
        .catch((error) => {
          console.log(error);
          toast.error(`Login failed: ${error.message}`);
        })
        .finally(() => {
          setSubmitting(false);
        });
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <div className={styles.container}>
        <div className={styles.entrance}>
          <div className={styles.entranceBlock}>
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
            <div className={styles.links}>
              <Link to="/forgot-password">Forgot password?</Link>
              <Link to="/signup">SignUp</Link>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
};

export default SingIn;
