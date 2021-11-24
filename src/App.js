import React, { Fragment, useEffect } from "react";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import { Routes, Route, useNavigate } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import { Login } from "./components/Login";
import Students from "./components/Students";
import Home from "./components/Home";
import Student from "./components/Student";

function App() {
  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem("session")) {
      navigate("/login");
    }
  }, [navigate]);

  return (
    <div>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Dashboard />}>
          <Route index element={<Home />} />
          <Route path="/estudiantes" element={<Students />}/>
          <Route path="/estudiante" element={<Student />}>
            <Route path=":estudianteId" element={<Student />}/>
          </Route> 
        </Route>
      </Routes>
    </div>
  );
}

export default App;
