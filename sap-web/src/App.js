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
<<<<<<< HEAD
    //<Main />
   // <EmployeeForm />
    //<EmployeeList />
    <BussinessForm />
    //<ChargesForm />
    //<RolesForm />
    //<ScheduleForm />
   //<ChargesList />
   //<RolesList />
   //<SchedulesList />
   //<BussinessList />
=======
    <Router>
      <SapAppBarPr />
    </Router>
>>>>>>> d6cc97b3935b61f4e94baf37fad980034904516c
  );
}

export default App;
