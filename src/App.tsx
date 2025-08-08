import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import "ace-builds/src-noconflict/mode-json";
import "ace-builds/src-noconflict/theme-monokai";
import "ace-builds/src-noconflict/ext-language_tools";

import Login from "./Components/Login";
import Register from "./Components/Register";
import Home from "./Components/Home";

const App = () => {
  return (
    <BrowserRouter>
      <Link to="/login">Login</Link>
      <Link to="/register">Register </Link>
      <Link to="/">Home</Link>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
