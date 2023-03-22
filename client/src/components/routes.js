import {ADMIN_ROUTE, LOGIN_ROUTE, REGISTRATION_ROUTE, USER_ROUTE, ACTIVATE_ROUTE} from "../Utils/const";
import AdminPageContainer from "./AdminPage/AdminPageContainer";
import UserPageContainer from "./UserPage/UserPageContainer";
import RegLogPageContainer from "./RegLogPage/RegLogPageContainer";
import {store} from "../ReduxToolkit";
import {getUser} from "../ReduxToolkit/Selectors/UserSelector";
import ConfirmPage from "./ConfirmPage/ConfirmPage";
import ConfirmPageContainer from "./ConfirmPage/ConfirmPageContainer";


export const authRoutes = [
    {
        path: USER_ROUTE + `/:id`,
        text: getUser(store.getState()).IsAuth ? 'Мой профиль' : 'не мой профиль',
        component: <UserPageContainer/>
    },
    {
        path: ACTIVATE_ROUTE,
        component: <ConfirmPageContainer/>
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