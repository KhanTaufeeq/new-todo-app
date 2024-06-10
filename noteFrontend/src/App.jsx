import { BrowserRouter, Route, Routes } from "react-router-dom";
import Popup from "./Popup";
import { Task } from "./Task";
import FilterTask from "./FilterTask";
import React from "react";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Task />} />
        <Route path="/popup" element={<Popup />} />
        <Route path="/filter" element = {<FilterTask/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
