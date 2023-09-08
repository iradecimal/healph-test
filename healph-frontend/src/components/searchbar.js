import React from "react";
import { Form, Button, InputGroup } from "react-bootstrap";
import { FaSearch } from 'react-icons/fa';
import "./searchbar.css";


const SearchBar = ({ onSearch }) => {
  return (
    <div style={{marginBottom:"40px",maxWidth:"70%",display:"flex"}}>
      <InputGroup>
        <Form.Control
          type="text"
          placeholder="Search..."
          className="search-bar"
          />
        <Button className="search-button" style={{ backgroundColor: "#9FC856" }} onClick={onSearch}>
          <FaSearch />
        </Button>
      </InputGroup>

    </div>

  );
};

export default SearchBar;