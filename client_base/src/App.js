import {Route, Routes, Navigate} from "react-router-dom";
import HomePageContainer from "./components/HomePage/HomePageContainer";
import WorkPageContainer from "./components/WorkPage/WorkPageContainer";
import RegLogPageContainer from "./components/RegLogPage/RegLogPageContainer";
import {adminRoutes, authRoutes, publicRoutes} from "./components/routes";
import {useEffect} from "react";
import {ACTIVATE_ROUTE} from "./Utils/const";
import ConfirmPageContainer from "./components/ConfirmPage/ConfirmPageContainer";

const App = (props) => {
//comments
    return (
        <Routes>
            <Route path="/" element={<HomePageContainer/>}>
                {<Route index element={<WorkPageContainer/>}/>}
                {props.User.IsAdmin && adminRoutes.map(({path, component}) =>
                    <Route key={path} path={path} element={component}/>)}
                {props.User.IsAuth && authRoutes.map(({path, component}) =>
                    <Route key={path} path={path} element={component}/>
                )}
                {!props.User.Activated && props.User.IsAuth &&
                <Route path={ACTIVATE_ROUTE} element={<ConfirmPageContainer/>}/>
                }
                {!props.User.IsAuth && publicRoutes.map(({path, component}) =>
                    <Route key={path} path={path} element={component}/>
                )}
                <Route path="*" element={<div>not found</div>}/>
            </Route>
        </Routes>
    );
};

export default App;