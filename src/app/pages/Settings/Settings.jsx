import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import { toast } from "react-toastify";
import Button from "react-bootstrap/Button";
import InputGroup from "react-bootstrap/InputGroup";
import Spinner from "react-bootstrap/Spinner";
import {
  updateName,
  updateEmail,
  updatePassword,
} from "@store/slices/settingSlice";
import styles from "./Settings.module.scss";

const Settings = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);

  useEffect(() => {
    if (user) {
      dispatch({ type: "settings/updateUser", payload: user });
    }
  }, [user, dispatch]);

  const formikName = useFormik({
    initialValues: {
      newName: user ? user.displayName : "",
    },
    enableReinitialize: true,
    onSubmit: (values, { setSubmitting }) => {
      dispatch(updateName(values.newName))
        .unwrap()
        .then(() => {
          toast.success("Name updated successfully!");
        })
        .catch((error) => {
          toast.error(`Failed to update name: ${error}`);
        })
        .finally(() => {
          setSubmitting(false);
        });
    },
  });

  const formikEmail = useFormik({
    initialValues: {
      newEmail: user ? user.email : "",
      password: "",
    },
    enableReinitialize: true,
    onSubmit: (values, { setSubmitting }) => {
      dispatch(
        updateEmail({ newEmail: values.newEmail, password: values.password })
      )
        .unwrap()
        .then(() => {
          toast.success("Email updated successfully!");
        })
        .catch((error) => {
          toast.error(`Failed to update email: ${error}`);
        })
        .finally(() => {
          setSubmitting(false);
        });
    },
  });

  const formikPassword = useFormik({
    initialValues: {
      currentPassword: "",
      newPassword: "",
      confirmNewPassword: "",
    },
    validate: (values) => {
      const errors = {};
      if (values.newPassword !== values.confirmNewPassword) {
        errors.confirmNewPassword = "Passwords must match";
      }
      return errors;
    },
    onSubmit: (values, { setSubmitting }) => {
      dispatch(
        updatePassword({
          currentPassword: values.currentPassword,
          newPassword: values.newPassword,
        })
      )
        .unwrap()
        .then(() => {
          toast.success("Password updated successfully!");
        })
        .catch((error) => {
          toast.error(`Failed to update password: ${error}`);
        })
        .finally(() => {
          setSubmitting(false);
        });
    },
  });

  if (!user) {
    return (
      <div className={styles.spinnerContainer}>
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.section}>
        <h3>Update Name</h3>
        <form onSubmit={formikName.handleSubmit}>
          <InputGroup className="mb-3">
            <input
              type="text"
              name="newName"
              placeholder="New Name"
              aria-label="New Name"
              aria-describedby="basic-newname"
              className="form-control"
              value={formikName.values.newName}
              onChange={formikName.handleChange}
              onBlur={formikName.handleBlur}
              required
            />
          </InputGroup>
          <Button
            type="submit"
            variant="success"
            disabled={formikName.isSubmitting}>
            {formikName.isSubmitting ? (
              <Spinner animation="border" size="sm" />
            ) : (
              "Save"
            )}
          </Button>
        </form>
      </div>
      <div className={styles.section}>
        <h3>Update Email</h3>
        <form onSubmit={formikEmail.handleSubmit}>
          <InputGroup className="mb-3">
            <input
              type="email"
              name="newEmail"
              placeholder="New Email"
              aria-label="New Email"
              aria-describedby="basic-newemail"
              className="form-control"
              value={formikEmail.values.newEmail}
              onChange={formikEmail.handleChange}
              onBlur={formikEmail.handleBlur}
              required
            />
          </InputGroup>
          <InputGroup className="mb-3">
            <input
              type="password"
              name="password"
              placeholder="Password"
              aria-label="Password"
              aria-describedby="basic-password"
              className="form-control"
              value={formikEmail.values.password}
              onChange={formikEmail.handleChange}
              onBlur={formikEmail.handleBlur}
              required
            />
          </InputGroup>
          <Button
            type="submit"
            variant="success"
            disabled={formikEmail.isSubmitting}>
            {formikEmail.isSubmitting ? (
              <Spinner animation="border" size="sm" />
            ) : (
              "Save"
            )}
          </Button>
        </form>
      </div>

      <div className={styles.section}>
        <h3>Update Password</h3>
        <form onSubmit={formikPassword.handleSubmit}>
          <InputGroup className="mb-3">
            <input
              type="password"
              name="currentPassword"
              placeholder="Current Password"
              aria-label="Current Password"
              aria-describedby="basic-currentpassword"
              className="form-control"
              value={formikPassword.values.currentPassword}
              onChange={formikPassword.handleChange}
              onBlur={formikPassword.handleBlur}
              required
            />
          </InputGroup>
          <InputGroup className="mb-3">
            <input
              type="password"
              name="newPassword"
              placeholder="New Password"
              aria-label="New Password"
              aria-describedby="basic-newpassword"
              className="form-control"
              value={formikPassword.values.newPassword}
              onChange={formikPassword.handleChange}
              onBlur={formikPassword.handleBlur}
              required
            />
          </InputGroup>
          <InputGroup className="mb-3">
            <input
              type="password"
              name="confirmNewPassword"
              placeholder="Confirm New Password"
              aria-label="Confirm New Password"
              aria-describedby="basic-confirmnewpassword"
              className="form-control"
              value={formikPassword.values.confirmNewPassword}
              onChange={formikPassword.handleChange}
              onBlur={formikPassword.handleBlur}
              required
            />
            {formikPassword.touched.confirmNewPassword &&
            formikPassword.errors.confirmNewPassword ? (
              <div className="text-danger">
                {formikPassword.errors.confirmNewPassword}
              </div>
            ) : null}
          </InputGroup>
          <Button
            type="submit"
            variant="success"
            disabled={formikPassword.isSubmitting}>
            {formikPassword.isSubmitting ? (
              <Spinner animation="border" size="sm" />
            ) : (
              "Save"
            )}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Settings;