import styles from "./CustomCheckbox.module.scss";

const CustomCheckbox = ({ checked, onChange }) => {
  return (
    <input
      type="checkbox"
      checked={checked}
      onChange={onChange}
      className={`${styles.checkbox} ${checked ? styles.checked : ""}`}
    />
  );
};

export default CustomCheckbox;
