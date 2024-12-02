import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SignUp from "./routes/signup";
import SignIn from "./routes/Signin";
import Profile from "./routes/Profile";
import List from "./routes/List";
import Navbar from "./components/Navbar";
import CreatePost from "./routes/Createpost";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/signup" element={<SignUp />}></Route>
        <Route path="/signin" element={<SignIn />}></Route>
        <Route path="/profile/:nickname" element={<Profile />}></Route>
        <Route path="" element={<List />}></Route>
        <Route path="/post" element={<CreatePost />}></Route>
      </Routes>
    </Router>
  );
}

export default App;
