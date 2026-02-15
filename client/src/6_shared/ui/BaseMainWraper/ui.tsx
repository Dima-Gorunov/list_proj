import { Box, SxProps } from "@mui/material";
import { ReactNode } from "react";

interface BaseMainWraperProps {
    children: ReactNode;
    sx?: SxProps;
}

export const BaseMainWraper: React.FC<BaseMainWraperProps> = ({ children, sx }) => {
    return (
        <Box sx={{ display: "flex", flex: 1, justifyContent: "center", padding: "16px", overflow: "auto", bgcolor: "background.default", ...sx }}>
            <Box sx={{ textAlign: "center", width: "100%", height: "100%", maxWidth: "1920px", display: "flex", flexDirection: "column" }}>{children}</Box>
        </Box>
    );
};
