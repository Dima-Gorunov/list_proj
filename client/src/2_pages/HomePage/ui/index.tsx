import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { Header, SideBar } from "../../../3_widgets";
import { Box } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../../1_app/model/hooks";
import { Button, HeaderLogo, Loader } from "../../../6_shared";

import { useEffect, useState } from "react";
import { getSidebarItemsSelector, setSideBarOpen } from "../../../5_entities/SideBar";
import { HeaderProfile } from "../../../4_features";
import { checkAuthThunk } from "../../../5_entities/Profile/ProfileSlice";
import { getUserAuthErrorSelector, getProfileSelector } from "../../../5_entities/Profile/selectors";
import { FRONT_ROUTES_STR } from "../../../6_shared/constants";

export const HomePage = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const authError = useAppSelector(getUserAuthErrorSelector);
    const user = useAppSelector(getProfileSelector);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        dispatch(checkAuthThunk()).finally(() => {
            setLoading(false);
        });
    }, []);

    useEffect(() => {
        if (authError || !user) {
            console.log("authError: true надо редиректить");
            navigate(`/${FRONT_ROUTES_STR.login}${location.search}`);
        }
    }, [authError, user]);

    const mainMouseEnterHandler = () => {
        dispatch(setSideBarOpen(false));
    };

    if (loading) {
        return <Loader />;
    }

    return (
        <>
            <Header />
            <Box sx={{ display: "flex", flex: 1, overflow: "hidden" }}>
                <SideBar />
                <Box onMouseEnter={mainMouseEnterHandler} sx={{ flex: 1, display: "flex", overflow: "hidden" }}>
                    <Outlet />
                </Box>
            </Box>
        </>
    );
};
