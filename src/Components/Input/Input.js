import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import Table from "../Table/Table";
import TableRow from "../TableRow/TableRow";

const Input = () => {
  // state is data, setData is the function to manipulate this instance of state
  const [users, setUsers] = useState();
  // state is name, filterName is function to manipulate this instance of state
  const [name, filterName] = useState();

  let row = [];
  // axios request for determined array of random users
  const getRequest = function () {
    const url = "https://randomuser.me/api/?";
    const params =
      "results=15&seed=82c387f923255b2c&exc=gender,registered&nat=us";
    const fullUrl = url + params;
    axios
      .get(fullUrl)
      .then((res) => {
        setUsers(res.data.results);
      })
      .catch((error) => console.log(error));
  };

  // algo to compare array
  const compare = function (a, b) {
    const n1 = a.name.last.toUpperCase();
    const n2 = b.name.last.toUpperCase();

    let comparison = 0;

    if (n1 > n2) {
      comparison = 1;
    } else if (n1 < n2) {
      comparison = -1;
    }
    return comparison;
  };

  const getLast = async function () {
    try {
      const ordered = await users.sort(compare);
      ordered.forEach((element) => {
        row.push(element);
      });

      setUsers(row);
    } catch (error) {
      console.log(error);
    }
  };

  // run this function when component exists in the DOM
  useEffect(() => {
    getRequest();
  }, []);

  // use state function to override state every time user types in input form
  const setEmployee = function (e) {
    e.preventDefault();
    filterName({ [e.target.name]: e.target.value });
  };

  const searchUser = async function (e) {
    e.preventDefault();
    try {
      const search = await users.filter(
        (user) => user.name.first.toLowerCase() === name.name.toLowerCase()
      );
      const employee = await search[0];

      const searchEmployee = await employee.name.first.toLowerCase();
      const findName = await name.name.toLowerCase();

      if (searchEmployee === findName) {
        row.push(employee);
        setUsers(row);
      } else alert("There aren't any employees by that name.");
    } catch (error) {
      alert("There is not employee by that first name.");
    }
  };

  // inline styling for buttons
  const buttons = {
    display: "flex",
    justifyContent: "space-evenly",
  };

  return (
    <div className="container">
      <form className="row m-2">
        <div className="col">
          <input
            // as the user types in the input, run employee()
            onChange={(e) => setEmployee(e)}
            type="submit"
            type="text"
            name="name"
            className="form-control"
            placeholder="Employee Name"
          ></input>
        </div>
        <div className="col-auto">
          <button onClick={(e) => searchUser(e)} className="btn btn-dark mb-3">
            Search
          </button>
        </div>
      </form>
      <div style={buttons}>
        <h4>Filter:</h4>
        {/* return all employees in state(data) */}
        <button
          onClick={() => getRequest()}
          name="all"
          className="btn btn-dark mb-3"
        >
          All Employees
        </button>
        {/* return all employees in state(data) according to their country */}
        <button
          onClick={() => getLast()}
          name="last"
          className="btn btn-dark mb-3"
        >
          Last Name
        </button>
      </div>
      <Table>
        {users !== undefined ? (
          users.map((user, index) => (
            <TableRow
              key={index}
              image={user.picture.thumbnail}
              phone={user.phone}
              first={user.name.first}
              last={user.name.last}
              email={user.email}
              address={`${user.location.street.number} ${user.location.street.name} ${user.location.city}, ${user.location.country} ${user.location.postcode}`}
              username={user.login.username}
              dob={user.dob.date}
            />
          ))
        ) : (
          <></>
        )}
      </Table>
    </div>
  );
};

export default Input;
