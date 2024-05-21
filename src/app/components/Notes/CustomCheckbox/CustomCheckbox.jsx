const CustomCheckbox = ({ checked, onChange }) => {
  return (
    <input
      type="checkbox"
      checked={checked}
      onChange={onChange}
      style={{
        width: "20px",
        height: "20px",
        borderRadius: "3px",
        border: "2px solid black",
        appearance: "none",
        WebkitAppearance: "none",
        MozAppearance: "none",
        backgroundColor: checked ? "green" : "white",
      }}
    />
  );
};

export default CustomCheckbox;
