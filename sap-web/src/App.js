import React, { useState } from "react";
import "./App.css";
import { BrowserRouter as Router } from "react-router-dom";
import SapAppBarPr from "./components/appBarPr";
import Loading from "./stores/loadingContainer";

function App() {
  const [drawerOpen, setDrawerOpen] = useState(false);

  return (

    <Loading.Provider>
      <Router>
        <SapAppBarPr />
      </Router>
    </Loading.Provider>

  )}

export default App;
