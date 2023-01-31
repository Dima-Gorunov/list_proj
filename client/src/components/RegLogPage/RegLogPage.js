import React, {useState} from 'react';
import {Link} from "react-router-dom";
import {LOGIN_ROUTE, REGISTRATION_ROUTE} from "../../Utils/const";
import {useLocation, useNavigate} from "react-router";
import {setAuthThunk, setUserError} from "../../ReduxToolkit/Slice/UserSlice";

const RegLogPage = (props) => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const location = useLocation()
    const navigate = useNavigate()
    const isLoginRoute = LOGIN_ROUTE === location.pathname
    const click = async () => {
        try {
            if (isLoginRoute) {
                let data = await props.setAuthThunk(email, password)
            } else {
                let data = await props.regThunk(email, password)
            }
            navigate('/')
        } catch (e) {
            props.setUserError(e.response.data.message)
        }
    }

    return (
        <div>
            {isLoginRoute ? <div>
                <div>
                    <div>
                        авторизация
                    </div>
                    {props.UserError && <div style={{color: "red"}}>err:{props.UserError}</div>}
                    <input type="text" value={email} onChange={(e) => setEmail(e.currentTarget.value)}/>
                    <input type="text" value={password} onChange={(e) => setPassword(e.currentTarget.value)}/>
                    <button onClick={click}>войти
                    </button>
                </div>
                <div>
                    нет аккаунта
                    <Link to={REGISTRATION_ROUTE}>зарегистрироваться</Link>
                </div>
            </div> : <div>
                <div>
                    <div>
                        регистрация
                    </div>
                    {props.UserError && <div style={{color: "red"}}>err:{props.UserError}</div>}
                    <input type="text" value={email} onChange={(e) => setEmail(e.currentTarget.value)}/>
                    <input type="text" value={password} onChange={(e) => setPassword(e.currentTarget.value)}/>
                    <button onClick={click}>зарегистрироваться
                    </button>
                </div>
                <div>
                    есть аккаунт
                    <Link to={LOGIN_ROUTE}>войти</Link>
                </div>
            </div>}
        </div>
    );
};

export default RegLogPage;