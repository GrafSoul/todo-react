import { useState } from "react";
import { Button, InputGroup, FormControl, ButtonGroup } from "react-bootstrap";
import { FaSearch } from "react-icons/fa";

import DayTabs from "@components/Notes/DayTabs";

import AddNoteModal from "@components/Modals/AddNoteModal";
import ClearNotesModal from "@components/Modals/ClearNotesModal";

import styles from "./Notes.module.scss";

const Notes = () => {
  const [showAddModal, setShowAddModal] = useState(false);
  const [showClearModal, setShowClearModal] = useState(false);

  const handleToggleAddNote = () => setShowAddModal(!showAddModal);
  const handleToggleClearNotes = () => setShowClearModal(!showClearModal);

  const handleClearNotes = () => {
    setShowClearModal(false);
    console.log("Cleared");
  };

  const handleAddNote = () => {
    setShowAddModal(false);
    console.log("Added");
  };

  return (
    <div className={styles.container}>
      <InputGroup className="mb-3">
        <FormControl
          placeholder="Search..."
          aria-label="Search"
          aria-describedby="basic-addon2"
        />
        <Button
          variant="light"
          id="button-search"
          className={styles.buttonSearch}>
          <FaSearch />
        </Button>
        <Button
          variant="success"
          id="button-add"
          className={styles.buttonAdd}
          onClick={handleToggleAddNote}>
          + Add
        </Button>
        <Button
          variant="secondary"
          id="button-clear"
          className={styles.buttonClear}
          onClick={handleToggleClearNotes}>
          Clear
        </Button>
      </InputGroup>
      <div className={styles.notesHeader}>
        <span>Notes list</span>
        <ButtonGroup>
          <Button variant="outline-primary">All</Button>
          <Button variant="outline-success">Ready</Button>
          <Button variant="outline-danger">No ready</Button>
        </ButtonGroup>
      </div>
      <DayTabs />

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
    </div>
  );
};

export default Notes;
