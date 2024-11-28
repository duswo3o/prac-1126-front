import { Link } from "react-router-dom";

function Navbar() {
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
      <Link
        to="/signup"
        style={{ textDecoration: "none", color: "blue", cursor: "pointer" }}
      >
        signup
      </Link>
      <Link
        to="/signin"
        style={{ textDecoration: "none", color: "blue", cursor: "pointer" }}
      >
        signin
      </Link>
    </div>
  );
}

export default Navbar;
