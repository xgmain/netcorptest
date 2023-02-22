import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Bootstrap CSS
import "bootstrap/dist/css/bootstrap.min.css";
// Bootstrap Bundle JS
import "bootstrap/dist/js/bootstrap.bundle.min";

import Home from "./pages/Home";
import Log from "./pages/Log";
import Info from "./pages/Info";
import NotFound from "./pages/NotFound";
   
function Main() {
    return (
        <Router>
            <Routes>
                <Route exact path="/"  element={<Home/>} />
                <Route path="/log"  element={<Log/>} />
                <Route path="/info"  element={<Info/>} />
                <Route element={<NotFound/>} />
            </Routes>
        </Router>
    );
};
   
export default Main;
   
createRoot(document.getElementById('app')).render(<Main />);
