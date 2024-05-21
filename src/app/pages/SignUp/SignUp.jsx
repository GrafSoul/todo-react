import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useFormik } from "formik";

import { useDispatch, useSelector } from "react-redux";
import { Statuses } from "@store/statuses/statuses";
import { registerUser } from "@store/slices/authSlice";
import { getErrorAuthMessage } from "@utils/errors";

import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Alert from "react-bootstrap/Alert";
import Spinner from "react-bootstrap/Spinner";

import {
  FaEye,
  FaEyeSlash,
  FaCheck,
  FaTimes,
  FaExclamationCircle,
} from "react-icons/fa";

import styles from "./SignUp.module.scss";

const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const passwordRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9]).{8,}$/;

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
  } else if (!passwordRegex.test(values.password)) {
    errors.password = "Password does not meet the requirements";
  }
  if (!values.confirmPassword) {
    errors.confirmPassword = "Confirm Password is required";
  } else if (values.password !== values.confirmPassword) {
    errors.confirmPassword = "Passwords must match";
  }
  return errors;
};

const PasswordValidator = ({ password }) => {
  const passwordRequirements = [
    { regex: /[A-Z]/, label: "At least one upper case letter" },
    { regex: /[a-z]/, label: "At least one lower case letter" },
    { regex: /[0-9]/, label: "At least one digit" },
    { regex: /.{8,}/, label: "Minimum 8 characters length" },
  ];

  const allValid = passwordRequirements.every((req) =>
    req.regex.test(password)
  );

  return (
    <div>
      <ul>
        {passwordRequirements.map((req, index) => (
          <li
            key={index}
            style={{ color: req.regex.test(password) ? "green" : "red" }}>
            {req.label}
          </li>
        ))}
      </ul>
      {allValid && <FaCheck className="text-success" />}
    </div>
  );
};

const SignUp = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { status, error } = useSelector((state) => state.auth);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [showPasswordRequirements, setShowPasswordRequirements] =
    useState(false);

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
          const friendlyMessage = getErrorAuthMessage(error.code);
          toast.error(`Registration failed: ${friendlyMessage}`);
        })
        .finally(() => {
          setSubmitting(false);
        });
    },
  });

  const clearField = (field) => {
    formik.setFieldValue(field, "");
  };

  return (
    <Form onSubmit={formik.handleSubmit}>
      <div className={styles.container}>
        <div className={styles.entrance}>
          <div className={styles.entranceBlock}>
            <InputGroup className="mb-3">
              <input
                type="text"
                name="displayName"
                placeholder="Name"
                aria-label="Name"
                className="form-control"
                value={formik.values.displayName}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                required
                autoComplete="off"
              />
              {formik.values.displayName && (
                <Button
                  variant="outline-secondary"
                  onClick={() => clearField("displayName")}>
                  <FaTimes />
                </Button>
              )}
              {formik.touched.displayName && formik.errors.displayName ? (
                <>
                  <FaExclamationCircle className="text-danger ml-2" />
                  <Alert key="danger" variant="danger">
                    {formik.errors.displayName}
                  </Alert>
                </>
              ) : (
                formik.touched.displayName &&
                formik.values.displayName && (
                  <FaCheck className="text-success ml-2" />
                )
              )}
            </InputGroup>
            <InputGroup className="mb-3">
              <input
                type="email"
                name="email"
                placeholder="Email"
                aria-label="Email"
                className="form-control"
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                required
                autoComplete="off"
              />
              {formik.values.email && (
                <Button
                  variant="outline-secondary"
                  onClick={() => clearField("email")}>
                  <FaTimes />
                </Button>
              )}
              {formik.touched.email && formik.errors.email ? (
                <>
                  <FaExclamationCircle className="text-danger ml-2" />
                  <Alert key="danger" variant="danger">
                    {formik.errors.email}
                  </Alert>
                </>
              ) : (
                formik.touched.email &&
                formik.values.email && <FaCheck className="text-success ml-2" />
              )}
            </InputGroup>
            <InputGroup className="mb-3">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Password"
                aria-label="Password"
                className="form-control"
                value={formik.values.password}
                onChange={(e) => {
                  formik.handleChange(e);
                  setShowPasswordRequirements(true);
                }}
                onBlur={formik.handleBlur}
                required
                autoComplete="off"
              />
              <Button
                variant="outline-secondary"
                onClick={() => setShowPassword(!showPassword)}>
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </Button>
              {formik.values.password && (
                <Button
                  variant="outline-secondary"
                  onClick={() => clearField("password")}>
                  <FaTimes />
                </Button>
              )}
              {formik.touched.password && formik.errors.password ? (
                <>
                  <FaExclamationCircle className="text-danger ml-2" />
                  <Alert key="danger" variant="danger">
                    {formik.errors.password}
                  </Alert>
                </>
              ) : (
                formik.touched.password &&
                formik.values.password &&
                passwordRegex.test(formik.values.password) && (
                  <FaCheck className="text-success ml-2" />
                )
              )}
            </InputGroup>
            {showPasswordRequirements && (
              <PasswordValidator password={formik.values.password} />
            )}
            <InputGroup className="mb-3">
              <input
                type={showConfirmPassword ? "text" : "password"}
                name="confirmPassword"
                placeholder="Confirm Password"
                aria-label="Confirm Password"
                className="form-control"
                value={formik.values.confirmPassword}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                required
                autoComplete="off"
              />
              <Button
                variant="outline-secondary"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
                {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
              </Button>
              {formik.values.confirmPassword && (
                <Button
                  variant="outline-secondary"
                  onClick={() => clearField("confirmPassword")}>
                  <FaTimes />
                </Button>
              )}
              {formik.touched.confirmPassword &&
              formik.errors.confirmPassword ? (
                <>
                  <FaExclamationCircle className="text-danger ml-2" />
                  <Alert key="danger" variant="danger">
                    {formik.errors.confirmPassword}
                  </Alert>
                </>
              ) : (
                formik.touched.confirmPassword &&
                formik.values.confirmPassword &&
                formik.values.password === formik.values.confirmPassword && (
                  <FaCheck className="text-success ml-2" />
                )
              )}
            </InputGroup>
            {status === Statuses.FAILED && (
              <Alert key="danger" variant="danger">
                {getErrorAuthMessage(error)}
              </Alert>
            )}
            <Button
              type="submit"
              variant="success"
              disabled={
                formik.isSubmitting ||
                status === Statuses.LOADING ||
                Object.keys(formik.errors).length > 0
              }>
              {formik.isSubmitting || status === Statuses.LOADING ? (
                <Spinner animation="border" size="sm" />
              ) : (
                "Go"
              )}
            </Button>
            <div className={styles.links}>
              <Link to="/signin">SignIn</Link>
            </div>
          </div>
        </div>
      </div>
    </Form>
  );
};

export default SignUp;
