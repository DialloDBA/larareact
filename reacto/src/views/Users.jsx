import React, { useEffect, useState } from "react";
import axiosClient from "../AxiosClient.js";
import { Link } from "react-router-dom";
import { useStateContext } from "../contexts/ContextProvider.jsx";

function Users() {
  const [users, setUsers] = useState([]);
  const {setNotification} = useStateContext()
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getUsers();
  }, []);
  const getUsers = () => {
    setLoading(true);
    axiosClient
      .get("/users")
      .then(({ data }) => {
        setLoading(true);
        setUsers(data.data);
        console.log(data.data);
      })
      .catch(() => {
        setLoading(false);
      });
  };
  const deleteUserById = (id)=>{
    if(!window.confirm("êtes-vous sur de vouloir supprimer cet User ?")){
      return
    }
    setLoading(false)
    axiosClient.delete(`/users/${id}`)
    .then(()=>{
      //TODO show notification
      setNotification('User was deleted successfuly !');
      getUsers();
    })
    console.log(id)
  }

  const btn = {
    backgroundColor: "blueviolet",
    padding: "5px",
    color: "white",
    textDecoration: "none",
    borderRadius: "3",
  };
  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <h1>Users</h1>
        <Link to="/users/create" className="btn-add">
          Create a new User
        </Link>
      </div>
      <div className="card animated fadeInDown">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>email</th>
              <th>Create Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            { !loading && <tr>
              <td colSpan={5} className="text-center" style={{color:"green"}}>
                En cours de Chargement...
              </td>
            </tr>}
          </tbody>
          <tbody>
            {users.map((u) => {
              return (
                <tr key={u.id}>
                  <td>{u.id}</td>
                  <td>{u.name}</td>
                  <td>{u.email}</td>
                  <td>{u.created_at}</td>
                  <td >
                    <Link style={{marginRight : 2}} to={`/users/${u.id}/edit`} className="btn-edit">Edit</Link>
                    <button style={{marginLeft : 2}} onClick={e=>deleteUserById(u.id)} className="btn-delete">Delete</button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Users;
