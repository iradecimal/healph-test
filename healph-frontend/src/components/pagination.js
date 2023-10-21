import React from "react";
import { Pagination } from "react-bootstrap";
import "./pagination.css";

const ItemsPagination = ({ currentPage, totalPages, onPageChange }) => {
  return (
    <div style={{ display: "flex", justifyContent: "flex-end" }}>
      <div style={{ paddingTop: "6px", paddingRight: "10px" }}>
        Page {currentPage} - {totalPages}
      </div>
      <Pagination
        className="pagination"
        style={{ boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)" }}
      >
        <Pagination.First
          onClick={() => onPageChange(1)}
          disabled={currentPage === 1}
        />
        <Pagination.Prev
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
        />
        <Pagination.Item>{currentPage}</Pagination.Item>
        <Pagination.Next
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        />
        <Pagination.Last
          onClick={() => onPageChange(totalPages)}
          disabled={currentPage === totalPages}
        />
      </Pagination>
    </div>
  );
};

export default ItemsPagination;
