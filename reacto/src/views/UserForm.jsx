import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axiosClient from "../AxiosClient";

export default function UserForm() {
  const { id } = useParams();
  const [loading, setLoading] = useState(false);

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

  return <>
  {user.id && <h1>Update : {user.name}</h1>}
  {!user.id && <h1>New User</h1>}
  </>;
}
