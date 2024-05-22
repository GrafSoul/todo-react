import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";

import { FaPlus, FaTrash } from "react-icons/fa";

import NoteItem from "@components/Notes/NoteItem";
import AddNoteModal from "@components/Modals/AddNoteModal";
import ClearNotesModal from "@components/Modals/ClearNotesModal";

import styles from "./DayTab.module.scss";

const notes = [
  {
    id: 1,
    title: "Title name",
    text: "lorem ipsum lorem ipsum",
    checked: false,
  },
  {
    id: 2,
    title: "Title name",
    text: "lorem ipsum lorem ipsum",
    checked: true,
  },
];

const DayTab = ({ day }) => {
  const [showAddModal, setShowAddModal] = useState(false);
  const [showClearModal, setShowClearModal] = useState(false);
  const [currentNotes, setCurrentNote] = useState([]);

  useEffect(() => {
    setCurrentNote(notes);
  }, [day]);

  const handleChangeNote = (id) => {
    currentNotes.forEach((note) => {
      if (note.id === id) {
        note.checked = !note.checked;
      }
    });
    setCurrentNote([...currentNotes]);
  };

  const handleToggleAddNote = () => setShowAddModal(!showAddModal);
  const handleToggleClearNotes = () => setShowClearModal(!showClearModal);

  const handleAddNote = () => {
    setShowAddModal(false);
    console.log("Added");
  };

  const handleClearNotes = () => {
    setShowClearModal(false);
    console.log("Cleared");
  };

  return (
    <>
      <div className={styles.dayTab}>
        <Button
          size="sm"
          variant="success"
          id="button-add"
          className={styles.buttonAdd}
          onClick={() => handleToggleAddNote("monday")}>
          <FaPlus /> Add
        </Button>

        <Button
          size="sm"
          variant="secondary"
          id="button-clear"
          className={styles.buttonClear}
          onClick={handleToggleClearNotes}>
          <FaTrash /> Clear
        </Button>

        {currentNotes.map((note) => (
          <NoteItem
            key={`${day}_${note.id}`}
            note={note}
            onChangeNote={handleChangeNote}
          />
        ))}
      </div>

      <AddNoteModal
        show={showAddModal}
        onSaveNote={handleToggleAddNote}
        onClose={handleAddNote}
      />

      <ClearNotesModal
        show={showClearModal}
        onClear={handleClearNotes}
        onClose={handleToggleClearNotes}
      />
    </>
  );
};

export default DayTab;
