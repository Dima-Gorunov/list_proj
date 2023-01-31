import React from 'react';
import {Link, Outlet} from "react-router-dom";
import {useLocation} from "react-router";
import {LOGIN_ROUTE} from "../../Utils/const";

const HomePage = (props) => {
    const setAuthLocal = () => {
        props.setAuth(false)
    }
    return (
        <div>
            <div className="btn-group btn-group-lg" role="group" aria-label="Basic example">
                <Link to="/" type="button"
                      className="btn btn-secondary">-home-</Link>
                {props.User.isAuth ? <div>
                    <Link to={`/user/${props.User.id}`} type="button"
                          className="btn btn-secondary">Мой профиль</Link>
                    {props.User.isAdmin && <Link to="/admin" type="button"
                                                 className="btn btn-secondary">Админ панель</Link>}
                    <Link to={LOGIN_ROUTE} type="button"
                          className="btn btn-secondary" onClick={setAuthLocal}>Выйти</Link>
                    <span>{props.User.email}</span>
                </div> : <div>
                    {<Link to={LOGIN_ROUTE} type="button"
                           className="btn btn-secondary">Войти или<br/>зарегистрироваться</Link>}
                </div>}
            </div>
            <br/>
            <Outlet/>
        </div>
    );
};

export default HomePage;