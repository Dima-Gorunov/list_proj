import { FC, useState, KeyboardEvent, MouseEvent } from "react";

// import MenuIcon from '@mui/icons-material/Menu';
import { Box, Toolbar } from "@mui/material";
import { AppBar, HeaderLogo } from "../../../6_shared";
import { HeaderProfile } from "../../../4_features";
import { MobileBarButton } from "../../../4_features/MobileBarButton";
// import { AppBar, Box, Button, Toolbar, Typography } from 'ui-library';

type HeaderProps = {
    logo?: React.ReactNode;
    navBar?: React.ReactNode;
    profile?: React.ReactNode;
};

export const Header: React.FC<HeaderProps> = () => (
    <AppBar position="static" sx={{ zIndex: 1, }}>
        <Toolbar>
            <MobileBarButton />
            <Box mr={4}>
                <HeaderLogo />
            </Box>
            <Box sx={{ flexGrow: 1 }} />
            <HeaderProfile />
        </Toolbar>
    </AppBar>
);
