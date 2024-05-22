import { useEffect, useState } from "react";

import NoteItem from "@components/Notes/NoteItem";

import styles from "./DayTab.module.scss";

const DayTab = ({ day, notes }) => {
  const [currentNotes, setCurrentNote] = useState([]);

  useEffect(() => {
    setCurrentNote(notes);
  }, [day, notes]);

  const handleChangeNote = (id) => {
    currentNotes.forEach((note) => {
      if (note.id === id) {
        note.checked = !note.checked;
      }
    });
    setCurrentNote([...currentNotes]);
  };

  return (
    <>
      <div className={styles.dayTab}>
        {currentNotes.map((note) => (
          <NoteItem
            key={`${day}_${note.id}`}
            note={note}
            onChangeNote={handleChangeNote}
          />
        ))}
      </div>
    </>
  );
};

export default DayTab;
