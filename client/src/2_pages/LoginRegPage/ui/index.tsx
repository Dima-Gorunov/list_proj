import { Box, Typography, Paper, Divider, Button as MuiButton } from "@mui/material";
import { FC, useEffect, useState } from "react";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { Button, TextField } from "../../../6_shared";
import { Login as LoginIcon, PersonAdd as PersonAddIcon, ArrowBack as ArrowBackIcon } from "@mui/icons-material";
import { useAppDispatch, useAppSelector } from "../../../1_app/model/hooks";
import { loginThunk, registrationThunk, setLogout } from "../../../5_entities/Profile/ProfileSlice";
import { getProfileSelector } from "../../../5_entities/Profile/selectors";
import { FRONT_ROUTES_STR, QUERY_STR_NULLABLE_ACCOUNT } from "../../../6_shared/constants";
import { removeHashParamAndNavigate } from "../../../6_shared/helpers/hashHelpers";

export const LoginRegPage: FC = () => {
    const dispatch = useAppDispatch();
    const [searchParams, setSearchParams] = useSearchParams();
    const profile = useAppSelector(getProfileSelector);
    const navigate = useNavigate();
    const isAdmin = searchParams.get("isAdmin");

    const isNullableAcc = searchParams.get(QUERY_STR_NULLABLE_ACCOUNT);

    const [mode, setMode] = useState<"choice" | "login" | "register">("choice");
    const handleLoginClick = () => {
        setMode("login");
    };
    const handleRegisterClick = () => {
        setMode("register");
    };
    const handleBackToChoice = () => {
        setMode("choice");
    };
    const handleSubmitRegistration = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const email = formData.get("email") as string;
        const password = formData.get("password") as string;
        const secretAdminString = formData.get("secretAdminString") as string;
        console.log("Registration attempt:", {
            email,
            password,
            secretAdminString,
        });
        dispatch(registrationThunk({ email, password, secretAdminString: isAdmin ? secretAdminString : "" })).then((data) => {
            if (data.meta.requestStatus === "fulfilled") {
                navigate(`/${FRONT_ROUTES_STR.main}`);
            }
        });
    };

    const handleSubmitLogin = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const formData = new FormData(e.currentTarget);
        const email = formData.get("email") as string;
        const password = formData.get("password") as string;
        console.log("Login attempt:", { email, password });
        dispatch(loginThunk({ email, password })).then((data) => {
            if (data.meta.requestStatus === "fulfilled") {
                navigate(`/${FRONT_ROUTES_STR.main}`);
            }
        });
    };

    // Форма логина
    const renderLoginForm = () => (
        <Paper
            elevation={3}
            sx={{
                p: 4,
                maxWidth: 400,
                width: "100%",
                borderRadius: 2,
            }}
        >
            <MuiButton startIcon={<ArrowBackIcon />} onClick={handleBackToChoice} sx={{ mb: 3 }}>
                Назад
            </MuiButton>

            <Typography variant="h4" component="h1" align="center" gutterBottom>
                Вход в систему
            </Typography>

            <Typography variant="body2" color="text.secondary" align="center" sx={{ mb: 3 }}>
                Введите свои учетные данные для входа
            </Typography>

            {/* Здесь будет форма логина */}
            <Box sx={{ mt: 3 }}>
                <form onSubmit={handleSubmitLogin}>
                    <TextField name="email" type="email" label="Email" fullWidth required margin="normal" />

                    <TextField name="password" type="password" label="Password" fullWidth required margin="normal" />

                    <Button type="submit" variant="contained" fullWidth sx={{ mt: 2 }}>
                        Войти
                    </Button>
                </form>
            </Box>
        </Paper>
    );

    // Форма регистрации
    const renderRegisterForm = () => (
        <Paper
            elevation={3}
            sx={{
                p: 4,
                maxWidth: 400,
                width: "100%",
                borderRadius: 2,
            }}
        >
            <MuiButton startIcon={<ArrowBackIcon />} onClick={handleBackToChoice} sx={{ mb: 3 }}>
                Назад
            </MuiButton>

            <Typography variant="h4" component="h1" align="center" gutterBottom>
                Регистрация
            </Typography>

            <Typography variant="body2" color="text.secondary" align="center" sx={{ mb: 3 }}>
                Создайте новый аккаунт
            </Typography>

            {/* Здесь будет форма регистрации */}
            <Box sx={{ mt: 3 }}>
                <form onSubmit={handleSubmitRegistration}>
                    <TextField name="email" type="email" label="Email" fullWidth required margin="normal" />

                    <TextField name="password" type="password" label="Password" fullWidth required margin="normal" />

                    {isAdmin && <TextField name="secretAdminString" type="secretAdminString" label="secretAdminString" fullWidth margin="normal" />}

                    <Button type="submit" variant="contained" fullWidth sx={{ mt: 2 }}>
                        Создать
                    </Button>
                </form>
            </Box>
        </Paper>
    );

    // Выбор режима (логин/регистрация)
    const renderChoice = () => (
        <Paper
            elevation={3}
            sx={{
                p: 4,
                maxWidth: 500,
                width: "100%",
                borderRadius: 2,
            }}
        >
            <Typography variant="h4" component="h1" align="center" gutterBottom>
                Добро пожаловать!
            </Typography>

            <Typography variant="body1" color="text.secondary" align="center" sx={{ mb: 4 }}>
                Выберите действие для продолжения
            </Typography>

            <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                <Button
                    variant="contained"
                    size="large"
                    fullWidth
                    startIcon={<LoginIcon />}
                    onClick={handleLoginClick}
                    sx={{
                        py: 1.5,
                        fontSize: "1.1rem",
                        borderRadius: 2,
                    }}
                >
                    Войти в аккаунт
                </Button>

                <Divider sx={{ my: 2 }}>
                    <Typography variant="body2" color="text.secondary">
                        или
                    </Typography>
                </Divider>

                <Button
                    variant="outlined"
                    size="large"
                    fullWidth
                    startIcon={<PersonAddIcon />}
                    onClick={handleRegisterClick}
                    sx={{
                        py: 1.5,
                        fontSize: "1.1rem",
                        borderRadius: 2,
                    }}
                >
                    Создать аккаунт
                </Button>
            </Box>

            <Box sx={{ mt: 4, textAlign: "center" }}>
                <Typography variant="body2" color="text.secondary">
                    Продолжая, вы соглашаетесь с нашими
                </Typography>
                <MuiButton size="small" variant="text">
                    Условиями использования
                </MuiButton>
                <Typography variant="body2" color="text.secondary" component="span">
                    {" "}
                    и{" "}
                </Typography>
                <MuiButton size="small" variant="text">
                    Политикой конфиденциальности
                </MuiButton>
            </Box>
        </Paper>
    );

    useEffect(() => {
        if (isNullableAcc) {
            dispatch(setLogout());
            removeHashParamAndNavigate(QUERY_STR_NULLABLE_ACCOUNT);
        }
    }, [isNullableAcc]);

    useEffect(() => {
        if (profile?.email) {
            navigate(`/${FRONT_ROUTES_STR.main}`);
        }
    }, [profile]);
    return (
        <Box
            sx={{
                minHeight: "100%",
                width: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                p: 2,
            }}
        >
            <Box sx={{ width: "100%", maxWidth: 1200 }}>
                <Box sx={{ display: "flex", justifyContent: "center" }}>
                    {mode === "choice" && renderChoice()}
                    {mode === "login" && renderLoginForm()}
                    {mode === "register" && renderRegisterForm()}
                </Box>
            </Box>
        </Box>
    );
};
