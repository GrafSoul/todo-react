import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { FaTrash, FaEdit } from "react-icons/fa";

import CustomCheckbox from "@components/Notes/CustomCheckbox";
import EditNoteModal from "@components/Modals/EditNoteModal";
import ViewNoteModal from "@components/Modals/ViewNoteModal";
import DeleteNoteModal from "@components/Modals/DeleteNoteModal";

import styles from "./NoteItem.module.scss";

const NoteItem = ({ note, onChangeNote }) => {
  const [showEditModal, setShowEditModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const [currentNote, setCurrentNote] = useState({});

  useEffect(() => {
    setCurrentNote(note);
  }, [note]);

  const handleToggleViewNote = () => setShowViewModal(!showViewModal);
  const handleToggleDeleteNote = () => setShowDeleteModal(!showDeleteModal);
  const handleToggleEditNote = () => setShowEditModal(!showEditModal);

  const handleDeleteNote = () => {
    setShowDeleteModal(false);
    console.log("Deleted");
  };

  const handleEditNote = () => {
    setShowEditModal(false);
    console.log("Edited");
  };

  return (
    <>
      <div className={styles.noteItem}>
        <CustomCheckbox
          checked={note.checked}
          onChange={() => onChangeNote(currentNote.id)}
        />

        <span className={styles.noteTitle} onClick={handleToggleViewNote}>
          {note.title}
        </span>

        <Button
          variant="danger"
          className={styles.buttonDelete}
          onClick={handleToggleDeleteNote}>
          <FaTrash />
        </Button>
        <Button variant="primary" onClick={handleToggleEditNote}>
          <FaEdit />
        </Button>
      </div>

      <EditNoteModal
        show={showEditModal}
        onClose={handleToggleEditNote}
        onSave={handleEditNote}
        note={currentNote}
      />

      <DeleteNoteModal
        show={showDeleteModal}
        onClose={handleToggleDeleteNote}
        onDelete={handleDeleteNote}
      />

      <ViewNoteModal
        show={showViewModal}
        onClose={handleToggleViewNote}
        note={currentNote}
      />
    </>
  );
};

export default NoteItem;
