import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { FaTrash, FaEdit } from "react-icons/fa";
import { useDispatch } from "react-redux";

import CustomCheckbox from "@components/Notes/CustomCheckbox";
import EditNoteModal from "@components/Modals/EditNoteModal";
import ViewNoteModal from "@components/Modals/ViewNoteModal";
import DeleteNoteModal from "@components/Modals/DeleteNoteModal";
import {
  toggleNoteCheckedAction,
  deleteNoteAction,
  updateNoteAction,
} from "@store/slices/notesSlice";

import styles from "./NoteItem.module.scss";

const NoteItem = ({ note, dayIndex }) => {
  const dispatch = useDispatch();

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

  const handleCheckboxChange = () => {
    dispatch(
      toggleNoteCheckedAction({
        dayIndex,
        noteId: note.id,
        checked: !note.checked,
      })
    );
  };

  const handleDeleteNote = () => {
    dispatch(deleteNoteAction({ day: dayIndex, noteId: note.id }));
    setShowDeleteModal(false);
  };

  const handleEditNote = (updatedNote) => {
    dispatch(
      updateNoteAction({
        day: dayIndex,
        noteId: note.id,
        note: updatedNote,
      })
    );
    setShowEditModal(false);
  };

  return (
    <>
      <div className={styles.noteItem}>
        <CustomCheckbox
          checked={note.checked}
          onChange={handleCheckboxChange}
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
