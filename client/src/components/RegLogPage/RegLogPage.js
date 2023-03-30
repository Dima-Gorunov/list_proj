import React, {useState} from 'react';
import {Link} from "react-router-dom";
import {LOGIN_ROUTE, REGISTRATION_ROUTE} from "../../Utils/const";
import {useLocation, useNavigate} from "react-router";
import {loginThunk} from "../../ReduxToolkit/Slice/UserSlice";

const RegLogPage = (props) => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const location = useLocation()
    const navigate = useNavigate()
    const isLoginRoute = LOGIN_ROUTE === location.pathname
    const click = async () => {
        try {
            if (isLoginRoute) {
                let data = await props.loginThunk(email, password)
            } else {
                let data = await props.regThunk(email, password)
            }
            navigate('/')
        } catch (e) {
            console.log(e.message);
        }
    }

    return (
        <div>
            <div className="dark_container p-3">
                <div>
                    <div>
                        {isLoginRoute ? "Авторизация" : "Регистрация"}
                    </div>
                    {props.UserError && <div style={{color: "red"}}>err:{props.UserError}</div>}
                    <input type="email" value={email} onChange={(e) => setEmail(e.currentTarget.value)}/>
                    <input type="password" value={password} onChange={(e) => setPassword(e.currentTarget.value)}/>
                    <button onClick={click}>{isLoginRoute ? "войти" : "зaрегистрироваться "}
                    </button>
                    <div>
                        {isLoginRoute ? "нет аккаунта?" : "есть аккаунт?"}
                        <Link
                            to={isLoginRoute ? REGISTRATION_ROUTE : LOGIN_ROUTE}>{isLoginRoute ? "зарегистрироваться" : "войти"}</Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RegLogPage;