import React, { useState, useEffect, useCallback } from "react";
import { Table, Tooltip, OverlayTrigger, Spinner, Form } from "react-bootstrap";
import "./dailyintaketable.css";
import ItemsPagination from "./pagination";
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const MealViewerTable = () => {
  const [mealsTable, setMealsTable] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [sortField, setSortField] = useState(null);
  const [sortDirection, setSortDirection] = useState(1);
  const [mealIdFilter, setMealIdFilter] = useState("");
  const [caloriesMinFilter, setCaloriesMinFilter] = useState("");
  const [caloriesMaxFilter, setCaloriesMaxFilter] = useState("");
  const [fatsMinFilter, setFatsMinFilter] = useState("");
  const [fatsMaxFilter, setFatsMaxFilter] = useState("");
  const [carbsMinFilter, setCarbsMinFilter] = useState("");
  const [carbsMaxFilter, setCarbsMaxFilter] = useState("");
  const [proteinMinFilter, setProteinMinFilter] = useState("");
  const [proteinMaxFilter, setProteinMaxFilter] = useState("");
  const [foodWasteMinFilter, setFoodWasteMinFilter] = useState("");
  const [foodWasteMaxFilter, setFoodWasteMaxFilter] = useState("");
  const [descriptionFilter, setDescriptionFilter] = useState("");
  const [startDateFilter, setStartDateFilter] = useState(null);
  const [endDateFilter, setEndDateFilter] = useState(null);

  const fetchData = useCallback(
    (page, limit) => {
      const filters = [];

      if (mealIdFilter) {
        filters.push(`_id[lte]=${mealIdFilter}`);
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

      if (caloriesMinFilter) {
        filters.push(`cal[gte]=${caloriesMinFilter}`);
      }

      if (caloriesMaxFilter) {
        filters.push(`cal[lte]=${caloriesMaxFilter}`);
      }

      if (fatsMinFilter) {
        filters.push(`fat[gte]=${fatsMinFilter}`);
      }

      if (fatsMaxFilter) {
        filters.push(`fat[lte]=${fatsMaxFilter}`);
      }

      if (carbsMinFilter) {
        filters.push(`carbs[gte]=${carbsMinFilter}`);
      }

      if (carbsMaxFilter) {
        filters.push(`carbs[lte]=${carbsMaxFilter}`);
      }

      if (proteinMinFilter) {
        filters.push(`proteins[gte]=${proteinMinFilter}`);
      }

      if (proteinMaxFilter) {
        filters.push(`proteins[lte]=${proteinMaxFilter}`);
      }

      if (foodWasteMinFilter) {
        filters.push(`waste[gte]=${foodWasteMinFilter}`);
      }

      if (foodWasteMaxFilter) {
        filters.push(`waste[lte]=${foodWasteMaxFilter}`);
      }

      if (descriptionFilter) {
        filters.push(`mealdesc[lte]=${descriptionFilter}`);
      }

      const filtersParam = filters.length > 0 ? filters.join("&") : "";

      const sortParam = sortField
        ? `sort=${sortDirection === 1 ? sortField : `-${sortField}`}`
        : "";

      const queryParams = [sortParam, filtersParam].filter(Boolean).join("&");

      setLoading(true);

      axios
        .get(
          `http://localhost:3000/dashboard/meals/${page}/${limit}?${queryParams}`
        )
        .then((response) => {
          console.log(response.data);
          setMealsTable(response.data.docs);
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
      mealIdFilter,
      caloriesMinFilter,
      caloriesMaxFilter,
      fatsMinFilter,
      fatsMaxFilter,
      carbsMinFilter,
      carbsMaxFilter,
      proteinMinFilter,
      proteinMaxFilter,
      foodWasteMinFilter,
      foodWasteMaxFilter,
      descriptionFilter,
      startDateFilter,
      endDateFilter,
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
                <th onClick={(e) => handleSort("_id", e)}>
                  <div>
                    Meal ID
                    <Form.Control
                      placeholder="Filter"
                      value={mealIdFilter}
                      onChange={(e) => setMealIdFilter(e.target.value)}
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
                      dateFormat="yyyy-MM-dd"
                      onChange={(date) => setStartDateFilter(date)}
                      selectsStart
                      startDate={startDateFilter}
                      endDate={endDateFilter}
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
                <th onClick={(e) => handleSort("cal", e)}>
                  <div>
                    Calories
                    <Form.Control
                      type="number"
                      placeholder="Min"
                      value={caloriesMinFilter}
                      onChange={(e) => setCaloriesMinFilter(e.target.value)}
                    />
                    <Form.Control
                      type="number"
                      placeholder="Max"
                      value={caloriesMaxFilter}
                      onChange={(e) => setCaloriesMaxFilter(e.target.value)}
                    />
                  </div>
                </th>
                <th onClick={(e) => handleSort("fats", e)}>
                  <div>
                    Fats
                    <Form.Control
                      type="number"
                      placeholder="Min"
                      value={fatsMinFilter}
                      onChange={(e) => setFatsMinFilter(e.target.value)}
                    />
                    <Form.Control
                      type="number"
                      placeholder="Max"
                      value={fatsMaxFilter}
                      onChange={(e) => setFatsMaxFilter(e.target.value)}
                    />
                  </div>
                </th>
                <th onClick={(e) => handleSort("carbs", e)}>
                  <div>
                    Carbohydrates
                    <Form.Control
                      type="number"
                      placeholder="Min"
                      value={carbsMinFilter}
                      onChange={(e) => setCarbsMinFilter(e.target.value)}
                    />
                    <Form.Control
                      type="number"
                      placeholder="Max"
                      value={carbsMaxFilter}
                      onChange={(e) => setCarbsMaxFilter(e.target.value)}
                    />
                  </div>
                </th>
                <th onClick={(e) => handleSort("proteins", e)}>
                  <div>
                    Protein
                    <Form.Control
                      type="number"
                      placeholder="Min"
                      value={proteinMinFilter}
                      onChange={(e) => setProteinMinFilter(e.target.value)}
                    />
                    <Form.Control
                      type="number"
                      placeholder="Max"
                      value={proteinMaxFilter}
                      onChange={(e) => setProteinMaxFilter(e.target.value)}
                    />
                  </div>
                </th>
                <th onClick={(e) => handleSort("waste", e)}>
                  <div>
                    Food Waste
                    <Form.Control
                      type="number"
                      placeholder="Min"
                      value={foodWasteMinFilter}
                      onChange={(e) => setFoodWasteMinFilter(e.target.value)}
                    />
                    <Form.Control
                      type="number"
                      placeholder="Max"
                      value={foodWasteMaxFilter}
                      onChange={(e) => setFoodWasteMaxFilter(e.target.value)}
                    />
                  </div>
                </th>
                <th>Food Groups</th>
                <th onClick={(e) => handleSort("mealdesc", e)}>
                  <div>
                    Description
                    <Form.Control
                      type="text"
                      placeholder="Filter"
                      value={descriptionFilter}
                      onChange={(e) => setDescriptionFilter(e.target.value)}
                    />
                  </div>
                </th>
              </tr>
            </thead>
            <tbody style={{ backgroundColor: "black" }}>
              {mealsTable.map((item, index) => (
                <tr key={index}>
                  <td>
                    <OverlayTrigger
                      placement="top"
                      overlay={renderTooltip(`Meal ID: ${item._id}`)}
                    >
                      <div>{item._id}</div>
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
                      overlay={renderTooltip(`Calories: ${item.cal}`)}
                    >
                      <div>{item.cal}</div>
                    </OverlayTrigger>
                  </td>
                  <td>
                    <OverlayTrigger
                      placement="top"
                      overlay={renderTooltip(`Fats: ${item.fat}`)}
                    >
                      <div>{item.fat}</div>
                    </OverlayTrigger>
                  </td>
                  <td>
                    <OverlayTrigger
                      placement="top"
                      overlay={renderTooltip(`Carbohydrates: ${item.carbs}`)}
                    >
                      <div>{item.carbs}</div>
                    </OverlayTrigger>
                  </td>
                  <td>
                    <OverlayTrigger
                      placement="top"
                      overlay={renderTooltip(`Protein: ${item.proteins}`)}
                    >
                      <div>{item.proteins}</div>
                    </OverlayTrigger>
                  </td>
                  <td>
                    <OverlayTrigger
                      placement="top"
                      overlay={renderTooltip(`Food Waste: ${item.waste}`)}
                    >
                      <div>{item.waste}</div>
                    </OverlayTrigger>
                  </td>
                  <td>
                    <OverlayTrigger
                      placement="top"
                      overlay={renderTooltip(
                        `Food Group: ${item.foodgroups.join(", ")}`
                      )}
                    >
                      <div>{item.foodgroups.join(", ")}</div>
                    </OverlayTrigger>
                  </td>
                  <td>
                    <OverlayTrigger
                      placement="top"
                      overlay={renderTooltip(`Description: ${item.mealdesc}`)}
                    >
                      <div>{item.mealdesc}</div>
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

export default MealViewerTable;
