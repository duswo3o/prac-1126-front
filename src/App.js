import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SignUp from "./routes/signup";
import SignIn from "./routes/Signin";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/signup" element={<SignUp />}></Route>
        <Route path="/signin" element={<SignIn />}></Route>
      </Routes>
    </Router>
  );
}

export default App;
