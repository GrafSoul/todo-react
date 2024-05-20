import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { logoutUser } from "@store/slices/authSlice";

import LogoutModal from "@components/Modals/LogoutModal";

import styles from "./MainMenu.module.scss";

const MainMenu = () => {
  const [showModal, setShowModal] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const user = useSelector((state) => state.auth.user);

  const handleLogout = () => {
    dispatch(logoutUser())
      .unwrap()
      .then(() => {
        navigate("/signin");
      })
      .catch((error) => {
        console.error("Failed to logout:", error);
      });
    setShowModal(false);
  };

  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  console.log(location.pathname);

  return (
    <>
      <ul className={styles.menu}>
        <li className={location.pathname === "/" ? styles.active : ""}>
          <Link to="/">Home</Link>
        </li>
        {user ? (
          <>
            <li className={location.pathname === "/notes" ? styles.active : ""}>
              <Link to="/notes">Notes</Link>
            </li>
            <li
              className={
                location.pathname === "/settings" ? styles.active : ""
              }>
              <Link to="/settings">Settings</Link>
            </li>
            {user.role === "admin" && (
              <li
                className={location.pathname === "/users" ? styles.active : ""}>
                <Link to="/users">Users</Link>
              </li>
            )}
            <li>
              <button onClick={handleShowModal} className={styles.linkButton}>
                Logout
              </button>
            </li>
          </>
        ) : (
          <>
            <li
              className={location.pathname === "/signin" ? styles.active : ""}>
              <Link to="/signin">Sign In</Link>
            </li>
            <li
              className={location.pathname === "/signup" ? styles.active : ""}>
              <Link to="/signup">Sign Up</Link>
            </li>
          </>
        )}
      </ul>
      <LogoutModal
        show={showModal}
        handleClose={handleCloseModal}
        handleLogout={handleLogout}
      />
    </>
  );
};

export default MainMenu;
