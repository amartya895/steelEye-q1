import styles from "./ListRow.module.css";

const ListCell = ({ children }) => {
  const handleClick = () =>{
    console.log(children);
  }
  return <tr className={styles.cell} onClick={handleClick}>{children}</tr>;
};

export default ListCell;
