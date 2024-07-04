import React from "react";
import styled from "styled-components";
import { Card } from "reactstrap";

let progress = [
  {
    text: "failed",
    count: 1,
    color: "red",
    className: "bg-danger",
  },
  {
    text: "cancelled",
    count: 1,
    color: "red",
    className: "bg-warning",
  },
  {
    text: "scheduled",
    count: 1,
    color: "red",
    className: "bg-secondary",
  },
  {
    text: "downloading",
    count: 14,
    color: "red",
    className: "bg-primary",
  },
  {
    text: "downloaded",
    count: 32,
    color: "red",
    className: "bg-success",
  },
];
const StyledHeader = styled(Card)`
  width: 100%;
  min-height: 56px;
  padding: 1rem 1.5rem;
  display: flex;
  gap: 1rem;
  border-radius: 8px 0px 0px 0px;
  font-size: 0.875rem;
  text-transform: capitalize;
`;

const Header = () => {
  return (
    <StyledHeader>
      <div className="d-flex flex-wrap gap-5">
        {progress.map((value) => {
          const { text, count, className } = value;
          return (
            <div>
              <span className={`me-2 status-circle ${className} `}></span>
              <span className="me-1">{count}</span>
              <span className="text-capitalize">
                {text?.charAt?.(0)?.toUpperCase?.() + text?.slice?.(1)}
              </span>
            </div>
          );
        })}
      </div>
    </StyledHeader>
  );
};

export default Header;
