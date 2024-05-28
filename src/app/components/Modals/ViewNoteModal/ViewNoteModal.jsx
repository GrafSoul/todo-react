import { Modal, Button } from "react-bootstrap";
import styles from "./ViewNoteModal.module.scss";

const ViewNoteModal = ({ show, note, onClose }) => {
  return (
    <Modal show={show} onHide={onClose}>
      <Modal.Header closeButton className={styles.modalHeader}>
        <Modal.Title>{note.title}</Modal.Title>
      </Modal.Header>
      <Modal.Body className={styles.modalBody}>
        <div dangerouslySetInnerHTML={{ __html: note.text }} />
      </Modal.Body>
      <Modal.Footer className={styles.modalFooter}>
        <Button variant="secondary" onClick={onClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ViewNoteModal;
