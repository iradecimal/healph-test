import React, { useState } from "react";
import { Table, Tooltip, OverlayTrigger } from "react-bootstrap";
import "./dailyintaketable.css";
import ItemsPagination from "./pagination";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const DailyIntakeTable = ({ data }) => {
  const [sortedColumn, setSortedColumn] = useState(null);
  const [sortOrder, setSortOrder] = useState("asc");
  const [userIdFilter, setUserIdFilter] = useState("");
  const [startDateFilter, setStartDateFilter] = useState(null);
  const [endDateFilter, setEndDateFilter] = useState(null);
  const [minHoursOfSleepFilter, setMinHoursOfSleepFilter] = useState("");
  const [maxHoursOfSleepFilter, setMaxHoursOfSleepFilter] = useState("");
  const [minGlassesOfWaterFilter, setMinGlassesOfWaterFilter] = useState("");
  const [maxGlassesOfWaterFilter, setMaxGlassesOfWaterFilter] = useState("");
  const [minStepsTakenFilter, setMinStepsTakenFilter] = useState("");
  const [maxStepsTakenFilter, setMaxStepsTakenFilter] = useState("");
  const [minCaloricIntakeFilter, setMinCaloricIntakeFilter] = useState("");
  const [maxCaloricIntakeFilter, setMaxCaloricIntakeFilter] = useState("");
  const [minCaloricDiversityFilter, setMinCaloricDiversityFilter] =
    useState("");
  const [maxCaloricDiversityFilter, setMaxCaloricDiversityFilter] =
    useState("");
  const [minHaleFilter, setMinHaleFilter] = useState("");
  const [maxHaleFilter, setMaxHaleFilter] = useState("");
  const [minPhdFilter, setMinPhdFilter] = useState("");
  const [maxPhdFilter, setMaxPhdFilter] = useState("");

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

  const handleUserIdFilterChange = (event) => {
    setUserIdFilter(event.target.value);
  };

  const handleStartDateFilterChange = (date) => {
    setStartDateFilter(date);
  };

  const handleEndDateFilterChange = (date) => {
    setEndDateFilter(date);
  };

  const handleMinHoursOfSleepFilterChange = (event) => {
    setMinHoursOfSleepFilter(event.target.value);
  };

  const handleMaxHoursOfSleepFilterChange = (event) => {
    setMaxHoursOfSleepFilter(event.target.value);
  };

  const handleMinGlassesOfWaterFilterChange = (event) => {
    setMinGlassesOfWaterFilter(event.target.value);
  };

  const handleMaxGlassesOfWaterFilterChange = (event) => {
    setMaxGlassesOfWaterFilter(event.target.value);
  };

  const handleMinStepsTakenFilterChange = (event) => {
    setMinStepsTakenFilter(event.target.value);
  };

  const handleMaxStepsTakenFilterChange = (event) => {
    setMaxStepsTakenFilter(event.target.value);
  };

  const handleMinCaloricIntakeFilterChange = (event) => {
    setMinCaloricIntakeFilter(event.target.value);
  };

  const handleMaxCaloricIntakeFilterChange = (event) => {
    setMaxCaloricIntakeFilter(event.target.value);
  };

  const handleMinCaloricDiversityFilterChange = (event) => {
    setMinCaloricDiversityFilter(event.target.value);
  };

  const handleMaxCaloricDiversityFilterChange = (event) => {
    setMaxCaloricDiversityFilter(event.target.value);
  };

  const handleMinHaleFilterChange = (event) => {
    setMinHaleFilter(event.target.value);
  };

  const handleMaxHaleFilterChange = (event) => {
    setMaxHaleFilter(event.target.value);
  };

  const handleMinPhdFilterChange = (event) => {
    setMinPhdFilter(event.target.value);
  };

  const handleMaxPhdFilterChange = (event) => {
    setMaxPhdFilter(event.target.value);
  };

  const filteredData = sortedData.filter((item) => {
    return (
      (startDateFilter === null ||
        item.RecordDate >= startDateFilter.toLocaleDateString("en-GB")) &&
      (endDateFilter === null ||
        item.RecordDate <= endDateFilter.toLocaleDateString("en-GB")) &&
      (minHoursOfSleepFilter === "" ||
        (item.Hrsofsleep >= minHoursOfSleepFilter &&
          (maxHoursOfSleepFilter === "" ||
            item.Hrsofsleep <= maxHoursOfSleepFilter))) &&
      (minGlassesOfWaterFilter === "" ||
        (item.Glassesofwater >= minGlassesOfWaterFilter &&
          (maxGlassesOfWaterFilter === "" ||
            item.Glassesofwater <= maxGlassesOfWaterFilter))) &&
      (minStepsTakenFilter === "" ||
        (item.Stepstaken >= minStepsTakenFilter &&
          (maxStepsTakenFilter === "" ||
            item.Stepstaken <= maxStepsTakenFilter))) &&
      (minCaloricIntakeFilter === "" ||
        (item.Caloricintake >= minCaloricIntakeFilter &&
          (maxCaloricIntakeFilter === "" ||
            item.Caloricintake <= maxCaloricIntakeFilter))) &&
      (minCaloricDiversityFilter === "" ||
        (item.Caloricdiversity >= minCaloricDiversityFilter &&
          (maxCaloricDiversityFilter === "" ||
            item.Caloricdiversity <= maxCaloricDiversityFilter))) &&
      (minHaleFilter === "" ||
        (item.HALE >= minHaleFilter &&
          (maxHaleFilter === "" || item.HALE <= maxHaleFilter))) &&
      (minPhdFilter === "" ||
        (item.PHD >= minPhdFilter &&
          (maxPhdFilter === "" || item.PHD <= maxPhdFilter))) &&
      (userIdFilter === "" || item.Userid.toString() === userIdFilter)
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
      <div>
        <ItemsPagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </div>
      <div style={{ maxWidth: "100%", overflowX: "auto" }}>
        <Table striped bordered hover style={{ borderColor: "#9FC856" }}>
          <thead>
            <tr>
              <th onClick={(event) => handleSort("Userid", event)}>
                User ID
                <br />
                <input
                  type="text"
                  value={userIdFilter}
                  onChange={handleUserIdFilterChange}
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

              <th onClick={(event) => handleSort("Hrsofsleep", event)}>
                Hours of Sleep
                <br />
                Min:
                <input
                  type="text"
                  value={minHoursOfSleepFilter}
                  onChange={handleMinHoursOfSleepFilterChange}
                  placeholder="Filter"
                />
                <br />
                Max:
                <input
                  type="text"
                  value={maxHoursOfSleepFilter}
                  onChange={handleMaxHoursOfSleepFilterChange}
                  placeholder="Filter"
                />
              </th>
              <th onClick={(event) => handleSort("Glassesofwater", event)}>
                Glasses of Water
                <br />
                Min:
                <input
                  type="text"
                  value={minGlassesOfWaterFilter}
                  onChange={handleMinGlassesOfWaterFilterChange}
                  placeholder="Filter"
                />
                <br />
                Max:
                <input
                  type="text"
                  value={maxGlassesOfWaterFilter}
                  onChange={handleMaxGlassesOfWaterFilterChange}
                  placeholder="Filter"
                />
              </th>
              <th onClick={(event) => handleSort("Stepstaken", event)}>
                Steps Taken
                <br />
                Min:
                <input
                  type="text"
                  value={minStepsTakenFilter}
                  onChange={handleMinStepsTakenFilterChange}
                  placeholder="Filter"
                />
                <br />
                Max:
                <input
                  type="text"
                  value={maxStepsTakenFilter}
                  onChange={handleMaxStepsTakenFilterChange}
                  placeholder="Filter"
                />
              </th>
              <th onClick={(event) => handleSort("Caloricintake", event)}>
                Caloric Intake
                <br />
                Min:
                <input
                  type="text"
                  value={minCaloricIntakeFilter}
                  onChange={handleMinCaloricIntakeFilterChange}
                  placeholder="Filter"
                />
                <br />
                Max:
                <input
                  type="text"
                  value={maxCaloricIntakeFilter}
                  onChange={handleMaxCaloricIntakeFilterChange}
                  placeholder="Filter"
                />
              </th>
              <th onClick={(event) => handleSort("Caloricdiversity", event)}>
                Caloric Diversity
                <br />
                Min:
                <input
                  type="text"
                  value={minCaloricDiversityFilter}
                  onChange={handleMinCaloricDiversityFilterChange}
                  placeholder="Filter"
                />
                Max:
                <input
                  type="text"
                  value={maxCaloricDiversityFilter}
                  onChange={handleMaxCaloricDiversityFilterChange}
                  placeholder="Filter"
                />
              </th>
              <th onClick={(event) => handleSort("HALE", event)}>
                HALE
                <br />
                Min:
                <input
                  type="text"
                  value={minHaleFilter}
                  onChange={handleMinHaleFilterChange}
                  placeholder="Filter"
                />
                <br />
                Max:
                <input
                  type="text"
                  value={maxHaleFilter}
                  onChange={handleMaxHaleFilterChange}
                  placeholder="Filter"
                />
              </th>
              <th onClick={(event) => handleSort("PHD", event)}>
                PHD
                <br />
                Min:
                <input
                  type="text"
                  value={minPhdFilter}
                  onChange={handleMinPhdFilterChange}
                  placeholder="Filter"
                />
                <br />
                Max:
                <input
                  type="text"
                  value={maxPhdFilter}
                  onChange={handleMaxPhdFilterChange}
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
                    overlay={renderTooltip(`User ID: ${item.Userid}`)}
                  >
                    <div>{item.Userid}</div>
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
                    overlay={renderTooltip(
                      `Hours of sleep: ${item.Hrsofsleep}`
                    )}
                  >
                    <div>{item.Hrsofsleep}</div>
                  </OverlayTrigger>
                </td>
                <td>
                  <OverlayTrigger
                    placement="top"
                    overlay={renderTooltip(
                      `Glasses of water: ${item.Glassesofwater}`
                    )}
                  >
                    <div>{item.Glassesofwater}</div>
                  </OverlayTrigger>
                </td>
                <td>
                  <OverlayTrigger
                    placement="top"
                    overlay={renderTooltip(`Steps taken: ${item.Stepstaken}`)}
                  >
                    <div>{item.Stepstaken}</div>
                  </OverlayTrigger>
                </td>
                <td>
                  <OverlayTrigger
                    placement="top"
                    overlay={renderTooltip(
                      `Caloric Intake: ${item.Caloricintake}`
                    )}
                  >
                    <div>{item.Caloricintake}</div>
                  </OverlayTrigger>
                </td>
                <td>
                  <OverlayTrigger
                    placement="top"
                    overlay={renderTooltip(
                      `Caloric Diversity: ${item.Caloricdiversity}`
                    )}
                  >
                    <div>{item.Caloricdiversity}</div>
                  </OverlayTrigger>
                </td>
                <td>
                  <OverlayTrigger
                    placement="top"
                    overlay={renderTooltip(`HALE points: ${item.HALE}`)}
                  >
                    <div>{item.HALE}</div>
                  </OverlayTrigger>
                </td>
                <td>
                  <OverlayTrigger
                    placement="top"
                    overlay={renderTooltip(`PHD points: ${item.PHD}`)}
                  >
                    <div>{item.PHD}</div>
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
