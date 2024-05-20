import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Button from "react-bootstrap/Button";
import styles from "./Welcome.module.scss";

const Welcome = () => {
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.user);

  return (
    <div className={styles.container}>
      <div className={styles.entrance}>
        <div className={styles.entranceBlock}>
          {user ? (
            <>
              <p>You can log out using the button below.</p>
              <Button variant="success" onClick={() => navigate("/logout")}>
                Logout
              </Button>
            </>
          ) : (
            <>
              <Button variant="success" onClick={() => navigate("/signin")}>
                Sign In
              </Button>
              <Button variant="success" onClick={() => navigate("/signup")}>
                Sign Up
              </Button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Welcome;
