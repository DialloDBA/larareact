import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axiosClient from "../AxiosClient";
import { useStateContext } from "../contexts/ContextProvider";

export default function UserForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { setNotification } = useStateContext()
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState();

  const [user, setUser] = useState({
    id: null,
    name: "",
    email: "",
    password: "",
    password_confirmation: "",
  });

  if (id) {
    useEffect(() => {
      setLoading(true);
      axiosClient
        .get(`/users/${id}`)
        .then(({ data }) => {
          setLoading(false);
          setUser(data);
        })
        .catch((err) => {
          setLoading(false);
        });
    }, []);
  }

  const CreateOrUpdate = (eve) => {
    eve.preventDefault();
    if (user.id) {
      axiosClient
        .put(`/users/${user.id}`, user)
        .then(() => {
          //TODO show notification
          setNotification('User was updated successfuly !');
          navigate("/users");
        })
        .catch((err) => {
          const response = err.response;
          if (response && response.status == 422) {
            setErrors(response.data.errors);
          }
        });
    } else {
      axiosClient.post(`/users`, user)
        .then(() => {
          //TODO show notification
          setNotification('User was created successfuly !');
          navigate("/users");
        })
        .catch((err) => {
          const response = err.response;
          if (response && response.status == 422) {
            setErrors(response.data.errors);
          }
        });
    }
  };

  return (
    <>
      {user.id && <h1>Update : {user.name}</h1>}
      {!user.id && <h1>New User</h1>}
      <div className="card animated fadeInDown">
        {loading && <div className="text-center">Loading...</div>}

        {errors && (
          <div className="alert">
            {Object.keys(errors).map((key) => (
              <p key={key}>{errors[key][0]}</p>
            ))}
          </div>
        )}

        <form onSubmit={CreateOrUpdate}>
          <input
            onChange={(ev) => setUser({ ...user, name: ev.target.value })}
            type="text"
            placeholder="Full Name"
            id="name"
            name="name"
            value={user.name}
          />
          <input
            onChange={(ev) => setUser({ ...user, email: ev.target.value })}
            type="email"
            value={user.email}
            placeholder="Email"
            id="email"
            name="name"
          />
          <input
            onChange={(ev) => setUser({ ...user, password: ev.target.value })}
            type="password"
            name="password"
            id="password"
            placeholder="Password"
          />
          <input
            onChange={(ev) =>
              setUser({ ...user, password_confirmation: ev.target.value })
            }
            type="password"
            name="password_confirmation"
            id="password_confirmation"
            placeholder="Confirm your Password"
          />
          <button type="submit" className="btn btn-block">
            {user.id ? "Update now" : "Create a new user"}
          </button>
        </form>
      </div>
    </>
  );
}
