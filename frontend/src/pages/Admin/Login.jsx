import { message } from "antd";
import axios from "axios";
import React, { useState } from "react";
import { HideLoading, ShowLoading } from "../../redux/rootSlice";
import { useDispatch } from "react-redux";

const Login = () => {
  const [user, setUser] = useState({
    username: "",
    password: "",
  });

  const dispatch = useDispatch();

  const login = async () => {
    dispatch(ShowLoading());
    try {
      const response = await axios.post(
        "https://sudhaportfolio.onrender.com/api/sudhaportfolio/admin-login",
        user
      );
      dispatch(HideLoading());
      if (response.data.success) {
        message.success(response.data.message);
        localStorage.setItem("token", JSON.stringify(response.data));
        window.location.href = "/admin";
      } else {
        message.error(response.data.message);
      }
    } catch (error) {
      message.error(error.message);
      dispatch(HideLoading());
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-primary">
      <div className="w-96 flex gap-5 p-5 shadow-lg border border-gray-300 flex-col bg-white rounded-lg">
        <h1 className="text-2xl font-bold text-center mb-4">
          Portfolio - Admin Login
        </h1>
        <hr />
        <input
          type="text"
          placeholder="Enter Username"
          value={user.username}
          onChange={(e) => setUser({ ...user, username: e.target.value })}
          className="border rounded p-2 mb-2"
        />
        <input
          type="password"
          value={user.password}
          placeholder="Enter Password"
          onChange={(e) => setUser({ ...user, password: e.target.value })}
          className="border rounded p-2 mb-4"
        />
        <button
          className="border-black bg-black text-white font-semibold p-2 rounded hover:bg-gray-800 transition duration-500"
          onClick={login}
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default Login;
