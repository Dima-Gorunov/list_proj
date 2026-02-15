import * as React from "react";
import { styled, Theme, CSSObject } from "@mui/material/styles";
import MuiDrawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import MenuIcon from "@mui/icons-material/Menu";

import { SideBarItem } from "../../../6_shared";
import { ISideBarItems, getSideBarStatusOpen, getSidebarItemsSelector, setSideBarOpen } from "../../../5_entities/SideBar";
import { useAppDispatch, useAppSelector } from "../../../1_app/model/hooks";
import { getProfileSelector } from "../../../5_entities/Profile/selectors";
import { Box, IconButton, Menu, MenuItem } from "@mui/material";
import { useNavigate } from "react-router-dom";

export const MobileBarButton: React.FC = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const items = useAppSelector(getSidebarItemsSelector);
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    const handleMenuClick = (link: string) => {
        navigate(link);
    };

    if (items.length === 0) {
        return null;
    }

    return (
        <Box className="MobileBarButton">
            <IconButton onClick={handleClick} ria-controls={open ? "mobileBar-menu" : undefined} aria-haspopup="true" aria-expanded={open ? "true" : undefined}>
                <MenuIcon sx={{ color: "white" }} />
            </IconButton>

            <Menu
                id="mobileBar-menu"
                anchorEl={anchorEl}
                anchorOrigin={{
                    vertical: "top",
                    horizontal: "left",
                }}
                keepMounted
                transformOrigin={{
                    vertical: "top",
                    horizontal: "left",
                }}
                open={open}
                onClose={handleClose}
                sx={{ top: 35, left: 0 }} // Позиционируем Menu под IconButton
            >
                {items.map((item) => (
                    <MenuItem key={item.id} onClick={() => handleMenuClick(item.link)}>
                        {item.text}
                    </MenuItem>
                ))}
                {/* <MenuItem onClick={handleClose}>Profile</MenuItem>
                            <MenuItem onClick={handleClose}>My account</MenuItem> */}
                {/* <MenuItem onClick={handleLogout}>Выйти</MenuItem> */}
            </Menu>
        </Box>
    );
};
