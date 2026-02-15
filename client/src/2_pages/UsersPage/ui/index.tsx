import { Box, Typography } from "@mui/material";
import { FC, useCallback, useEffect } from "react";

import { useNavigate } from "react-router-dom";
import { BaseMainWraper, Button, Loader } from "../../../6_shared";
import { useAppDispatch, useAppSelector } from "../../../1_app/model/hooks";
import { getAllUsersThunk } from "../../../5_entities/Users/UsersSlice";
import { UsersList } from "../../../3_widgets";
import { getUsersloadingSelector } from "../../../5_entities/Users/selectors";
// import { Box, Button, Typography } from 'ui-library';

export const UsersPage: FC = () => {
    const dispatch = useAppDispatch();
    const loading = useAppSelector(getUsersloadingSelector);
    useEffect(() => {
        dispatch(getAllUsersThunk());
    }, []);

    if (loading) {
        return <Loader />;
    }
    return (
        <BaseMainWraper>
            <UsersList />
        </BaseMainWraper>
    );
};
