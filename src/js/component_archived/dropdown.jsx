import React, { useState, useContext } from "react";
import { Context } from "../store/appContext";



const Dropdown = ({ options, position, visible }) => {
  const { store, actions } = useContext(Context)

  //Si el drop no es visble, entonces no devolvemos nada
  if (!visible) return null;

  const style = {
    position: "absolute",
    top: `${position[1]}px`,
    left: `${position[0]}px`,
    color: "blue",
    backgroundColor: "white",
    border: "1px solid #ccc",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    zIndex: 1000,
  };
  //Asigna las acciones a cada li en función del option
  const action = (action, e) => {
    e.stopPropagation()
    actions.dropdownFunctions(action)
  }

  return (
    <div style={style}>
      <ul style={{ listStyleType: "none", margin: 0, padding: 0 }}>
        {options.map((option, index) => (
          <li key={index} style={{ padding: "8px", cursor: "pointer" }} onClick={(e)=> action(option, e)}>
            {option}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Dropdown;
