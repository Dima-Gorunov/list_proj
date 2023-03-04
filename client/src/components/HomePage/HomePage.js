import React from 'react';
import {Link, NavLink, Outlet} from "react-router-dom";
import {useLocation} from "react-router";
import {LOGIN_ROUTE} from "../../Utils/const";
import CustomLink from "../CustomElements/CustomLink";

const HomePage = (props) => {
    const setAuthLocal = () => {
        props.setAuth(false)
        localStorage.setItem('token', "")
    }
    return (
        <div className="bg-dark">
            <header className="bg-dark">
                <div className="m-auto d-flex justify-content-between" style={{width:"80%"}} >
                    <div className="d-flex">
                        <CustomLink to="/" type="button"
                                    className="">Домашняя страница</CustomLink>
                        {props.User.isAuth &&
                        <CustomLink to={`/user/${props.User.id}`} type="button"
                                    className="">Мой профиль</CustomLink>}
                        {props.User.isAdmin && <Link to="/admin" type="button"
                                                     className="">Админ панель</Link>}
                    </div>
                    <div>
                        {props.User.isAuth ? <button type="button"
                                                     className="border border-white bg-dark text-white p-1 m-2 text-decoration-none"
                                                     onClick={setAuthLocal}>Выйти</button> :
                            <CustomLink to={LOGIN_ROUTE} type="button"
                                        className="">Войти/Зарегистрироваться</CustomLink>
                        }
                    </div>
                </div>
            </header>
            <hr className="border opacity-100 w-100 mt-2 p-0 mb-3"/>
            <body className="w-75 text-white bg-dark border border-2 p-2 m-auto">
            <Outlet/>
            </body>
            <footer>
                ff
            </footer>
        </div>
    );
};

export default HomePage;