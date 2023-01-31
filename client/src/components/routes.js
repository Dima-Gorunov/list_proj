import {ADMIN_ROUTE, LOGIN_ROUTE, REGISTRATION_ROUTE, USER_ROUTE} from "../Utils/const";
import AdminPageContainer from "./AdminPage/AdminPageContainer";
import UserPageContainer from "./UserPage/UserPageContainer";
import RegLogPageContainer from "./RegLogPage/RegLogPageContainer";
import {store} from "../ReduxToolkit";
import {getUser} from "../ReduxToolkit/Selectors/UserSelector";
import {Navigate} from "react-router-dom"

export const authRoutes = [
    {
        path: USER_ROUTE + `/:id`,
        text: getUser(store.getState()).isAuth ? 'Мой профиль' : 'не мой профиль',
        component: <UserPageContainer/>
    }
]

export const adminRoutes = [
    {
        path: ADMIN_ROUTE,
        text: "Админ панель",
        component: <AdminPageContainer/>
    }
]

export const publicRoutes = [
    {
        path: REGISTRATION_ROUTE,
        component: <RegLogPageContainer/>
    },
    {
        path: LOGIN_ROUTE,
        component: <RegLogPageContainer/>

    }
]