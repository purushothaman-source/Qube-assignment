import React from "react";
import styled from "styled-components";
import Pagination from "react-js-pagination";
import { Button } from "reactstrap";
import search from "../assets/search.svg";
import filter from "../assets/filter.svg";

const StyledToolbar = styled.div`
  min-height: 64px;
  padding: 1rem;
  display: flex;
  align-items: center;
  font-size: 0.75rem;

  .input-wrapper {
    padding: 6px;
    border-radius: 4px;
    border: 1px solid #d9d2d2;
    input {
      border: none;
      outline: none;
    }
  }

  & > * {
    flex: 1;
  }

  .right-col {
    display: flex;
    justify-content: flex-end;
  }
`;

const options = Array.from({ length: 10 }, (_, i) => i + 1);

const FilterToolbar = ({
  searchText = "",
  activePage = 1,
  itemsPerPage = 10,
  totolCount = 0,
  setSearchText = () => {},
  handlePageChange = () => {},
  changeItemsPerPage = () => {},
}) => {
  return (
    <StyledToolbar>
      <div className="left-col d-flex">
        <div className="input-wrapper me-2">
          <label>
            <input
              placeholder="Search"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
            />
            <img src={search} alt="search icon" />
          </label>
        </div>
        <Button color="light">
          <img src={filter} alt="filter icon" className="me-1" />
          Filter
        </Button>
      </div>
      <div className="right-col d-flex align-items-stretch gap-2">
        <span style={{ alignSelf: "center" }}>Show</span>
        <select onChange={changeItemsPerPage} value={itemsPerPage}>
          {options.map((option) => (
            <option key={option} value={option} selected={itemsPerPage}>
              {option}
            </option>
          ))}
        </select>
        <Pagination
          activePage={activePage}
          itemsCountPerPage={itemsPerPage}
          totalItemsCount={totolCount}
          onChange={(e) => {
            handlePageChange(e);
          }}
          itemClass="page-item"
          linkClass="page-link"
          linkClassFirst="d-none"
          linkClassLast="d-none"
          // nextPageText={<span className="fw-800  text-dark">{`>`}</span>}
          // prevPageText={<span className="fw-800  text-dark">{`<`}</span>}
          // firstPageText={<div className="d-none"></div>}
          // lastPageText={<div className="d-none"></div>}
        />
      </div>
    </StyledToolbar>
  );
};

export default FilterToolbar;
