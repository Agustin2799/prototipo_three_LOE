import React, { useState } from "react";

const Dropdown = ({ options, position, visible }) => {
  if (!visible) return null;

  const style = {
    position: "absolute",
    top: `${position[0]}px`,
    left: `${position[1]}px`,
    color: "blue",
    backgroundColor: "white",
    border: "1px solid #ccc",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    zIndex: 1000,
  };

  return (
    <div style={style}>
      <ul style={{ listStyleType: "none", margin: 0, padding: 0 }}>
        {options.map((option, index) => (
          <li key={index} style={{ padding: "8px", cursor: "pointer" }}>
            {option}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Dropdown;
