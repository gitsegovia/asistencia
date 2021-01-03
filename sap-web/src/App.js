import React, { useState } from "react";
import "./App.css";
import { BrowserRouter as Router } from "react-router-dom";
import SapAppBarPr from "./components/appBarPr";
import Loading from "./stores/loadingContainer";
import Login from "./components/login/login";
import UserStore from "./stores/userState";

function App() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const userState = UserStore.useContainer();

  return (
<<<<<<< HEAD

    <Loading.Provider>
      <Router>
        <SapAppBarPr />
      </Router>
    </Loading.Provider>

  )}
=======
      <Loading.Provider>
        <Router>
          {userState.user ? <SapAppBarPr /> : <Login />}
        </Router>
      </Loading.Provider>
  );
}
>>>>>>> 23fcebc3f9809d03658b5f15a658376c9c169634

export default App;
