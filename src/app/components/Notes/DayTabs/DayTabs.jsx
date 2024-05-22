import { useState } from "react";
import { Button, Tabs, Tab } from "react-bootstrap";
import { FaPlus, FaTrash } from "react-icons/fa";

import DayTab from "@components/Notes/DayTab";

import AddNoteModal from "@components/Modals/AddNoteModal";
import ClearNotesModal from "@components/Modals/ClearNotesModal";

import styles from "./DayTabs.module.scss";

const dataWithNotes = [
  {
    id: 1,
    title: "monday",
    label: "Пн",
    notes: [
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
    ],
  },
  {
    id: 2,
    title: "tuesday",
    label: "Вт",
    notes: [
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
    ],
  },
  {
    id: 3,
    title: "wednesday",
    label: "Ср",
    notes: [
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
    ],
  },
  {
    id: 4,
    title: "thursday",
    label: "Чт",
    notes: [
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
    ],
  },
  {
    id: 5,
    title: "friday",
    label: "Пт",
    notes: [
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
    ],
  },
  {
    id: 6,
    title: "saturday",
    label: "Суб",
    notes: [
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
    ],
  },
  {
    id: 7,
    title: "sunday",
    label: "Вос",
    notes: [
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
    ],
  },
];

const DayTabs = () => {
  const [showAddModal, setShowAddModal] = useState(false);
  const [showClearModal, setShowClearModal] = useState(false);
  const [activeTab, setActiveTab] = useState("monday");

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

  const handleTabSelect = (key) => {
    setActiveTab(key);
    console.log("Active Tab:", activeTab);
  };

  return (
    <>
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

      <Tabs defaultActiveKey="monday" onSelect={handleTabSelect}>
        {dataWithNotes.map((day, index) => (
          <Tab
            key={`${day.title}_${index}`}
            eventKey={day.title}
            title={day.label}>
            <DayTab day={day.title} notes={day.notes} />
          </Tab>
        ))}
      </Tabs>

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

export default DayTabs;
