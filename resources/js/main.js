import { Routes, Route } from 'react-router-dom';
import Home from "./pages/Home";
import Log from "./pages/Log";
import Info from "./pages/Info";
import NotFound from "./pages/NotFound";

function Main() {
    return (
        <Routes>
            <Route path='/' element={ <Home /> } />
            <Route path='/log/:id' element={ <Log /> } />
            <Route path='/info/:id' element={ <Info /> }/>
        </Routes>
    )
}

export default Main;
