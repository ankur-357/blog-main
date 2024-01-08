import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "./UserContext";

const Header = () => {
  const { setUserInfo, userInfo } = useContext(UserContext);
  useEffect(() => {
    fetch("https://react-backend-new.onrender.com/profile", {
      credentials: "include",
    }).then((res) => {
      res.json().then((userinfo) => setUserInfo(userinfo));
    });
  }, []);
  const handleLogout = (e) => {
    e.preventDefault();
    fetch("https://react-backend-new.onrender.com/logout", {
      method: "POST",
      credentials: "include",
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
    });
    setUserInfo(null);
  };
  const username = userInfo?.username;
  return (
    <header>
      <Link to={"/"} className="logo">
        MyBlog
      </Link>
      <nav>
        {username && (
          <>
            <Link to={"/create"}>Create Post</Link>
            <a onClick={handleLogout}>Logout</a>
          </>
        )}
        {!username && (
          <>
            <Link to={"/login"}>Login</Link>
            <Link to={"/register"}>Register</Link>
          </>
        )}
      </nav>
    </header>
  );
};

export default Header;
