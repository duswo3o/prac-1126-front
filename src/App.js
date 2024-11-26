import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SignUp from "./routes/signup";
import SignIn from "./routes/Signin";
import Profile from "./routes/Profile";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/signup" element={<SignUp />}></Route>
        <Route path="/signin" element={<SignIn />}></Route>
        <Route path="/profile/:nickname" element={<Profile />}></Route>
      </Routes>
    </Router>
  );
}

export default App;
