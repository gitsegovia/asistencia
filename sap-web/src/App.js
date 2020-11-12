import React, { useState } from "react";
import "./App.css";
import {   BrowserRouter as Router } from "react-router-dom";

import Main from "./screen/main";
import EmployeeForm from "./components/employee/employeeForm";
import EmployeeList from "./components/employee/employeeList";
import BussinessForm from "./components/bussiness/bussinessForm";
import ChargesForm from "./components/charges/chargesForm";
import ChargesList from "./components/charges/chargesList";
import RolesForm from "./components/roles/rolesForm";
import RolesList from "./components/roles/rolesList";
import ScheduleForm from "./components/schedules/scheduleForm";
import SchedulesList from "./components/schedules/schedulesList";
import BussinessList from "./components/bussiness/bussinessList";
import SapAppBarPr from "./components/appBarPr";
import SideBar from "./components/sideBar";

function App() {
  const [drawerOpen, setDrawerOpen] = useState(false);

  return (
    <Router>
      <SapAppBarPr />
    </Router>
  );
}

export default App;
