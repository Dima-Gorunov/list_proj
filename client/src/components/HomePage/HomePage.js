import React from 'react';
import {Link, Outlet} from "react-router-dom";

const HomePage = () => {
    return (
        <div>
            <Link to="/">home</Link>
            <Link to="/about">о нас</Link>
            <Link to="/contacts">контакты</Link>
            <Outlet/>
        </div>
    );
};

export default HomePage;