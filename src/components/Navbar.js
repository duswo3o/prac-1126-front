import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import styles from "./components.module.css";

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
      <Link to="/" className={styles.linkBtn}>
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
          <Link to="/signup" className={styles.linkBtn}>
            signup
          </Link>{" "}
          <Link to="/signin" className={styles.linkBtn}>
            signin
          </Link>
        </div>
      )}
      <Link to="/post" className={styles.linkBtn}>
        <div> ➕ Post </div>
      </Link>
    </div>
  );
}

export default Navbar;
