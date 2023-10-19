import React, { useState, useEffect, useCallback } from "react";
import { Table, Tooltip, OverlayTrigger, Spinner, Form } from "react-bootstrap";
import ItemsPagination from "./pagination";
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const ReportsTable = () => {
  const [reportsTable, setReportsTable] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [sortField, setSortField] = useState(null);
  const [sortDirection, setSortDirection] = useState(1);

  // State variables for filter criteria
  const [reportIdFilter, setReportIdFilter] = useState("");
  const [userIdFilter, setUserIdFilter] = useState("");
  const [startDateFilter, setStartDateFilter] = useState(null);
  const [endDateFilter, setEndDateFilter] = useState(null);
  const [typeFilter, setTypeFilter] = useState("");
  const [detailsFilter, setDetailsFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");

  const fetchData = useCallback(
    (page, limit) => {
      const filters = [];

      if (reportIdFilter) {
        filters.push(`_id[lte]=${reportIdFilter}`);
      }

      if (userIdFilter) {
        filters.push(`uid[lte]=${userIdFilter}`);
      }

      if (startDateFilter) {
        filters.push(
          `datetime[gte]=${startDateFilter.toLocaleDateString("en-CA")}`
        );
      }

      if (endDateFilter) {
        filters.push(
          `datetime[lte]=${endDateFilter.toLocaleDateString("en-CA")}`
        );
      }

      if (typeFilter) {
        filters.push(`reptype[lte]=${typeFilter}`);
      }

      if (detailsFilter) {
        filters.push(`det[lte]=${detailsFilter}`);
      }

      if (statusFilter !== "") {
        filters.push(`status=${statusFilter === "Fixed" ? "true" : "false"}`);
      }

      const filtersParam = filters.length > 0 ? filters.join("&") : "";

      const sortParam = sortField
        ? `sort=${sortDirection === 1 ? sortField : `-${sortField}`}`
        : "";

      const queryParams = [sortParam, filtersParam].filter(Boolean).join("&");

      setLoading(true);

      axios
        .get(
          `${process.env.REACT_APP_BACKEND}/dashboard/reports/${page}/${limit}?${queryParams}`
        )
        .then((response) => {
          console.log(response.data);
          setReportsTable(response.data.docs);
          setLoading(false);
          setCurrentPage(response.data.page);
          setTotalPages(response.data.totalPages);
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
          setLoading(false);
        });
    },
    [
      sortDirection,
      sortField,
      reportIdFilter,
      userIdFilter,
      startDateFilter,
      endDateFilter,
      typeFilter,
      detailsFilter,
      statusFilter,
    ]
  );

  useEffect(() => {
    const page = 1;
    const limit = 20;
    fetchData(page, limit);
  }, [fetchData]);

  const handlePageChange = (newPage) => {
    const limit = 20;
    if (newPage >= 1 && newPage <= totalPages) {
      fetchData(newPage, limit);
    }
  };

  const handleSort = (field, e) => {
    if (e.target.tagName !== "INPUT" && e.target.tagName !== "SELECT") {
      const limit = 20;
      if (field === sortField) {
        setSortDirection(sortDirection === 1 ? -1 : 1);
      } else {
        setSortDirection(1);
      }
      setSortField(field);
      fetchData(currentPage, limit);
    }
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
        {loading ? (
          <Spinner
            animation="border"
            role="status"
            style={{ color: "#9FC856" }}
          />
        ) : (
          <Table striped bordered hover style={{ borderColor: "#9FC856" }}>
            <thead>
              <tr>
                <th onClick={(e) => handleSort("_id", e)}>
                  Report ID
                  <div>
                    <Form.Control
                      type="text"
                      placeholder="Filter"
                      value={reportIdFilter}
                      onChange={(e) => setReportIdFilter(e.target.value)}
                    />
                  </div>
                </th>
                <th onClick={(e) => handleSort("uid", e)}>
                  User ID
                  <div>
                    <Form.Control
                      type="text"
                      placeholder="Filter"
                      value={userIdFilter}
                      onChange={(e) => setUserIdFilter(e.target.value)}
                    />
                  </div>
                </th>
                <th
                  onClick={(e) => {
                    if (e.currentTarget === e.target) {
                      handleSort("datetime", e);
                    }
                  }}
                >
                  Date
                  <div>
                    <DatePicker
                      selected={startDateFilter}
                      onChange={(date) => setStartDateFilter(date)}
                      selectsStart
                      startDate={startDateFilter}
                      endDate={endDateFilter}
                      dateFormat="yyyy-MM-dd"
                      placeholderText="Start Date"
                      onClick={(e) => e.stopPropagation()}
                    />
                    <DatePicker
                      selected={endDateFilter}
                      onChange={(date) => setEndDateFilter(date)}
                      selectsEnd
                      startDate={startDateFilter}
                      endDate={endDateFilter}
                      dateFormat="yyyy-MM-dd"
                      placeholderText="End Date"
                      onClick={(e) => e.stopPropagation()}
                    />
                  </div>
                </th>
                <th onClick={(e) => handleSort("reptype", e)}>
                  Type
                  <div>
                    <Form.Control
                      type="text"
                      placeholder="Filter"
                      value={typeFilter}
                      onChange={(e) => setTypeFilter(e.target.value)}
                    />
                  </div>
                </th>
                <th onClick={(e) => handleSort("det", e)}>
                  Details
                  <div>
                    <Form.Control
                      type="text"
                      placeholder="Filter"
                      value={detailsFilter}
                      onChange={(e) => setDetailsFilter(e.target.value)}
                    />
                  </div>
                </th>
                <th onClick={(e) => handleSort("status", e)}>
                  <div>
                    Status
                    <Form.Control
                      as="select"
                      value={statusFilter}
                      onChange={(e) => setStatusFilter(e.target.value)}
                    >
                      <option value="">All</option>
                      <option value="Fixed">Fixed</option>
                      <option value="NotFixed">Not Fixed</option>
                    </Form.Control>
                  </div>
                </th>
              </tr>
            </thead>
            <tbody style={{ backgroundColor: "black" }}>
              {reportsTable.map((item, index) => (
                <tr key={index}>
                  <td>
                    <OverlayTrigger
                      placement="top"
                      overlay={renderTooltip(`Report ID: ${item._id}`)}
                    >
                      <div>{item._id}</div>
                    </OverlayTrigger>
                  </td>
                  <td>
                    <OverlayTrigger
                      placement="top"
                      overlay={renderTooltip(`User ID: ${item.uid}`)}
                    >
                      <div>{item.uid}</div>
                    </OverlayTrigger>
                  </td>
                  <td>
                    <OverlayTrigger
                      placement="top"
                      overlay={renderTooltip(`Date: ${item.datetime}`)}
                    >
                      <div>{item.datetime}</div>
                    </OverlayTrigger>
                  </td>
                  <td>
                    <OverlayTrigger
                      placement="top"
                      overlay={renderTooltip(`Type: ${item.reptype}`)}
                    >
                      <div>{item.reptype}</div>
                    </OverlayTrigger>
                  </td>
                  <td>
                    <OverlayTrigger
                      placement="top"
                      overlay={renderTooltip(`Details: ${item.det}`)}
                    >
                      <div>{item.det}</div>
                    </OverlayTrigger>
                  </td>
                  <td>
                    <OverlayTrigger
                      placement="top"
                      overlay={renderTooltip(
                        `Status: ${
                          item.status === false ? "Not Fixed" : "Fixed"
                        }`
                      )}
                    >
                      <div
                        className={`status-shape ${
                          item.status === false ? "red" : "green"
                        }`}
                      >
                        {item.status === false ? "Not Fixed" : "Fixed"}
                      </div>
                    </OverlayTrigger>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        )}
      </div>
    </div>
  );
};

export default ReportsTable;
