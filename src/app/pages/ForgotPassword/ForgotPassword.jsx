import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { useFormik } from "formik";

import { useDispatch, useSelector } from "react-redux";
import { resetUserPassword } from "@store/slices/authSlice";
import { Statuses } from "@store/statuses/statuses";
import { getErrorAuthMessage } from "@utils/errors";

import Button from "react-bootstrap/Button";
import InputGroup from "react-bootstrap/InputGroup";
import Alert from "react-bootstrap/Alert";
import Spinner from "react-bootstrap/Spinner";

import styles from "./ForgotPassword.module.scss";

const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

const validate = (values) => {
  const errors = {};
  if (!values.email) {
    errors.email = "Email is required";
  } else if (!emailRegex.test(values.email)) {
    errors.email = "Invalid email address";
  }
  return errors;
};

const ForgotPassword = () => {
  const [emailSent, setEmailSent] = useState(false);
  const dispatch = useDispatch();
  const { status, error } = useSelector((state) => state.auth);
  const [isSubmitDisabled, setIsSubmitDisabled] = useState(true);

  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validate,
    onSubmit: (values, { setSubmitting }) => {
      dispatch(resetUserPassword(values))
        .unwrap()
        .then(() => {
          toast.success("Password reset email sent!");
          setEmailSent(true);
        })
        .catch((error) => {
          const friendlyMessage = getErrorAuthMessage(error.code);
          toast.error(
            `Failed to send password reset email: ${friendlyMessage}`
          );
        })
        .finally(() => {
          setSubmitting(false);
        });
    },
  });

  useEffect(() => {
    setIsSubmitDisabled(
      formik.isSubmitting ||
        status === Statuses.LOADING ||
        Object.keys(formik.errors).length > 0 ||
        !formik.values.email
    );
  }, [formik.isSubmitting, status, formik.errors, formik.values]);

  return (
    <div className={styles.container}>
      {emailSent ? (
        <div className={styles.confirmation}>
          <p>Password reset email sent to the specified email address.</p>
          <Link to="/signin">Go to Sign In</Link>
        </div>
      ) : (
        <form onSubmit={formik.handleSubmit}>
          <div className={styles.entrance}>
            <div className={styles.entranceBlock}>
              <InputGroup className="mb-3">
                <InputGroup.Text id="basic-addon1">Email</InputGroup.Text>
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
              {status === Statuses.FAILED && (
                <Alert key="danger" variant="danger">
                  {getErrorAuthMessage(error)}
                </Alert>
              )}
              <Button
                type="submit"
                variant="success"
                disabled={isSubmitDisabled}>
                {formik.isSubmitting || status === Statuses.LOADING ? (
                  <Spinner animation="border" size="sm" />
                ) : (
                  "Go"
                )}
              </Button>
            </div>
          </div>
        </form>
      )}
    </div>
  );
};

export default ForgotPassword;
