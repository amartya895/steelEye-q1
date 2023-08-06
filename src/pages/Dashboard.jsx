import { useState } from "react";

// Data
import mockData from "../assets/data.json";
import timestamps from "../assets/timeStamps.json";

// Components
import Dropdown from "../component/dropdown/Dropdown";
import HeaderTitle from "../component/header-title/HeaderTitle";
import Search from "../component/search/Search";
import List from "../component/list/List";

// Styles
import styles from "./Dashboard.module.css";
import Card from "../component/card/Card";

//stories

const Dashboard = () => {
  const [currency, setCurrency] = useState("EUR");
  const [searchText, setSearchText] = useState("");
  const [selectedOrderDetails, setSelectedOrderDetails] = useState({});
  const [selectedOrderTimeStamps, setSelectedOrderTimeStamps] = useState({});

  const filteredRows = mockData.results.filter((row) => {
    const searchLowerCase = searchText.toLowerCase();
    const orderIDLowerCase = row["&id"].toLowerCase();
    return (
      orderIDLowerCase.includes(searchLowerCase) &&
      (currency === "USD" || row.bestExecutionData.orderVolume[currency])
    );
  });

  function handleOrder(order) {
    let orderId = order[0].props.children;
    console.log(orderId);

    const foundTimestamps = timestamps.results.find(
      (timestampData) => timestampData["&id"] === orderId
    );

    if (foundTimestamps) {
      setSelectedOrderTimeStamps(foundTimestamps.timestamps);
    } else {
      setSelectedOrderTimeStamps({});
    }

    const foundOrderDetails = mockData.results.find(
      (rowData) => rowData["&id"] === orderId
    );

    console.log(foundOrderDetails.executionDetails);

    if (foundOrderDetails && foundOrderDetails.executionDetails) {
      setSelectedOrderDetails(foundOrderDetails.executionDetails);
    } else {
      setSelectedOrderDetails({});
    }
  }

  return (
    <div>
      <div className={styles.header}>
        <HeaderTitle
          primaryTitle="Orders"
          secondaryTitle={mockData.results.length}
        />
        <div className={styles.actionBox}>
          <Search
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
          <Dropdown
            options={["GBP", "USD", "JPY", "EUR"]}
            onChange={(e) => setCurrency(e.target.value)}
            selectedItem={currency}
          />
         
         
        </div>
      </div>
      <div className={styles.content}>
        <div className={styles.section}>
          <Card
            cardData={selectedOrderDetails}
            title="Selected Order Details"
          />
          <Card
            cardData={selectedOrderTimeStamps}
            title="Selected Order Timestamps"
          />
        </div>
        <List
          rows={filteredRows}
          timestampVal={timestamps.results}
          curr={currency}
          handleOrder={handleOrder}
        />
      </div>
    </div>
  );
};

export default Dashboard;
