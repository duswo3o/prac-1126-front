import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SignUp from "./routes/signup";
import SignIn from "./routes/Signin";
import Profile from "./routes/Profile";
import List from "./routes/List";
import Navbar from "./components/Navbar";
import CreatePost from "./routes/Createpost";
import UpdatePost from "./routes/Updatepost";
import EditProfile from "./routes/EditProfile";
import { useState } from "react";

import axios from "axios";

function App() {
  const extendToken = () => {
    const refreshToken = localStorage.getItem("refreshToken");
    // console.log("토큰 연장 시작")
    if (refreshToken) {
      axios
        .post("http://127.0.0.1:8000/api/v1/accounts/token/refresh/", {
          refresh: refreshToken,
        })
        .then((response) => {
          const data = response.data;
          localStorage.setItem("accessToken", data.access);
          localStorage.setItem("refreshToken", data.refresh);
          console.log("토큰 연장 완료");
        })
        .catch((error) => {
          console.log(error.response);
          console.log("유효하지 않은 토큰: 토큰 연장 실패");
          localStorage.clear();
        });
    } else {
      console.log("연장할 토큰 없음");
    }
  };

  useState(() => {
    setInterval(() => {
      extendToken();
    }, 179 * 60000);
  }, []);

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/signup" element={<SignUp />}></Route>
        <Route path="/signin" element={<SignIn />}></Route>
        <Route path="/profile/:nickname" element={<Profile />}></Route>
        <Route path="" element={<List />}></Route>
        <Route path="/post" element={<CreatePost />}></Route>
        <Route path="/:id/update" element={<UpdatePost />}></Route>
        <Route path="/:nickname/edit" element={<EditProfile />}></Route>
      </Routes>
    </Router>
  );
}

export default App;
