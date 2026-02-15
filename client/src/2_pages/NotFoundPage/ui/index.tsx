import { Box, Typography } from "@mui/material";
import { FC, useCallback } from "react";

import { useNavigate } from "react-router-dom";
import { Button } from "../../../6_shared";
// import { Box, Button, Typography } from 'ui-library';

export const NotFoundPage: FC = () => {
    const navigate = useNavigate();

    const handleClick = useCallback(() => {
        navigate(-1);
    }, [navigate]);

    return (
        <Box sx={{ display: "flex", justifyContent: "center", flex: 1 }}>
            <Box sx={{ textAlign: "center" }}>
                <Typography variant="h3" component="h1" align="center" sx={{ mt: 2 }}>
                    Страница не найдена
                </Typography>
                <Button variant="contained" onClick={handleClick}>
                    Перейти назад
                </Button>
            </Box>
        </Box>
    );
};
