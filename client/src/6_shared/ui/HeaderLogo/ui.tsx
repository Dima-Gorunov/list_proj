import { Box, Typography } from "@mui/material";
import { NavLink } from "react-router-dom";

export const HeaderLogo = () => {
    return (
        <Box className="headerLogo">
            <Typography
                variant="h6"
                component={NavLink}
                to="/"
                sx={{
                    display: { xs: "none", sm: "block" },
                    textDecoration: "none",
                    color: "white",
                }}
            >
                Перекинь фотки на жесткий диск
            </Typography>
        </Box>
    );
};
