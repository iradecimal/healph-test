import React from "react";
import { Pagination } from "react-bootstrap";
import "./pagination.css";

const ItemsPagination = ({ currentPage, totalPages, onPageChange }) => {
  const handleClick = (pageNum) => {
    onPageChange(pageNum);
  };

  return (
    <div style={{ display: "flex", justifyContent: "flex-end" }}>
      <div style={{ paddingTop: "6px", paddingRight: "10px" }}>
        Page {currentPage} - {totalPages}
      </div>
      <Pagination className="pagination">
        <Pagination.First onClick={() => handleClick(1)} />
        <Pagination.Prev
          onClick={() => handleClick(currentPage - 1)}
          disabled={currentPage === 1}
        />
        <Pagination.Next
          onClick={() => handleClick(currentPage + 1)}
          disabled={currentPage === totalPages}
        />
        <Pagination.Last onClick={() => handleClick(totalPages)} />
      </Pagination>
    </div>
  );
};

export default ItemsPagination;
