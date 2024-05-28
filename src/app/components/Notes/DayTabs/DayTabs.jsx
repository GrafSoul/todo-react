import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Tabs, Tab, Alert } from "react-bootstrap";
import { FaPlus, FaTrash } from "react-icons/fa";
import { Statuses } from "@store/statuses/statuses";
import {
  fetchNotes,
  addNoteAction,
  clearNotesForDayAction,
} from "@store/slices/notesSlice";

import DayTab from "@components/Notes/DayTab";
import AddNoteModal from "@components/Modals/AddNoteModal";
import ClearNotesModal from "@components/Modals/ClearNotesModal";
import Loading from "@components/Loading/Loading";

import styles from "./DayTabs.module.scss";

const DayTabs = () => {
  const [showAddModal, setShowAddModal] = useState(false);
  const [showClearModal, setShowClearModal] = useState(false);
  const [activeTab, setActiveTab] = useState(0);
  const dispatch = useDispatch();
  const {
    data: dataWithNotes = {},
    status,
    error,
  } = useSelector((state) => state.notes || {});

  useEffect(() => {
    dispatch(fetchNotes());
  }, [dispatch]);

  const handleToggleAddNote = () => setShowAddModal(!showAddModal);
  const handleToggleClearNotes = () => setShowClearModal(!showClearModal);

  const handleAddNote = (note) => {
    dispatch(addNoteAction({ day: activeTab, note }));
    setShowAddModal(false);
  };

  const handleClearNotes = () => {
    dispatch(clearNotesForDayAction({ dayIndex: activeTab }));
    setShowClearModal(false);
  };

  const handleTabSelect = (index) => {
    setActiveTab(index);
  };

  return (
    <>
      <Button
        size="sm"
        variant="success"
        id="button-add"
        className={styles.buttonAdd}
        onClick={handleToggleAddNote}>
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

      {status === Statuses.LOADING && (
        <div className={styles.preloader}>
          <Loading />
        </div>
      )}

      {status === Statuses.FAILED && (
        <Alert variant="danger" className={styles.errorMessage}>
          Error: {error}
        </Alert>
      )}

      {status === Statuses.SUCCEEDED && (
        <Tabs activeKey={activeTab} onSelect={handleTabSelect}>
          {Object.keys(dataWithNotes).map((day, index) => {
            const dayData = dataWithNotes[day];
            if (!dayData || !dayData.label || !dayData.title) {
              console.error(`Missing required data for day ${day}:`, dayData);
              return null;
            }
            return (
              <Tab key={day} eventKey={index} title={dayData.label}>
                <DayTab dayIndex={index} />
              </Tab>
            );
          })}
        </Tabs>
      )}

      <AddNoteModal
        show={showAddModal}
        onSaveNote={handleAddNote}
        onClose={handleToggleAddNote}
      />

      <ClearNotesModal
        show={showClearModal}
        onClear={handleClearNotes}
        onClose={handleToggleClearNotes}
      />
    </>
  );
};

export default DayTabs;
