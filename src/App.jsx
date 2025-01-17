import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import TodoApp from "./components/TodoApp";
import Login from "./pages/Login";
import Register from "./pages/Register";

const App = () => {
  return (
    <div className="App w-full h-full">
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/todo" element={<TodoApp />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
