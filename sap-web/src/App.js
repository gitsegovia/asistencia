import React, { useState } from "react";
import "./App.css";
import { BrowserRouter as Router } from "react-router-dom";
import SapAppBarPr from "./components/appBarPr";
import Loading from "./stores/loadingContainer";

function App() {
  const [drawerOpen, setDrawerOpen] = useState(false);

  return (
<<<<<<< HEAD
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
=======
    <Loading.Provider>
      <Router>
        <SapAppBarPr />
      </Router>
    </Loading.Provider>
>>>>>>> bb7272889525d387f92fd43a4c185b33c1e65e0f
  );
}

export default App;
