import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home"
import Log from "./pages/Log"
import Info from "./pages/Info"
import NotFound from "./pages/NotFound"
   
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
}
   
export default Main;
   
if (document.getElementById('app')) {
    ReactDOM.render(<Main />, document.getElementById('app'));
}
