import React, { useContext, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { UserContext } from "../UserContext";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { setUserInfo } = useContext(UserContext);
  const navigate = useNavigate();
  const handleRegister = (e) => {
    e.preventDefault();
    navigate("/register");
  };
  const handleLogin = async (e) => {
    e.preventDefault();
    const data = {
      username,
      password,
    };

    const res = await fetch("https://blog-main-one.vercel.app/login", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",

        "Access-Control-Allow-Origin": "*",
      },
      credentials: "include",
    });
    if (res.ok) {
      res.json().then((userInfo) => {
        setUserInfo(userInfo);
        navigate("/");
      });
    } else {
      alert("Wrong Credentials");
    }
  };

  return (
    <form className="login" onSubmit={handleLogin}>
      <h1>Login</h1>
      <input
        name="username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        type="text"
        placeholder="username"
        required
      />
      <input
        name="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        type="password"
        placeholder="password"
        required
      />
      <button type="submit">Login</button>
      <button onClick={handleRegister}>Register</button>
    </form>
  );
};

export default Login;
