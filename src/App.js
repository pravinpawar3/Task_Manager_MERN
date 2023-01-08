
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css"

import Navbar from "./components/navbar.component";
import TaskList from "./components/task-list.component";
import EditTask from "./components/edit-task.component";
import CreateTask from "./components/create-task.component";
import CreateUser from "./components/create-user.component";

function App() {
  return (
    <Routes>
      <Route  path="/"  exact element={<Navbar />} />
      <Route  path="/task"  exact element={<TaskList />} />
      <Route  path="/user"   element={<CreateUser />} />
      <Route  path="/create"  element={<CreateTask />} />
      <Route  path="/edit/:id"  element={<EditTask />} />
    </Routes>
  );
}

export default App;