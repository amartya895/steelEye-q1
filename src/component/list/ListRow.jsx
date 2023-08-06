import styles from "./ListRow.module.css";

const ListCell = ({ children ,handleOrder  }) => {
  const handleClick = () =>{
    console.log(children);
    handleOrder(children)
    console.log('hi clicked on row')
  
  }
  return <tr className={styles.cell}  onClick={handleClick}>{children}</tr>;
};

export default ListCell;
