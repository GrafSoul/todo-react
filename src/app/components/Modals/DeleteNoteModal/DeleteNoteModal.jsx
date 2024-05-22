import { Modal, Button } from "react-bootstrap";
import styles from "./DeleteNoteModal.module.scss";

const DeleteNoteModal = ({ show, onClose, onDelete }) => {
  return (
    <Modal show={show} onHide={onClose}>
      <Modal.Header closeButton className={styles.modalHeader}>
        <Modal.Title>Confirm Deletion</Modal.Title>
      </Modal.Header>
      <Modal.Body className={styles.modalBody}>
        <p>Are you sure you want to delete this note?</p>
      </Modal.Body>
      <Modal.Footer className={styles.modalFooter}>
        <Button variant="secondary" onClick={onClose}>
          Cancel
        </Button>
        <Button variant="danger" onClick={onDelete}>
          Delete
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default DeleteNoteModal;
