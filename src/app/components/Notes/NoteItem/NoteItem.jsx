import { Button } from "react-bootstrap";
import CustomCheckbox from "../CustomCheckbox";
import { FaTrash, FaEdit } from "react-icons/fa";

const NoteItem = ({ title, checked, onCheckChange }) => {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "10px",
        backgroundColor: "#f5f5f5",
        marginBottom: "5px",
      }}>
      <CustomCheckbox checked={checked} onChange={onCheckChange} />
      <span style={{ flex: 1, marginLeft: "10px" }}>{title}</span>
      <Button variant="danger" style={{ marginRight: "5px" }}>
        <FaTrash />
      </Button>
      <Button variant="primary">
        <FaEdit />
      </Button>
    </div>
  );
};

export default NoteItem;
