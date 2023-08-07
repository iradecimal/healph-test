import React, { useState } from "react";
import { Table, Tooltip, OverlayTrigger, Form } from "react-bootstrap";
import "./dailyintaketable.css";
import ItemsPagination from "./pagination";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const ReportsTable = ({ data }) => {
  const [sortedColumn, setSortedColumn] = useState(null);

  const [sortOrder, setSortOrder] = useState("asc");
  const [ReportIdFilter, setReportIdFilter] = useState("");
  const [startDateFilter, setStartDateFilter] = useState(null);
  const [endDateFilter, setEndDateFilter] = useState(null);
  const [selectedTypeFilter, setSelectedTypeFilter] = useState("");
  const [DetailsFilter, setDetailsFilter] = useState("");
  const [selectedStatusFilter, setSelectedStatusFilter] = useState("");

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

  const handleReportIdFilterChange = (event) => {
    setReportIdFilter(event.target.value);
  };

  const handleStartDateFilterChange = (date) => {
    setStartDateFilter(date);
  };

  const handleEndDateFilterChange = (date) => {
    setEndDateFilter(date);
  };

  const handleTypeFilterChange = (event) => {
    setSelectedTypeFilter(event.target.value);
  };

  const handleStatusFilterChange = (event) => {
    setSelectedStatusFilter(event.target.value);
  };

  const handleDetailsFilterChange = (event) => {
    setDetailsFilter(event.target.value);
  };

  const filteredData = sortedData.filter((item) => {
    return (
      (startDateFilter === null ||
        item.RecordDate >= startDateFilter.toLocaleDateString("en-GB")) &&
      (endDateFilter === null ||
        item.RecordDate <= endDateFilter.toLocaleDateString("en-GB")) &&
      (DetailsFilter === "" ||
        item.Details.toLowerCase().includes(DetailsFilter.toLowerCase())) &&
      (selectedTypeFilter === "" ||
        item.Type.toString() === selectedTypeFilter) &&
      (ReportIdFilter === "" || item.ReportId.toString() === ReportIdFilter) &&
      (selectedStatusFilter === "" ||
        item.Status.toString() === selectedStatusFilter)
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
        <Table
          striped
          bordered
          hover
          style={{ borderColor: "#9FC856" }}
          size="sm"
        >
          <thead>
            <tr>
              <th onClick={(event) => handleSort("ReportId", event)}>
                Report ID
                <br />
                <Form.Control
                  type="text"
                  value={ReportIdFilter}
                  onChange={handleReportIdFilterChange}
                  placeholder="Filter"
                  style={{ width: "100px" }}
                />
              </th>
              <th onClick={(event) => handleSort("RecordDate", event)}>
                Date
                <br />
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <div>Start Date:</div>
                  <DatePicker
                    selected={startDateFilter}
                    onChange={handleStartDateFilterChange}
                    dateFormat="yyyy-MM-dd"
                    placeholderText="Select Start Date"
                  />
                </div>
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <div>End Date:</div>
                  <DatePicker
                    selected={endDateFilter}
                    onChange={handleEndDateFilterChange}
                    dateFormat="yyyy-MM-dd"
                    placeholderText="Select End Date"
                  />
                </div>
              </th>
              <th>
                Type
                <br />
                <Form.Control
                  as="select"
                  value={selectedTypeFilter}
                  onChange={handleTypeFilterChange}
                >
                  <option value="">All</option>
                  <option value={0}>0</option>
                  <option value={1}>1</option>
                  <option value={2}>2</option>
                </Form.Control>
              </th>

              <th>
                Details
                <br />
                <Form.Control
                  type="text"
                  value={DetailsFilter}
                  onChange={handleDetailsFilterChange}
                  placeholder="Filter"
                />
              </th>

              <th>
                Status
                <br />
                <Form.Control
                  as="select"
                  value={selectedStatusFilter}
                  onChange={handleStatusFilterChange}
                >
                  <option value="">All</option>
                  <option value="0">Not Fixed</option>
                  <option value="1">Fixed</option>
                </Form.Control>
              </th>
            </tr>
          </thead>
          <tbody style={{ backgroundColor: "black" }}>
            {currentData.map((item, index) => (
              <tr key={index}>
                <td>
                  <OverlayTrigger
                    placement="top"
                    overlay={renderTooltip(`Report ID: ${item.ReportId}`)}
                  >
                    <div>{item.ReportId}</div>
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
                    overlay={renderTooltip(`Type: ${item.Type}`)}
                  >
                    <div>{item.Type}</div>
                  </OverlayTrigger>
                </td>
                <td>
                  <OverlayTrigger
                    placement="top"
                    overlay={renderTooltip(`Details: ${item.Details}`)}
                  >
                    <div>{item.Details}</div>
                  </OverlayTrigger>
                </td>

                <td>
                  <OverlayTrigger
                    placement="top"
                    overlay={renderTooltip(
                      `Status: ${item.Status === 0 ? "Not Fixed" : "Fixed"}`
                    )}
                  >
                    <div
                      className={`status-shape ${
                        item.Status === 0 ? "red" : "green"
                      }`}
                      style={{ cursor: "pointer" }} // Add cursor style
                    >
                      {item.Status === 0 ? "Not Fixed" : "Fixed"}
                    </div>
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

export default ReportsTable;
