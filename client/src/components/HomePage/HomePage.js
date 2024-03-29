import React from 'react';
import {Link, NavLink, Outlet} from "react-router-dom";
import {useLocation} from "react-router";
import {LOGIN_ROUTE} from "../../Utils/const";
import CustomLink from "../CustomElements/CustomLink";
import CustomButton from "../CustomElements/CustomButton";

const HomePage = (props) => {
    const logout = () => {
        props.logOutThunk()
    }

    return (
        <div className="">
            <div className="dark_container p-2 mb-3">
                <div className="m-auto d-flex justify-content-between" style={{width: "80%"}}>
                    <div className="d-flex align-items-center">
                        {props.User.IsAuth &&
                        <div>
                            <CustomLink to={`/user/${props.User.Id}`} className="me-4" type="button">Мой
                                профиль</CustomLink>
                            <CustomLink to="/" className="me-2" type="button">Мои посты</CustomLink>
                            <CustomLink to="/feed" className="me-2" type="button">Все посты</CustomLink>
                        </div>}
                        {props.User.IsAdmin && <Link to="/admin" type="button"
                                                     className="">Админ панель</Link>}
                    </div>
                    <div>
                        {props.User.IsAuth ? <CustomButton type="button"
                                                           onClick={logout}>Выйти</CustomButton> :
                            <CustomLink to={LOGIN_ROUTE} type="button"
                                        className="">Войти/Зарегистрироваться</CustomLink>
                        }
                    </div>
                </div>
            </div>
            <div className="w-75 text-white m-auto" style={{minHeight: "85vh"}}>
                <Outlet/>
            </div>
            <footer className="dark_container p-2">
                ff
            </footer>
        </div>
    );
};

export default HomePage;