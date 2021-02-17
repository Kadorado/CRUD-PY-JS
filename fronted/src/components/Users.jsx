import React, { useState, useEffect, useRef } from "react";
const API = process.env.REACT_APP_API;

export default function Users() {
  const [name, setName] = useState("");
  const [email, setemail] = useState("");
  const [password, setPassword] = useState("");

  const [users, setUsers] = useState([]);

  const [edit, setEdit] = useState(false);
  const [id, setid] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!edit) {
      const response = await fetch(`${API}/users`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name,
          email: email,
          password: password,
        }),
      });

      const data = await response.json();
    } else {
      const response = await fetch(`${API}/users/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          password,
        }),
      });
      const data = await response.json();
      console.log(data);
      setid("");
      setEdit(false);
    }

    await getUsers();

    setName("");
    setemail("");
    setPassword("");
  };

  const getUsers = async () => {
    const response = await fetch(`${API}/users`);
    const data = await response.json();
    setUsers(data);
    };

  useEffect(() => {
    getUsers();
  }, []);

  const deleteUser = async (idx) => {
    const userconfirm = window.confirm(
      "Are you sure you want to delete user ??"
    );
    if (userconfirm == true) {
      const response = await fetch(`${API}/users/${idx}`, {
        method: "DELETE",
      });

      const data = await response.json();

      await getUsers();
    }
  };

  const editUser = async (idx) => {
    const response = await fetch(`${API}/user/${idx}`);
    const data = await response.json();

    setName(data.name);
    setemail(data.email);
    setPassword(data.password);
    setEdit(true);
    setid(data._id);
  };

  return (
    <div className="row">
      <div className="col-md-4">
        <form onSubmit={handleSubmit} className="card card-body">
          <div className="form-group">
            <input
              type="text"
              onChange={(e) => setName(e.target.value)}
              value={name}
              className="form-control"
              placeholder="Name"
              autoFocus
            />
          </div>

          <div className="form-group">
            <input
              type="email"
              onChange={(e) => setemail(e.target.value)}
              value={email}
              className="form-control"
              placeholder="email"
            />
          </div>

          <div className="form-group">
            <input
              type="password"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              className="form-control"
              placeholder="Password"
            />
          </div>
          <button className="btn btn-primary btn-block">{ edit ? 'Update':'Create' }</button>
        </form>
      </div>

      <div className="col-md-6">
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Password</th>
              <th>Operations</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id}>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.password}</td>
                <td>
                  <button
                    onClick={() => editUser(user._id)}
                    className="btn btn-secondary btn-sm btn-block"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => deleteUser(user._id)}
                    className="btn btn-danger btn-sm btn-block"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
