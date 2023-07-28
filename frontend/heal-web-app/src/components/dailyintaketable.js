import React, { useState } from "react";
import { Table, Tooltip, OverlayTrigger } from "react-bootstrap";
import "./dailyintaketable.css";
import ItemsPagination from "./pagination";


const DailyIntakeTable = ({ data }) => {

  //sorting through frontend (as of now)

  const [sortedColumn, setSortedColumn] = useState(null);
  const [sortOrder, setSortOrder] = useState("asc");

  const handleSort = (column) => {
    if (sortedColumn === column) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortedColumn(column);
      setSortOrder("asc");
    }
  };

  const sortedData = data.slice().sort((a, b) => {
    if (sortOrder === "asc") {
      return a[sortedColumn] > b[sortedColumn] ? 1 : -1;
    } else {
      return a[sortedColumn] < b[sortedColumn] ? 1 : -1;
    }
  });

  //pagination through frontend (as of now)

  const [currentPage, setCurrentPage] = useState(1);
  const page_items = 15;
  const totalPages = Math.ceil(sortedData.length / page_items);
  const startIndex = (currentPage - 1) * page_items;
  const endIndex = startIndex + page_items;
  const currentData = sortedData.slice(startIndex, endIndex);

  const handlePageChange = (pageNum) => {
    setCurrentPage(pageNum);
  };

  const renderTooltip = (text) => (
    <Tooltip id="tooltip">
      {text}
    </Tooltip>
  );


  return (
    <div>
      <ItemsPagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange}  />
      <div style={{maxWidth:"100%",overflowX:"auto"}}>
        <Table striped bordered hover style={{borderColor:"#9FC856"}}>
          <thead>
            <tr>
              <th onClick={() => handleSort("Userid")}>User ID</th>
              <th onClick={() => handleSort("Date")}>Date</th>
              <th onClick={() => handleSort("Hrsofsleep")}>Hours of Sleep</th>
              <th onClick={() => handleSort("Glassesofwater")}>Glasses of Water</th>
              <th onClick={() => handleSort("Stepstaken")}>Steps Taken</th>
              <th onClick={() => handleSort("Caloricintake")}>Caloric Intake</th>
              <th onClick={() => handleSort("Caloricdiversity")}>Caloric Diversity</th>
              <th onClick={() => handleSort("HALE")}>HALE</th>
              <th onClick={() => handleSort("PHD")}>PHD</th>
              <th>Meal IDs</th>
            </tr>
          </thead>
          <tbody style={{backgroundColor: "black"}}>
            {currentData.map((item, index) => (
              <tr key={index}>
                <td>
                  <OverlayTrigger placement="top" overlay={renderTooltip(`User ID: ${item.Userid}`)}>
                    <div>{item.Userid}</div>
                  </OverlayTrigger>
                </td>
                <td>
                  <OverlayTrigger placement="top" overlay={renderTooltip(`Date: ${item.Date}`)}>
                    <div>{item.Date}</div>
                  </OverlayTrigger>
                </td>
                <td>
                  <OverlayTrigger placement="top" overlay={renderTooltip(`Hours of sleep: ${item.Hrsofsleep}`)}>
                    <div>{item.Hrsofsleep}</div>
                  </OverlayTrigger>
                </td>
                <td>
                  <OverlayTrigger placement="top" overlay={renderTooltip(`Glasses of water: ${item.Glassesofwater}`)}>
                    <div>{item.Glassesofwater}</div>
                  </OverlayTrigger>
                </td>
                <td>
                  <OverlayTrigger placement="top" overlay={renderTooltip(`Steps taken: ${item.Stepstaken}`)}>
                    <div>{item.Stepstaken}</div>
                  </OverlayTrigger>
                </td>
                <td>
                  <OverlayTrigger placement="top" overlay={renderTooltip(`Caloric Intake: ${item.Caloricintake}`)}>
                    <div>{item.Caloricintake}</div>
                  </OverlayTrigger>
                </td>
                <td>
                  <OverlayTrigger placement="top" overlay={renderTooltip(`Caloric Diversity: ${item.Caloricdiversity}`)}>
                    <div>{item.Caloricdiversity}</div>
                  </OverlayTrigger>
                </td>
                <td>
                  <OverlayTrigger placement="top" overlay={renderTooltip(`HALE points: ${item.HALE}`)}>
                    <div>{item.HALE}</div>
                  </OverlayTrigger>
                </td>
                <td>
                  <OverlayTrigger placement="top" overlay={renderTooltip(`PHD points: ${item.PHD}`)}>
                    <div>{item.PHD}</div>
                  </OverlayTrigger>
                </td>
                <td>
                  <OverlayTrigger placement="top" overlay={renderTooltip(`Meal IDs: ${item.Mealid.join(",")}`)}>
                    <div>{item.Mealid.join(",")}</div>
                  </OverlayTrigger>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
      
    </div>
  
  );
};

export default DailyIntakeTable;