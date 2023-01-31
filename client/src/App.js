import {Route, Routes, Navigate} from "react-router-dom";
import HomePageContainer from "./components/HomePage/HomePageContainer";
import WorkPageContainer from "./components/WorkPage/WorkPageContainer";
import RegLogPageContainer from "./components/RegLogPage/RegLogPageContainer";
import {adminRoutes, authRoutes, publicRoutes} from "./components/routes";
import {useEffect} from "react";

const App = (props) => {
//comments
    return (
        <Routes>
            <Route path="/" element={<HomePageContainer/>}>
                {<Route index element={<WorkPageContainer/>}/>}
                {props.User.isAdmin && adminRoutes.map(({path, component}) =>
                    <Route key={path} path={path} element={component}/>)}
                {props.User.isAuth && authRoutes.map(({path, component}) =>
                    <Route key={path} path={path} element={component}/>
                )}
                {!props.User.isAuth && publicRoutes.map(({path, component}) =>
                    <Route key={path} path={path} element={component}/>
                )}
                <Route path="*" element={<div>not found</div>}/>
            </Route>
        </Routes>
    );
};

export default App;