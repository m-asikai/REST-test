import { HashRouter, Routes, Route } from "react-router-dom";

import Login from "./Components/Login";
import Register from "./Components/Register";
import Home from "./Components/Home";

const App = () => {
  return (
    <HashRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<Home />} />
      </Routes>
    </HashRouter>
  );
};

export default App;
