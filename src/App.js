import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SignUp from "./routes/signup";
import SignIn from "./routes/Signin";
import Profile from "./routes/Profile";
import List from "./routes/List";
import Navbar from "./components/Navbar";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/signup" element={<SignUp />}></Route>
        <Route path="/signin" element={<SignIn />}></Route>
        <Route path="/profile/:nickname" element={<Profile />}></Route>
        <Route path="" element={<List />}></Route>
      </Routes>
    </Router>
  );
}

export default App;
