import { useSelector } from "react-redux";
import NoteItem from "@components/Notes/NoteItem";
import styles from "./DayTab.module.scss";

const DayTab = ({ dayIndex }) => {
  const filter = useSelector((state) => state.notes.filter);
  const notes = useSelector((state) => state.notes.data[dayIndex]?.notes || []);

  const filterNotes = (notes, filter) => {
    switch (filter) {
      case "ready":
        return notes.filter((note) => note.checked);
      case "notReady":
        return notes.filter((note) => !note.checked);
      case "all":
      default:
        return notes;
    }
  };

  const filteredNotes = filterNotes(notes, filter);

  return (
    <div className={styles.dayTab}>
      {filteredNotes && filteredNotes.length > 0 ? (
        filteredNotes.map((note, index) => (
          <NoteItem
            key={`${dayIndex}-${index}`}
            note={note}
            dayIndex={dayIndex}
          />
        ))
      ) : (
        <p>No notes available</p>
      )}
    </div>
  );
};

export default DayTab;
