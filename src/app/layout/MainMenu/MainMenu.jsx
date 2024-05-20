import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { logoutUser } from "@store/slices/authSlice";

import LogoutModal from "@components/Modals/LogoutModal";

import styles from "./MainMenu.module.scss";

const MainMenu = () => {
  const [showModal, setShowModal] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();
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

  return (
    <>
      <ul className={styles.menu}>
        <li>
          <Link to="/">Home</Link>
        </li>
        {user ? (
          <>
            <li>
              <Link to="/notes">Notes</Link>
            </li>
            <li>
              <Link to="/settings">Settings</Link>
            </li>
            {user.role === "admin" && (
              <li>
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
            <li>
              <Link to="/signin">Sign In</Link>
            </li>
            <li>
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
