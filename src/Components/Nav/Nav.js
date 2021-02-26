import React from "react";

const Nav = () => {
  const nav = {
    backgroundColor: "rgb(0, 77, 77)",
    color: "rgb(255, 255, 255)",
  };
  return (
    <>
      <nav className="navbar" style={nav}>
        <div className="container-fluid" style={{ justifyContent: "center" }}>
          <i
            className="bi bi-person-lines-fill"
            style={{ fontSize: "2rem" }}
          ></i>

          <h6 style={{ marginLeft: "10px" }} className="navbar-brand mb-0 h1">
            Employee Directory
          </h6>
        </div>
      </nav>
    </>
  );
};

export default Nav;
