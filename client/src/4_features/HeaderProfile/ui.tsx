import { FC, useState, MouseEvent } from "react";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { IconButton, Menu, MenuItem } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../1_app/model/hooks";
import { getProfileSelector } from "../../5_entities/Profile/selectors";
import { logoutThunk } from "../../5_entities/Profile/ProfileSlice";
// import { Menu, MenuItem } from 'ui-library';

export const HeaderProfile: FC = () => {
    const dispatch = useAppDispatch();
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const profile = useAppSelector(getProfileSelector);
    const open = Boolean(anchorEl);
    const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleLogout = () => {
        dispatch(logoutThunk());
        setAnchorEl(null);
    };

    if (!profile?.email) {
        return null;
    }

    return (
        <>
            {profile.email}
            <IconButton
                onClick={handleClick}
                size="small"
                sx={{ ml: 2 }}
                aria-controls={open ? "account-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={open ? "true" : undefined}
            >
                <AccountCircleIcon fontSize="large" sx={{ color: "white" }} />
            </IconButton>
            <Menu
                id="account-menu"
                anchorEl={anchorEl}
                anchorOrigin={{
                    vertical: "top",
                    horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                }}
                open={open}
                onClose={handleClose}
                onClick={handleClose}
                sx={{ top: 35, right: 0 }} // Позиционируем Menu под IconButton
            >
                {/* <MenuItem onClick={handleClose}>Profile</MenuItem>
                <MenuItem onClick={handleClose}>My account</MenuItem> */}
                <MenuItem onClick={handleLogout}>Выйти</MenuItem>
            </Menu>
        </>
    );
};
