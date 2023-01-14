import React from 'react';
import {Route, Routes} from "react-router-dom";
import HomePageContainer from "./components/HomePage/HomePageContainer";
import AboutPageContainer from "./components/AboutPage/AboutPageContainer";
import WorkPageContainer from "./components/WorkPage/WorkPageContainer";

const App = (props) => {
    return (
        <Routes>
            <Route path="/" element={<HomePageContainer/>}>
                <Route index element={<WorkPageContainer/>}/>
                <Route path="/about" element={<AboutPageContainer/>}/>
                <Route path="/contacts" element={<div>contacts-----</div>}/>
            </Route>
        </Routes>
    );
};

export default App;