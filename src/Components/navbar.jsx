import React, { useState } from "react";

const NavBar = ({ vertexClick, vertexSelected, edgeClick, edgeSelected }) => {
  //const [data, setData] = useState("");

  //function getData(event) {
  //  setData(event.target.value);
  //}
  function getClasses(selected) {
    let classes = "btn ";
    classes += selected ? "btn-dark" : "btn-secondary";
    classes += " btn-sm m-3";
    return classes;
  }
  return (
    <nav className="navbar navbar-light bg-light">
      <a className="navbar-brand">
        <button className={getClasses(vertexSelected)} onClick={vertexClick}>
          Box
        </button>
        <button className={getClasses(edgeSelected)} onClick={edgeClick}>
          Edge
        </button>
      </a>
    </nav>
  );
};

/*{showInput ? (
    <div>
    <input type="text" onChange={getData}></input>
    <button onClick={() => onSubmit(data)}>Submit</button>
  </div>
) : null}*/

export default NavBar;
