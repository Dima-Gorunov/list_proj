import React from "react";
import MuiAppBar, { AppBarProps } from "@mui/material/AppBar";
import { theme } from "../../../1_app/ui/theme";

// Используем тип AppBarProps из MUI
export const AppBar: React.FC<AppBarProps> = ({ children, style, ...props }) => {
    // Добавляем пользовательский фон к существующим стилям

    return (
        <MuiAppBar {...props} sx={{}}>
            {children}
        </MuiAppBar>
    );
};
