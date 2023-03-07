import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./Home";
import Login from "./components/login/login";
import NoPage from "./components/noPage/noPage";
import Register from "./components/register/register";
import Todo from "./components/todo/todo";
import User from "./components/user/user";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="register" element={<Register />} />
        <Route path="login" element={<Login />} />
        <Route path="user/:id" element={<User />} />
        <Route path="todo/:id" element={<Todo />} />
        <Route path="*" element={<NoPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
