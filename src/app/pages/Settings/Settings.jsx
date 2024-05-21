import { useEffect, useState } from "react";
import { useFormik } from "formik";
import { toast } from "react-toastify";
import {
  FaEye,
  FaEyeSlash,
  FaCheck,
  FaTimes,
  FaExclamationCircle,
} from "react-icons/fa";

import { Statuses } from "@store/statuses/statuses";
import { useDispatch, useSelector } from "react-redux";
import {
  updateName,
  updateEmail,
  updatePassword,
} from "@store/slices/settingSlice";
import { getErrorAuthMessage } from "@utils/errors";

import Button from "react-bootstrap/Button";
import InputGroup from "react-bootstrap/InputGroup";
import Spinner from "react-bootstrap/Spinner";
import Alert from "react-bootstrap/Alert";
import Loading from "@components/Loading/Loading";

import styles from "./Settings.module.scss";

const passwordRequirements = [
  { regex: /[A-Z]/, label: "At least one upper case letter" },
  { regex: /[a-z]/, label: "At least one lower case letter" },
  { regex: /[0-9]/, label: "At least one digit" },
  { regex: /.{8,}/, label: "Minimum 8 characters length" },
];

const validatePassword = (values) => {
  const errors = {};

  if (values.newPassword !== values.confirmNewPassword) {
    errors.confirmNewPassword = "Passwords must match";
  }

  const passwordErrors = passwordRequirements.filter(
    (req) => !req.regex.test(values.newPassword)
  );
  if (passwordErrors.length > 0) {
    errors.newPassword = `Password does not meet the requirements: ${passwordErrors
      .map((req) => req.label)
      .join(", ")}`;
  }

  return errors;
};

const PasswordValidator = ({ password }) => {
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

const Settings = () => {
  const dispatch = useDispatch();
  const { user, status, error } = useSelector((state) => state.auth);
  const [showPassword, setShowPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmNewPassword, setShowConfirmNewPassword] = useState(false);
  const [showPasswordRequirements, setShowPasswordRequirements] =
    useState(false);
  const [isNameSubmitDisabled, setIsNameSubmitDisabled] = useState(true);
  const [isEmailSubmitDisabled, setIsEmailSubmitDisabled] = useState(true);
  const [isPasswordSubmitDisabled, setIsPasswordSubmitDisabled] =
    useState(true);

  useEffect(() => {
    if (error) {
      const friendlyMessage = getErrorAuthMessage(error);
      toast.error(`Error: ${friendlyMessage}`);
    }
  }, [error]);

  const clearField = (field, formik) => {
    formik.setFieldValue(field, "");
  };

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
          const friendlyMessage = getErrorAuthMessage(error);
          toast.error(`Failed to update name: ${friendlyMessage}`);
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
          const friendlyMessage = getErrorAuthMessage(error);
          toast.error(`Failed to update email: ${friendlyMessage}`);
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
    validate: validatePassword,
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
          const friendlyMessage = getErrorAuthMessage(error);
          toast.error(`Failed to update password: ${friendlyMessage}`);
        })
        .finally(() => {
          setSubmitting(false);
        });
    },
  });

  useEffect(() => {
    setIsNameSubmitDisabled(
      formikName.isSubmitting ||
        Object.keys(formikName.errors).length > 0 ||
        !formikName.values.newName
    );
  }, [formikName.isSubmitting, formikName.errors, formikName.values]);

  useEffect(() => {
    setIsEmailSubmitDisabled(
      formikEmail.isSubmitting ||
        Object.keys(formikEmail.errors).length > 0 ||
        !formikEmail.values.newEmail ||
        !formikEmail.values.password
    );
  }, [formikEmail.isSubmitting, formikEmail.errors, formikEmail.values]);

  useEffect(() => {
    setIsPasswordSubmitDisabled(
      formikPassword.isSubmitting ||
        Object.keys(formikPassword.errors).length > 0 ||
        !formikPassword.values.currentPassword ||
        !formikPassword.values.newPassword ||
        !formikPassword.values.confirmNewPassword
    );
  }, [
    formikPassword.isSubmitting,
    formikPassword.errors,
    formikPassword.values,
  ]);

  if (status === Statuses.LOADING) {
    return <Loading />;
  }

  if (status === Statuses.FAILED) {
    const friendlyMessage = getErrorAuthMessage(error);
    return <div className="text-danger">Error: {friendlyMessage}</div>;
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
              className="form-control"
              value={formikName.values.newName}
              onChange={formikName.handleChange}
              onBlur={formikName.handleBlur}
              required
            />
            {formikName.values.newName && (
              <Button
                variant="outline-secondary"
                onClick={() => clearField("newName", formikName)}>
                <FaTimes />
              </Button>
            )}
            {formikName.touched.newName && formikName.errors.newName ? (
              <>
                <FaExclamationCircle className="text-danger ml-2" />
                <Alert key="danger" variant="danger">
                  {formikName.errors.newName}
                </Alert>
              </>
            ) : (
              formikName.touched.newName &&
              formikName.values.newName && (
                <FaCheck className="text-success ml-2" />
              )
            )}
          </InputGroup>
          <Button
            type="submit"
            variant="success"
            disabled={isNameSubmitDisabled}>
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
              className="form-control"
              value={formikEmail.values.newEmail}
              onChange={formikEmail.handleChange}
              onBlur={formikEmail.handleBlur}
              required
            />
            {formikEmail.values.newEmail && (
              <Button
                variant="outline-secondary"
                onClick={() => clearField("newEmail", formikEmail)}>
                <FaTimes />
              </Button>
            )}
            {formikEmail.touched.newEmail && formikEmail.errors.newEmail ? (
              <>
                <FaExclamationCircle className="text-danger ml-2" />
                <Alert key="danger" variant="danger">
                  {formikEmail.errors.newEmail}
                </Alert>
              </>
            ) : (
              formikEmail.touched.newEmail &&
              formikEmail.values.newEmail && (
                <FaCheck className="text-success ml-2" />
              )
            )}
          </InputGroup>
          <InputGroup className="mb-3">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Password"
              aria-label="Password"
              className="form-control"
              value={formikEmail.values.password}
              onChange={formikEmail.handleChange}
              onBlur={formikEmail.handleBlur}
              required
            />
            <Button
              variant="outline-secondary"
              onClick={() => setShowPassword(!showPassword)}>
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </Button>
            {formikEmail.values.password && (
              <Button
                variant="outline-secondary"
                onClick={() => clearField("password", formikEmail)}>
                <FaTimes />
              </Button>
            )}
            {formikEmail.touched.password && formikEmail.errors.password ? (
              <>
                <FaExclamationCircle className="text-danger ml-2" />
                <Alert key="danger" variant="danger">
                  {formikEmail.errors.password}
                </Alert>
              </>
            ) : (
              formikEmail.touched.password &&
              formikEmail.values.password && (
                <FaCheck className="text-success ml-2" />
              )
            )}
          </InputGroup>
          <Button
            type="submit"
            variant="success"
            disabled={isEmailSubmitDisabled}>
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
              type={showPassword ? "text" : "password"}
              name="currentPassword"
              placeholder="Current Password"
              aria-label="Current Password"
              className="form-control"
              value={formikPassword.values.currentPassword}
              onChange={formikPassword.handleChange}
              onBlur={formikPassword.handleBlur}
              required
            />
            <Button
              variant="outline-secondary"
              onClick={() => setShowPassword(!showPassword)}>
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </Button>
            {formikPassword.values.currentPassword && (
              <Button
                variant="outline-secondary"
                onClick={() => clearField("currentPassword", formikPassword)}>
                <FaTimes />
              </Button>
            )}
            {formikPassword.touched.currentPassword &&
            formikPassword.errors.currentPassword ? (
              <>
                <FaExclamationCircle className="text-danger ml-2" />
                <Alert key="danger" variant="danger">
                  {formikPassword.errors.currentPassword}
                </Alert>
              </>
            ) : (
              formikPassword.touched.currentPassword &&
              formikPassword.values.currentPassword && (
                <FaCheck className="text-success ml-2" />
              )
            )}
          </InputGroup>
          <InputGroup className="mb-3">
            <input
              type={showNewPassword ? "text" : "password"}
              name="newPassword"
              placeholder="New Password"
              aria-label="New Password"
              className="form-control"
              value={formikPassword.values.newPassword}
              onChange={(e) => {
                formikPassword.handleChange(e);
                setShowPasswordRequirements(true);
              }}
              onBlur={formikPassword.handleBlur}
              required
            />
            <Button
              variant="outline-secondary"
              onClick={() => setShowNewPassword(!showNewPassword)}>
              {showNewPassword ? <FaEyeSlash /> : <FaEye />}
            </Button>
            {formikPassword.values.newPassword && (
              <Button
                variant="outline-secondary"
                onClick={() => clearField("newPassword", formikPassword)}>
                <FaTimes />
              </Button>
            )}
            {formikPassword.touched.newPassword &&
            formikPassword.errors.newPassword ? (
              <>
                <FaExclamationCircle className="text-danger ml-2" />
                <Alert key="danger" variant="danger">
                  {formikPassword.errors.newPassword}
                </Alert>
              </>
            ) : (
              formikPassword.touched.newPassword &&
              formikPassword.values.newPassword &&
              !formikPassword.errors.newPassword && (
                <FaCheck className="text-success ml-2" />
              )
            )}
          </InputGroup>
          {showPasswordRequirements && (
            <PasswordValidator password={formikPassword.values.newPassword} />
          )}
          <InputGroup className="mb-3">
            <input
              type={showConfirmNewPassword ? "text" : "password"}
              name="confirmNewPassword"
              placeholder="Confirm New Password"
              aria-label="Confirm New Password"
              className="form-control"
              value={formikPassword.values.confirmNewPassword}
              onChange={formikPassword.handleChange}
              onBlur={formikPassword.handleBlur}
              required
            />
            <Button
              variant="outline-secondary"
              onClick={() =>
                setShowConfirmNewPassword(!showConfirmNewPassword)
              }>
              {showConfirmNewPassword ? <FaEyeSlash /> : <FaEye />}
            </Button>
            {formikPassword.values.confirmNewPassword && (
              <Button
                variant="outline-secondary"
                onClick={() =>
                  clearField("confirmNewPassword", formikPassword)
                }>
                <FaTimes />
              </Button>
            )}
            {formikPassword.touched.confirmNewPassword &&
            formikPassword.errors.confirmNewPassword ? (
              <>
                <FaExclamationCircle className="text-danger ml-2" />
                <Alert key="danger" variant="danger">
                  {formikPassword.errors.confirmNewPassword}
                </Alert>
              </>
            ) : (
              formikPassword.touched.confirmNewPassword &&
              formikPassword.values.confirmNewPassword &&
              !formikPassword.errors.confirmNewPassword && (
                <FaCheck className="text-success ml-2" />
              )
            )}
          </InputGroup>
          <Button
            type="submit"
            variant="success"
            disabled={isPasswordSubmitDisabled}>
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
