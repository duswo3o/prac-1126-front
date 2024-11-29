import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Navbar() {
  const [isLogin, setIsLogin] = useState(false);

  const getLogin = () => {
    if (localStorage.getItem("accessToken")) {
      setIsLogin(true);
    } else {
      setIsLogin(false);
    }
  };

  const logoutBtn = async () => {
    await fetch("http://127.0.0.1:8000/api/v1/accounts/signout/", {
      method: "POST",
      headers: { "Content-Type": "application/json; charset=utf-8" },
      body: JSON.stringify({
        refresh: localStorage.getItem("refreshToken"),
      }),
    })
      .then((response) => response.json())
      .then((result) => {
        localStorage.clear();
        getLogin();
      });
  };

  useEffect(() => {
    getLogin();
  }, []);

  return (
    <div
      style={{
        width: "300px",
        border: "2px solid",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-around",
      }}
    >
      <Link
        to="/"
        style={{ textDecoration: "none", color: "blue", cursor: "pointer" }}
      >
        Home
      </Link>
      {isLogin ? (
        <div>
          로그아웃
          <button
            style={{
              background: "transparent",
              border: "none",
              cursor: "pointer",
            }}
            onClick={logoutBtn}
          >
            signout
          </button>
        </div>
      ) : (
        <div>
          <Link
            to="/signup"
            style={{ textDecoration: "none", color: "blue", cursor: "pointer" }}
          >
            signup
          </Link>{" "}
          <Link
            to="/signin"
            style={{ textDecoration: "none", color: "blue", cursor: "pointer" }}
          >
            signin
          </Link>
        </div>
      )}
    </div>
  );
}

export default Navbar;
