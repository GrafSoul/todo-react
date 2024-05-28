import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Button, InputGroup, FormControl, ButtonGroup } from "react-bootstrap";
import { FaSearch, FaTimes } from "react-icons/fa";

import {
  setFilter,
  clearAllNotesAction,
  setSearchQuery,
} from "@store/slices/notesSlice";

import DayTabs from "@components/Notes/DayTabs";
import ClearNotesModal from "@components/Modals/ClearNotesModal";
import NoteItem from "@components/Notes/NoteItem";

import styles from "./Notes.module.scss";

const Notes = () => {
  const [showClearModal, setShowClearModal] = useState(false);
  const [showSearchResults, setShowSearchResults] = useState(false);
  const dispatch = useDispatch();
  const filter = useSelector((state) => state.notes.filter);
  const searchQuery = useSelector((state) => state.notes.searchQuery);
  const notes = useSelector((state) => state.notes.data);

  const handleToggleClearNotes = () => setShowClearModal(!showClearModal);

  const handleFilterChange = (filter) => {
    dispatch(setFilter(filter));
  };

  const handleSearchQueryChange = (e) => {
    dispatch(setSearchQuery(e.target.value));
    setShowSearchResults(false);
  };

  const handleClearSearch = () => {
    dispatch(setSearchQuery(""));
    setShowSearchResults(false);
  };

  const handleSearch = () => {
    setShowSearchResults(true);
  };

  const handleClearNotes = () => {
    dispatch(clearAllNotesAction());
    setShowClearModal(false);
  };

  const filterNotes = (notes, filter, searchQuery) => {
    let filteredNotes = notes;

    if (filter !== "all") {
      filteredNotes = filteredNotes.filter((note) =>
        filter === "ready" ? note.checked : !note.checked
      );
    }

    if (searchQuery) {
      const lowerSearchQuery = searchQuery.toLowerCase();
      filteredNotes = filteredNotes.filter(
        (note) =>
          note.title.toLowerCase().includes(lowerSearchQuery) ||
          note.text.toLowerCase().includes(lowerSearchQuery)
      );
    }

    return filteredNotes;
  };

  const allNotes = Object.keys(notes).reduce((acc, dayKey) => {
    const dayNotes = notes[dayKey].notes || [];
    return acc.concat(dayNotes.map((note) => ({ ...note, dayKey })));
  }, []);

  const filteredNotes = filterNotes(allNotes, filter, searchQuery);

  return (
    <div className={styles.container}>
      <InputGroup className="mb-3">
        <FormControl
          placeholder="Search..."
          aria-label="Search"
          aria-describedby="basic-addon2"
          onChange={handleSearchQueryChange}
          value={searchQuery}
        />

        <Button
          variant="light"
          id="button-clear-search"
          className={styles.buttonClearSearch}
          onClick={handleClearSearch}>
          <FaTimes />
        </Button>
        <Button
          variant="light"
          id="button-search"
          className={styles.buttonSearch}
          onClick={handleSearch}>
          <FaSearch />
        </Button>
        <Button
          variant="secondary"
          id="button-clear"
          className={styles.buttonClear}
          onClick={handleToggleClearNotes}>
          Clear All
        </Button>
      </InputGroup>

      {showSearchResults && searchQuery && (
        <div className={styles.searchResults}>
          {filteredNotes.length > 0 ? (
            filteredNotes.map((note) => (
              <NoteItem key={note.id} note={note} dayIndex={note.dayKey} />
            ))
          ) : (
            <p>No results found</p>
          )}
        </div>
      )}

      <div className={styles.notesHeader}>
        <span>Notes list</span>

        <ButtonGroup>
          <Button
            variant="outline-primary"
            active={filter === "all"}
            onClick={() => handleFilterChange("all")}>
            All
          </Button>

          <Button
            variant="outline-success"
            active={filter === "ready"}
            onClick={() => handleFilterChange("ready")}>
            Ready
          </Button>

          <Button
            variant="outline-danger"
            active={filter === "notReady"}
            onClick={() => handleFilterChange("notReady")}>
            No ready
          </Button>
        </ButtonGroup>
      </div>

      <DayTabs />

      <ClearNotesModal
        show={showClearModal}
        onClear={handleClearNotes}
        onClose={handleToggleClearNotes}
      />
    </div>
  );
};

export default Notes;
