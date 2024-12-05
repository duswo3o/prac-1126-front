import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SignUp from "./routes/signup";
import SignIn from "./routes/Signin";
import Profile from "./routes/Profile";
import List from "./routes/List";
import Navbar from "./components/Navbar";
import CreatePost from "./routes/Createpost";
import UpdatePost from "./routes/Updatepost";
import EditProfile from "./routes/EditProfile";

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
        <Route path="/:id/update" element={<UpdatePost />}></Route>
        <Route path="/:nickname/edit" element={<EditProfile />}></Route>
      </Routes>
    </Router>
  );
}

export default App;
