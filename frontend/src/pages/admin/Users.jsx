import React from "react";

import "./Users.css";

function Users() {

  const users = [

    {
      name: "Akheedha Jan",
      email: "akheedha@gmail.com",
      status: "Active"
    },

    {
      name: "John Doe",
      email: "john@gmail.com",
      status: "Blocked"
    },

    {
      name: "Emma Watson",
      email: "emma@gmail.com",
      status: "Active"
    },

    {
      name: "Chris Evans",
      email: "chris@gmail.com",
      status: "Active"
    }

  ];

  return (

    <div className="users-page">

      {/* HEADER */}

      <div className="users-header">

        <h1>
          User Management
        </h1>

      </div>

      {/* SEARCH */}

      <div className="users-search">

        <input
          type="text"
          placeholder="Search users..."
        />

      </div>

      {/* TABLE */}

      <div className="users-table-wrapper">

        <table className="users-table">

          <thead>

            <tr>

              <th>Name</th>

              <th>Email</th>

              <th>Status</th>

              <th>Action</th>

            </tr>

          </thead>

          <tbody>

            {
              users.map((user, index) => (

                <tr key={index}>

                  <td>{user.name}</td>

                  <td>{user.email}</td>

                  <td>

                    <span
                      className={
                        user.status === "Active"
                        ? "status-active"
                        : "status-blocked"
                      }
                    >
                      {user.status}
                    </span>

                  </td>

                  <td>

                    {
                      user.status === "Active"
                      ? (

                        <button className="block-btn">
                          Block
                        </button>

                      ) : (

                        <button className="unblock-btn">
                          Unblock
                        </button>

                      )
                    }

                  </td>

                </tr>

              ))
            }

          </tbody>

        </table>

      </div>

    </div>

  );

}

export default Users;