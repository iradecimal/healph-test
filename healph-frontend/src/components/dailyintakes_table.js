import React, { useState, useEffect, useCallback } from "react";
import { Table, OverlayTrigger, Tooltip, Form, Spinner } from "react-bootstrap";
import ItemsPagination from "./pagination";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";

const DailyIntakeTable = () => {
  const [intakesTable, setIntakesTable] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [sortField, setSortField] = useState(null);
  const [sortDirection, setSortDirection] = useState(1);

  // Filter state variables
  const [uidFilter, setUidFilter] = useState("");
  const [startDateFilter, setStartDateFilter] = useState(null);
  const [endDateFilter, setEndDateFilter] = useState(null);
  const [sleephrsMinFilter, setSleephrsMinFilter] = useState("");
  const [sleephrsMaxFilter, setSleephrsMaxFilter] = useState("");
  const [waterglassMinFilter, setWaterglassMinFilter] = useState("");
  const [waterglassMaxFilter, setWaterglassMaxFilter] = useState("");
  const [stepsMinFilter, setStepsMinFilter] = useState("");
  const [stepsMaxFilter, setStepsMaxFilter] = useState("");
  const [dailycalMinFilter, setDailycalMinFilter] = useState("");
  const [dailycalMaxFilter, setDailycalMaxFilter] = useState("");
  const [haleMinFilter, setHaleMinFilter] = useState("");
  const [haleMaxFilter, setHaleMaxFilter] = useState("");
  const [phdMinFilter, setPhdMinFilter] = useState("");
  const [phdMaxFilter, setPhdMaxFilter] = useState("");

  const fetchData = useCallback(
    (page, limit) => {
      const sortParam = sortField
        ? `sort=${sortDirection === 1 ? sortField : `-${sortField}`}`
        : "";

      const filters = [];

      if (uidFilter) {
        filters.push(`uid[lte]=${uidFilter}`);
      }

      if (startDateFilter) {
        filters.push(
          `date[gte]=${startDateFilter.toLocaleDateString("en-CA")}`
        );
      }

      if (endDateFilter) {
        filters.push(`date[lte]=${endDateFilter.toLocaleDateString("en-CA")}`);
      }

      if (sleephrsMinFilter) {
        filters.push(`sleephrs[gte]=${sleephrsMinFilter}`);
      }
      if (sleephrsMaxFilter) {
        filters.push(`sleephrs[lte]=${sleephrsMaxFilter}`);
      }

      if (waterglassMinFilter) {
        filters.push(`waterglass[gte]=${waterglassMinFilter}`);
      }
      if (waterglassMaxFilter) {
        filters.push(`waterglass[lte]=${waterglassMaxFilter}`);
      }

      if (stepsMinFilter) {
        filters.push(`steps[gte]=${stepsMinFilter}`);
      }
      if (stepsMaxFilter) {
        filters.push(`steps[lte]=${stepsMaxFilter}`);
      }

      if (dailycalMinFilter) {
        filters.push(`dailycal[gte]=${dailycalMinFilter}`);
      }
      if (dailycalMaxFilter) {
        filters.push(`dailycal[lte]=${dailycalMaxFilter}`);
      }

      if (haleMinFilter) {
        filters.push(`hale[gte]=${haleMinFilter}`);
      }
      if (haleMaxFilter) {
        filters.push(`hale[lte]=${haleMaxFilter}`);
      }

      if (phdMinFilter) {
        filters.push(`phd[gte]=${phdMinFilter}`);
      }
      if (phdMaxFilter) {
        filters.push(`phd[lte]=${phdMaxFilter}`);
      }

      const filtersParam = filters.length > 0 ? filters.join("&") : "";

      axios
        .get(
          `http://localhost:3000/dashboard/intakes/${page}/${limit}?${sortParam}&${filtersParam}`
        )
        .then((response) => {
          setIntakesTable(response.data.docs);
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
      sortField,
      sortDirection,
      uidFilter,
      startDateFilter,
      endDateFilter,
      sleephrsMinFilter,
      sleephrsMaxFilter,
      waterglassMinFilter,
      waterglassMaxFilter,
      stepsMinFilter,
      stepsMaxFilter,
      dailycalMinFilter,
      dailycalMaxFilter,
      haleMinFilter,
      haleMaxFilter,
      phdMinFilter,
      phdMaxFilter,
    ]
  );

  useEffect(() => {
    const page = 1;
    const limit = 20;

    fetchData(page, limit);
  }, [
    sortField,
    sortDirection,
    uidFilter,
    startDateFilter,
    endDateFilter,
    sleephrsMinFilter,
    sleephrsMaxFilter,
    waterglassMinFilter,
    waterglassMaxFilter,
    stepsMinFilter,
    stepsMaxFilter,
    dailycalMinFilter,
    dailycalMaxFilter,
    haleMinFilter,
    haleMaxFilter,
    phdMinFilter,
    phdMaxFilter,
    fetchData,
  ]);

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
      <ItemsPagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />

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
                <th onClick={(e) => handleSort("uid", e)}>
                  User ID
                  <div>
                    <Form.Control
                      placeholder="Filter"
                      value={uidFilter}
                      onChange={(e) => setUidFilter(e.target.value)}
                    />
                  </div>
                </th>
                <th
                  onClick={(e) => {
                    if (e.currentTarget === e.target) {
                      handleSort("date", e);
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
                <th onClick={(e) => handleSort("sleephrs", e)}>
                  Hours of Sleep
                  <div>
                    <Form.Control
                      placeholder="Min"
                      value={sleephrsMinFilter}
                      onChange={(e) => setSleephrsMinFilter(e.target.value)}
                    />
                    <Form.Control
                      placeholder="Max"
                      value={sleephrsMaxFilter}
                      onChange={(e) => setSleephrsMaxFilter(e.target.value)}
                    />
                  </div>
                </th>
                <th onClick={(e) => handleSort("waterglass", e)}>
                  Glasses of Water
                  <div>
                    <Form.Control
                      placeholder="Min"
                      value={waterglassMinFilter}
                      onChange={(e) => setWaterglassMinFilter(e.target.value)}
                    />
                    <Form.Control
                      placeholder="Max"
                      value={waterglassMaxFilter}
                      onChange={(e) => setWaterglassMaxFilter(e.target.value)}
                    />
                  </div>
                </th>
                <th onClick={(e) => handleSort("steps", e)}>
                  Steps Taken
                  <div>
                    <Form.Control
                      placeholder="Min"
                      value={stepsMinFilter}
                      onChange={(e) => setStepsMinFilter(e.target.value)}
                    />
                    <Form.Control
                      placeholder="Max"
                      value={stepsMaxFilter}
                      onChange={(e) => setStepsMaxFilter(e.target.value)}
                    />
                  </div>
                </th>
                <th onClick={(e) => handleSort("dailycal", e)}>
                  Caloric Intake
                  <div>
                    <Form.Control
                      placeholder="Min"
                      value={dailycalMinFilter}
                      onChange={(e) => setDailycalMinFilter(e.target.value)}
                    />
                    <Form.Control
                      placeholder="Max"
                      value={dailycalMaxFilter}
                      onChange={(e) => setDailycalMaxFilter(e.target.value)}
                    />
                  </div>
                </th>
                <th onClick={(e) => handleSort("hale", e)}>
                  hale
                  <div>
                    <Form.Control
                      placeholder="Min"
                      value={haleMinFilter}
                      onChange={(e) => setHaleMinFilter(e.target.value)}
                    />
                    <Form.Control
                      placeholder="Max"
                      value={haleMaxFilter}
                      onChange={(e) => setHaleMaxFilter(e.target.value)}
                    />
                  </div>
                </th>
                <th onClick={(e) => handleSort("phd", e)}>
                  phd
                  <div>
                    <Form.Control
                      placeholder="Min"
                      value={phdMinFilter}
                      onChange={(e) => setPhdMinFilter(e.target.value)}
                    />
                    <Form.Control
                      placeholder="Max"
                      value={phdMaxFilter}
                      onChange={(e) => setPhdMaxFilter(e.target.value)}
                    />
                  </div>
                </th>
              </tr>
            </thead>
            <tbody style={{ backgroundColor: "black" }}>
              {intakesTable.map((item, index) => (
                <tr key={index}>
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
                      overlay={renderTooltip(`Date: ${item.date}`)}
                    >
                      <div>{item.date}</div>
                    </OverlayTrigger>
                  </td>
                  <td>
                    <OverlayTrigger
                      placement="top"
                      overlay={renderTooltip(
                        `Hours of sleep: ${item.sleephrs}`
                      )}
                    >
                      <div>{item.sleephrs}</div>
                    </OverlayTrigger>
                  </td>
                  <td>
                    <OverlayTrigger
                      placement="top"
                      overlay={renderTooltip(
                        `Glasses of water: ${item.waterglass}`
                      )}
                    >
                      <div>{item.waterglass}</div>
                    </OverlayTrigger>
                  </td>
                  <td>
                    <OverlayTrigger
                      placement="top"
                      overlay={renderTooltip(`Steps taken: ${item.steps}`)}
                    >
                      <div>{item.steps}</div>
                    </OverlayTrigger>
                  </td>
                  <td>
                    <OverlayTrigger
                      placement="top"
                      overlay={renderTooltip(
                        `Caloric Intake: ${item.dailycal}`
                      )}
                    >
                      <div>{item.dailycal}</div>
                    </OverlayTrigger>
                  </td>
                  <td>
                    <OverlayTrigger
                      placement="top"
                      overlay={renderTooltip(`hale points: ${item.hale}`)}
                    >
                      <div>{item.hale}</div>
                    </OverlayTrigger>
                  </td>
                  <td>
                    <OverlayTrigger
                      placement="top"
                      overlay={renderTooltip(`phd points: ${item.phd}`)}
                    >
                      <div>{item.phd}</div>
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

export default DailyIntakeTable;
