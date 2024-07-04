import React from "react";
import styled from "styled-components";

const StyledLoader = styled.div`
  width: 40px;
  height: 40px;
  color: #f03355;
  background: conic-gradient(
      from -45deg at top 20px left 50%,
      #0000,
      currentColor 1deg 90deg,
      #0000 91deg
    ),
    conic-gradient(
      from 45deg at right 20px top 50%,
      #0000,
      currentColor 1deg 90deg,
      #0000 91deg
    ),
    conic-gradient(
      from 135deg at bottom 20px left 50%,
      #0000,
      currentColor 1deg 90deg,
      #0000 91deg
    ),
    conic-gradient(
      from -135deg at left 20px top 50%,
      #0000,
      currentColor 1deg 90deg,
      #0000 91deg
    );
  animation: l4 1.5s infinite cubic-bezier(0.3, 1, 0, 1);

  @keyframes l4 {
    50% {
      width: 60px;
      height: 60px;
      transform: rotate(180deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;

const Loader = ({ fullPage = false }) => {
  return fullPage ? (
    <div
      className="d-flex justify-content-center align-items-center"
      style={{
        zIndex: 1,
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: "whitesmoke",
      }}
    >
      <StyledLoader />
    </div>
  ) : (
    <StyledLoader />
  );
};

export default Loader;
