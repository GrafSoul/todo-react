import { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { editorConfiguration } from "@utils/config";
import styles from "./AddNoteModal.module.scss";

const AddNoteModal = ({ show, onClose, onSaveNote }) => {
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");

  const handleSave = () => {
    onSaveNote({
      title,
      text,
      checked: false,
    });
    setTitle("");
    setText("");
  };

  return (
    <Modal show={show} onHide={onClose}>
      <Modal.Header closeButton className={styles.modalHeader}>
        <Modal.Title>Add Notes</Modal.Title>
      </Modal.Header>
      <Modal.Body className={styles.modalBody}>
        <Form>
          <Form.Group controlId="formTitle">
            <Form.Label>Title</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="formText">
            <Form.Label>Text</Form.Label>
            <CKEditor
              editor={ClassicEditor}
              config={editorConfiguration}
              data={text}
              onChange={(event, editor) => {
                const data = editor.getData();
                setText(data);
              }}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer className={styles.modalFooter}>
        <Button variant="secondary" onClick={onClose}>
          Cancel
        </Button>
        <Button variant="success" onClick={handleSave} disabled={!title}>
          Save
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default AddNoteModal;
