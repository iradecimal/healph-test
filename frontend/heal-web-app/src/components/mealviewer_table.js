import React, { useState } from "react";
import { Table, Tooltip, OverlayTrigger } from "react-bootstrap";
import "./dailyintaketable.css";
import ItemsPagination from "./pagination";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const MealViewerTable = ({ data }) => {
  const [sortedColumn, setSortedColumn] = useState(null);
  const [sortOrder, setSortOrder] = useState("asc");
  const [mealIdFilter, setMealIdFilter] = useState("");
  const [startDateFilter, setStartDateFilter] = useState(null);
  const [endDateFilter, setEndDateFilter] = useState(null);
  const [minFatsFilter, setMinFatsFilter] = useState("");
  const [maxFatsFilter, setMaxFatsFilter] = useState("");
  const [minCarbohydratesFilter, setMinCarbohydratesFilter] = useState("");
  const [maxCarbohydratesFilter, setMaxCarbohydratesFilter] = useState("");
  const [minProteinFilter, setMinProteinFilter] = useState("");
  const [maxProteinFilter, setMaxProteinFilter] = useState("");
  const [minFoodwasteFilter, setMinFoodwasteFilter] = useState("");
  const [maxFoodwasteFilter, setMaxFoodwasteFilter] = useState("");
  const [descriptionFilter, setDescriptionFilter] = useState("");
  const [foodCombinationFilter, setFoodCombinationFilter] = useState("");

  //sorting through frontend (as of now)

  const handleSort = (column, event) => {
    if (event.target.nodeName === "INPUT") {
      return;
    }

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

  //Filtering through frontend(as of now)

  const handleMealIdFilterChange = (event) => {
    setMealIdFilter(event.target.value);
  };

  const handleStartDateFilterChange = (date) => {
    setStartDateFilter(date);
  };

  const handleEndDateFilterChange = (date) => {
    setEndDateFilter(date);
  };

  const handleMinFatsFilterChange = (event) => {
    setMinFatsFilter(event.target.value);
  };

  const handleMaxFatsFilterChange = (event) => {
    setMaxFatsFilter(event.target.value);
  };

  const handleMinCarbohydratesFilterChange = (event) => {
    setMinCarbohydratesFilter(event.target.value);
  };

  const handleMaxCarbohydratesFilterChange = (event) => {
    setMaxCarbohydratesFilter(event.target.value);
  };

  const handleMinProteinFilterChange = (event) => {
    setMinProteinFilter(event.target.value);
  };

  const handleMaxProteinFilterChange = (event) => {
    setMaxProteinFilter(event.target.value);
  };

  const handleMinFoodwasteFilterChange = (event) => {
    setMinFoodwasteFilter(event.target.value);
  };

  const handleMaxFoodwasteFilterChange = (event) => {
    setMaxFoodwasteFilter(event.target.value);
  };

  const handleDescriptionFilterChange = (event) => {
    setDescriptionFilter(event.target.value);
  };

  const handleFoodCombinationFilterChange = (event) => {
    setFoodCombinationFilter(event.target.value);
  };

  const filteredData = sortedData.filter((item) => {
    return (
      (startDateFilter === null ||
        item.RecordDate >= startDateFilter.toLocaleDateString("en-GB")) &&
      (endDateFilter === null ||
        item.RecordDate <= endDateFilter.toLocaleDateString("en-GB")) &&
      (minFatsFilter === "" ||
        (item.Fat >= minFatsFilter &&
          (maxFatsFilter === "" || item.Fat <= maxFatsFilter))) &&
      (minCarbohydratesFilter === "" ||
        (item.Carbohydrates >= minCarbohydratesFilter &&
          (maxCarbohydratesFilter === "" ||
            item.Carbohydrates <= maxCarbohydratesFilter))) &&
      (minProteinFilter === "" ||
        (item.Protein >= minProteinFilter &&
          (maxProteinFilter === "" || item.Protein <= maxProteinFilter))) &&
      (minFoodwasteFilter === "" ||
        (item.Foodwaste >= minFoodwasteFilter &&
          (maxFoodwasteFilter === "" ||
            item.Foodwaste <= maxFoodwasteFilter))) &&
      (descriptionFilter === "" ||
        item.Description.toLowerCase().includes(
          descriptionFilter.toLowerCase()
        )) &&
      (foodCombinationFilter === "" ||
        item.Foodcombination.some((food) =>
          food.toLowerCase().includes(foodCombinationFilter.toLowerCase())
        )) &&
      (mealIdFilter === "" || item.Mealid.toString() === mealIdFilter)
    );
  });

  //pagination through frontend (as of now)

  const [currentPage, setCurrentPage] = useState(1);
  const page_items = 15;
  const totalPages = Math.ceil(filteredData.length / page_items);
  const startIndex = (currentPage - 1) * page_items;
  const endIndex = startIndex + page_items;
  const currentData = filteredData.slice(startIndex, endIndex);

  const handlePageChange = (pageNum) => {
    setCurrentPage(pageNum);
  };

  const renderTooltip = (text) => <Tooltip id="tooltip">{text}</Tooltip>;

  return (
    <div>
      <ItemsPagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
      <div style={{ maxWidth: "100%", overflowX: "auto" }}>
        <Table striped bordered hover style={{ borderColor: "#9FC856" }}>
          <thead>
            <tr>
              <th onClick={(event) => handleSort("Userid", event)}>
                Meal ID
                <br />
                <input
                  type="text"
                  value={mealIdFilter}
                  onChange={handleMealIdFilterChange}
                  placeholder="Filter"
                  style={{ width: "100px" }}
                />
              </th>
              <th onClick={(event) => handleSort("RecordDate", event)}>
                Date
                <br />
                Start Date: <div></div>
                <DatePicker
                  selected={startDateFilter}
                  onChange={handleStartDateFilterChange}
                  dateFormat="yyyy-MM-dd"
                  placeholderText="Select Start Date"
                />
                <br />
                End Date:{" "}
                <DatePicker
                  selected={endDateFilter}
                  onChange={handleEndDateFilterChange}
                  dateFormat="yyyy-MM-dd"
                  placeholderText="Select End Date"
                />
              </th>
              <th onClick={(event) => handleSort("Fats", event)}>
                Fats
                <br />
                Min:
                <input
                  type="text"
                  value={minFatsFilter}
                  onChange={handleMinFatsFilterChange}
                  placeholder="Filter"
                />
                <br />
                Max:
                <input
                  type="text"
                  value={maxFatsFilter}
                  onChange={handleMaxFatsFilterChange}
                  placeholder="Filter"
                />
              </th>
              <th onClick={(event) => handleSort("Carbohydrates", event)}>
                Carbohydrates
                <br />
                Min:
                <input
                  type="text"
                  value={minCarbohydratesFilter}
                  onChange={handleMinCarbohydratesFilterChange}
                  placeholder="Filter"
                />
                <br />
                Max:
                <input
                  type="text"
                  value={maxCarbohydratesFilter}
                  onChange={handleMaxCarbohydratesFilterChange}
                  placeholder="Filter"
                />
              </th>
              <th onClick={(event) => handleSort("Protein", event)}>
                Protein
                <br />
                Min:
                <input
                  type="text"
                  value={minProteinFilter}
                  onChange={handleMinProteinFilterChange}
                  placeholder="Filter"
                />
                <br />
                Max:
                <input
                  type="text"
                  value={maxProteinFilter}
                  onChange={handleMaxProteinFilterChange}
                  placeholder="Filter"
                />
              </th>
              <th onClick={(event) => handleSort("Foodwaste", event)}>
                Food waste
                <br />
                Min:
                <input
                  type="text"
                  value={minFoodwasteFilter}
                  onChange={handleMinFoodwasteFilterChange}
                  placeholder="Filter"
                />
                <br />
                Max:
                <input
                  type="text"
                  value={maxFoodwasteFilter}
                  onChange={handleMaxFoodwasteFilterChange}
                  placeholder="Filter"
                />
              </th>
              <th>
                Food Combination
                <br />
                <input
                  type="text"
                  value={foodCombinationFilter}
                  onChange={handleFoodCombinationFilterChange}
                  placeholder="Filter"
                />
              </th>
              <th>
                Description
                <br />
                <input
                  type="text"
                  value={descriptionFilter}
                  onChange={handleDescriptionFilterChange}
                  placeholder="Filter"
                />
              </th>
            </tr>
          </thead>
          <tbody style={{ backgroundColor: "black" }}>
            {currentData.map((item, index) => (
              <tr key={index}>
                <td>
                  <OverlayTrigger
                    placement="top"
                    overlay={renderTooltip(`Meal ID: ${item.Mealid}`)}
                  >
                    <div>{item.Mealid}</div>
                  </OverlayTrigger>
                </td>
                <td>
                  <OverlayTrigger
                    placement="top"
                    overlay={renderTooltip(`Date: ${item.RecordDate}`)}
                  >
                    <div>{item.RecordDate}</div>
                  </OverlayTrigger>
                </td>
                <td>
                  <OverlayTrigger
                    placement="top"
                    overlay={renderTooltip(`Fats: ${item.Fats}`)}
                  >
                    <div>{item.Fats}</div>
                  </OverlayTrigger>
                </td>
                <td>
                  <OverlayTrigger
                    placement="top"
                    overlay={renderTooltip(
                      `Carbohydrates: ${item.Carbohydrates}`
                    )}
                  >
                    <div>{item.Carbohydrates}</div>
                  </OverlayTrigger>
                </td>
                <td>
                  <OverlayTrigger
                    placement="top"
                    overlay={renderTooltip(`Protein: ${item.Protein}`)}
                  >
                    <div>{item.Protein}</div>
                  </OverlayTrigger>
                </td>
                <td>
                  <OverlayTrigger
                    placement="top"
                    overlay={renderTooltip(`Food Waste: ${item.Foodwaste}`)}
                  >
                    <div>{item.Foodwaste}</div>
                  </OverlayTrigger>
                </td>
                <td>
                  <OverlayTrigger
                    placement="top"
                    overlay={renderTooltip(
                      `Food Combination: ${item.Foodcombination.join(",")}`
                    )}
                  >
                    <div>{item.Foodcombination.join(",")}</div>
                  </OverlayTrigger>
                </td>
                <td>
                  <OverlayTrigger
                    placement="top"
                    overlay={renderTooltip(`Description: ${item.Description}`)}
                  >
                    <div>{item.Description}</div>
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

export default MealViewerTable;
