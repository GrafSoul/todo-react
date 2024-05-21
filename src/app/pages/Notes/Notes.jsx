import { Button, InputGroup, FormControl, ButtonGroup } from "react-bootstrap";
import { FaSearch } from "react-icons/fa";
import DayTabs from "../../components/Notes/DayTabs";
import styles from "./Notes.module.scss";

const Notes = () => {
  return (
    <div className={styles.container}>
      <InputGroup className="mb-3">
        <FormControl
          placeholder="Search..."
          aria-label="Search"
          aria-describedby="basic-addon2"
        />
        <Button variant="light" id="button-search">
          <FaSearch />
        </Button>
        <Button variant="success" id="button-add">
          + Add
        </Button>
        <Button variant="secondary" id="button-clear">
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
    </div>
  );
};

export default Notes;
