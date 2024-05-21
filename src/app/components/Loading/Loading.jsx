import { Spinner } from "react-bootstrap";

import styles from "./Loading.module.scss";

const Loading = () => {
  return (
    <div className={styles.loadingContainer}>
      <Spinner animation="border" role="status" />
    </div>
  );
};

export default Loading;
