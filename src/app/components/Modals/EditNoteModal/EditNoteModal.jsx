import { Modal, Button, Form } from "react-bootstrap";
import styles from "./EditNoteModal.module.scss";

const EditNoteModal = ({ show, onClose, onSave, note }) => {
  return (
    <Modal show={show} onHide={onClose}>
      <Modal.Header closeButton className={styles.modalHeader}>
        <Modal.Title>Edit Notes</Modal.Title>
      </Modal.Header>
      <Modal.Body className={styles.modalBody}>
        <Form>
          <Form.Group controlId="formTitle">
            <Form.Label>Title</Form.Label>
            <Form.Control type="text" defaultValue={note.title} />
          </Form.Group>
          <Form.Group controlId="formText">
            <Form.Label>Text</Form.Label>
            <Form.Control as="textarea" rows={3} defaultValue={note.text} />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer className={styles.modalFooter}>
        <Button variant="secondary" onClick={onClose}>
          Cancel
        </Button>
        <Button variant="success" onClick={onSave}>
          Save
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default EditNoteModal;
