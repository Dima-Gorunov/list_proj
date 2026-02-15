import { Box, CircularProgress, Typography } from "@mui/material";

export const ActivatedWait = () => {
    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                height: "60vh",
                textAlign: "center",
                flex: 1,
            }}
        >
            <CircularProgress size={60} sx={{ mb: 3 }} />
            <Typography variant="h5" gutterBottom>
                Ожидание активации аккаунта
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ maxWidth: 400 }}>
                Ваш аккаунт ожидает активации администратором. Пожалуйста, подождите или обратитесь к администратору системы.
            </Typography>
        </Box>
    );
};
