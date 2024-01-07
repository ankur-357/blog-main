import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [conpassword, setConPassword] = useState("");
  const navigate = useNavigate();
  const handleBack = (e) => {
    e.preventDefault();
    navigate("/login");
  };
  const handleRegister = async (e) => {
    e.preventDefault();
    if (conpassword === password) {
      const data = {
        username,
        password,
        email,
      };
      console.log(data);

      const res = await fetch("http://localhost:4000/register", {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      });
      if (res.status === 200) {
        alert("registration Successfull");
        navigate("/login");
      } else {
        alert("registration Fail");
      }
    } else {
      alert("Somthing Went Worng...");
    }
  };
  return (
    <form className="register" onSubmit={handleRegister}>
      <h1>Register</h1>
      <input
        name="username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        type="text"
        placeholder="username"
        required
      />
      <input
        name="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        type="email"
        placeholder="email"
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
      <input
        name="conpassword"
        value={conpassword}
        onChange={(e) => setConPassword(e.target.value)}
        type="password"
        placeholder="Conform password"
        required
      />
      <button type="submit">Register</button>
      <button onClick={handleBack}>Back</button>
    </form>
  );
};

export default Register;
