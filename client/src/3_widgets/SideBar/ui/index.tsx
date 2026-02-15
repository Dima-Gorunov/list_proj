import * as React from "react";
import { styled, Theme, CSSObject } from "@mui/material/styles";
import MuiDrawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";

import { SideBarItem } from "../../../6_shared";
import { ISideBarItems, getSideBarStatusOpen, getSidebarItemsSelector, setSideBarOpen } from "../../../5_entities/SideBar";
import { useAppDispatch, useAppSelector } from "../../../1_app/model/hooks";
import { getProfileSelector } from "../../../5_entities/Profile/selectors";

const drawerWidth = 240;

const openedMixin = (theme: Theme): CSSObject => ({
    width: drawerWidth,
    transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
    }),
    overflowX: "hidden",
});

const closedMixin = (theme: Theme): CSSObject => ({
    transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: "hidden",
    width: `calc(${theme.spacing(7)} + 1px)`,
    [theme.breakpoints.up("sm")]: {
        width: `calc(${theme.spacing(8)} + 1px)`,
    },
});

const Drawer = styled(MuiDrawer, {
    shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: "nowrap",
    boxSizing: "border-box",
    transition: ".3s",
    ...(open && {
        ...openedMixin(theme),
        "& .MuiDrawer-paper": openedMixin(theme),
    }),
    ...(!open && {
        ...closedMixin(theme),
        "& .MuiDrawer-paper": closedMixin(theme),
    }),
}));

export const SideBar: React.FC = () => {
    const dispatch = useAppDispatch();
    const items = useAppSelector(getSidebarItemsSelector);
    const user = useAppSelector(getProfileSelector);
    const open = useAppSelector(getSideBarStatusOpen);
    const memoItems = React.useMemo(() => items, [items]);

    const handleMouseEnter = () => {
        !open && dispatch(setSideBarOpen(true));
    };

    if (items.length === 0) {
        return null;
    }

    return (
        <Drawer
            className="sidebar"
            onMouseEnter={handleMouseEnter}
            PaperProps={{
                sx: {
                    position: "static",
                },
            }}
            variant="permanent"
            open={open}
        >
            <List>
                {memoItems.map((item) => (
                    <SideBarItem key={item.text} item={item} />
                ))}
            </List>
            <Divider />
        </Drawer>
    );
};
