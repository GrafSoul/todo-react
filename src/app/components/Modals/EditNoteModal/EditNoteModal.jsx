import { useState, useEffect } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import styles from "./EditNoteModal.module.scss";

const EditNoteModal = ({ show, onClose, onSave, note }) => {
  const [updatedNote, setUpdatedNote] = useState({ ...note });

  useEffect(() => {
    setUpdatedNote({ ...note });
  }, [note]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdatedNote((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSave = () => {
    onSave(updatedNote);
  };

  return (
    <Modal show={show} onHide={onClose}>
      <Modal.Header closeButton className={styles.modalHeader}>
        <Modal.Title>Edit Notes</Modal.Title>
      </Modal.Header>
      <Modal.Body className={styles.modalBody}>
        <Form>
          <Form.Group controlId="formTitle">
            <Form.Label>Title</Form.Label>
            <Form.Control
              type="text"
              name="title"
              value={updatedNote.title}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group controlId="formText">
            <Form.Label>Text</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              name="text"
              value={updatedNote.text}
              onChange={handleChange}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer className={styles.modalFooter}>
        <Button variant="secondary" onClick={onClose}>
          Cancel
        </Button>
        <Button variant="success" onClick={handleSave}>
          Save
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default EditNoteModal;
