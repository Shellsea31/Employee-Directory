import React from "react";

const TableRow = (props) => {
  return (
    <tr>
      <td>
        <img src={props.image}></img>
      </td>
      <td>{props.first}</td>
      <td>{props.last}</td>
      <td>{props.email}</td>
      <td>{props.phone}</td>
      <td>{props.address}</td>
      <td>{props.username}</td>
      <td>{props.dob.split("T")[0]}</td>
    </tr>
  );
};

export default TableRow;
