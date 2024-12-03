import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link} from "react-router-dom";
import TopBar from "./Components/TopBar";
import Home from "./Components/Home";
import Catalog from "./Components/catalog";

import { Auth } from "./Components/UserAuthentication"; // Import Auth component


function App() {
  

  return (
   
      <div>
        <nav>
          <Link to="/">Auth</Link> | <Link to="/home">Home</Link> |{" "}
          <Link to="/catalog">Catalog</Link>
        </nav>
        <Routes>
          <Route path="/" element={<Auth />} /> {/* Set Auth for root */}
          <Route path="/home" element={<Home />} /> {/* Set Home for /home */}
          <Route path="/catalog" element={<Catalog />} /> {/* Set Catalog for /catalog */}
        </Routes>
      </div>
   
  );
}

export default App;
