import { FC } from "react";
import { Box, Typography, Avatar, Paper, Grid, Chip, Divider, Button, Stack, Card, CardContent, IconButton } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import PersonIcon from "@mui/icons-material/Person";
import EmailIcon from "@mui/icons-material/Email";
import BadgeIcon from "@mui/icons-material/Badge";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import UpdateIcon from "@mui/icons-material/Update";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import VerifiedIcon from "@mui/icons-material/Verified";
import { IProfile } from "../../../5_entities/Profile/types";
import { useAppSelector } from "../../../1_app/model/hooks";
import { getProfileSelector } from "../../../5_entities/Profile/selectors";
import { BaseMainWraper } from "../../../6_shared";
import { formatDate } from "../../../6_shared/helpers/date";

export const MyProfilePage: FC = () => {
    const profile: IProfile | null = useAppSelector(getProfileSelector);

    if (!profile) {
        return (
            <BaseMainWraper>
                <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "60vh" }}>
                    <Typography variant="h6" color="text.secondary">
                        Пожалуйста, войдите в систему
                    </Typography>
                </Box>
            </BaseMainWraper>
        );
    }

    return (
        <BaseMainWraper>
            <Box sx={{ maxWidth: 1200, margin: "0 auto", p: 3 }}>
                {/* Заголовок */}
                <Box sx={{ mb: 4 }}>
                    <Typography variant="h4" component="h1" gutterBottom fontWeight="bold">
                        Мой профиль
                    </Typography>
                    <Typography variant="body1" color="text.secondary">
                        Управление вашей учетной записью и информацией
                    </Typography>
                </Box>

                <Grid container spacing={4}>
                    {/* Левая колонка - аватар и основная информация */}
                    <Grid item xs={12} md={4}>
                        <Card sx={{ height: "100%" }}>
                            <CardContent sx={{ display: "flex", flexDirection: "column", alignItems: "center", p: 4 }}>
                                {/* Аватар */}
                                <Avatar
                                    src={profile.avatar || undefined}
                                    sx={{
                                        width: 160,
                                        height: 160,
                                        mb: 3,
                                        border: "4px solid",
                                        borderColor: "primary.main",
                                        fontSize: 60,
                                    }}
                                >
                                    {profile.firstName?.[0] || profile.email?.[0] || <PersonIcon fontSize="large" />}
                                </Avatar>

                                {/* Полное имя */}
                                <Typography variant="h5" gutterBottom fontWeight="bold" align="center">
                                    {profile.firstName && profile.lastName ? `${profile.firstName} ${profile.lastName}` : profile.username || profile.email}
                                </Typography>

                                {/* Роль и статусы */}
                                <Stack direction="row" spacing={1} sx={{ mb: 3 }} flexWrap="wrap" justifyContent="center">
                                    {profile.isAdmin && <Chip icon={<AdminPanelSettingsIcon />} label="Администратор" color="primary" size="small" />}
                                    {profile.activated ? (
                                        <Chip icon={<VerifiedIcon />} label="Активирован" color="success" size="small" variant="outlined" />
                                    ) : (
                                        <Chip label="Не активирован" color="warning" size="small" variant="outlined" />
                                    )}
                                </Stack>

                                {/* Кнопка редактирования */}
                                <Button variant="outlined" startIcon={<EditIcon />} fullWidth sx={{ mt: 2 }}>
                                    Редактировать профиль
                                </Button>
                            </CardContent>
                        </Card>
                    </Grid>

                    {/* Правая колонка - детальная информация */}
                    <Grid item xs={12} md={8}>
                        <Card>
                            <CardContent sx={{ p: 4 }}>
                                <Typography variant="h6" gutterBottom fontWeight="bold" sx={{ mb: 3 }}>
                                    Информация профиля
                                </Typography>

                                <Grid container spacing={3}>
                                    {/* Основная информация */}
                                    <Grid item xs={12}>
                                        <Paper variant="outlined" sx={{ p: 3 }}>
                                            <Typography variant="subtitle1" gutterBottom fontWeight="bold" color="primary">
                                                Основная информация
                                            </Typography>
                                            <Grid container spacing={2}>
                                                <Grid item xs={12} sm={6}>
                                                    <Stack direction="row" spacing={2} alignItems="center">
                                                        <EmailIcon color="action" />
                                                        <Box>
                                                            <Typography variant="caption" color="text.secondary">
                                                                Email
                                                            </Typography>
                                                            <Typography variant="body1">{profile.email || "Не указан"}</Typography>
                                                        </Box>
                                                    </Stack>
                                                </Grid>
                                                <Grid item xs={12} sm={6}>
                                                    <Stack direction="row" spacing={2} alignItems="center">
                                                        <BadgeIcon color="action" />
                                                        <Box>
                                                            <Typography variant="caption" color="text.secondary">
                                                                Имя пользователя
                                                            </Typography>
                                                            <Typography variant="body1">{profile.username || "Не указан"}</Typography>
                                                        </Box>
                                                    </Stack>
                                                </Grid>

                                                <Grid item xs={12} sm={6}>
                                                    <Stack direction="row" spacing={2} alignItems="center">
                                                        <PersonIcon color="action" />
                                                        <Box>
                                                            <Typography variant="caption" color="text.secondary">
                                                                Роль
                                                            </Typography>
                                                            <Typography variant="body1">{profile.role || "Пользователь"}</Typography>
                                                        </Box>
                                                    </Stack>
                                                </Grid>
                                            </Grid>
                                        </Paper>
                                    </Grid>

                                    {/* Имя и фамилия */}
                                    {(profile.firstName || profile.lastName) && (
                                        <Grid item xs={12}>
                                            <Paper variant="outlined" sx={{ p: 3 }}>
                                                <Typography variant="subtitle1" gutterBottom fontWeight="bold" color="primary">
                                                    Личные данные
                                                </Typography>
                                                <Grid container spacing={2}>
                                                    <Grid item xs={12} sm={6}>
                                                        <Box>
                                                            <Typography variant="caption" color="text.secondary">
                                                                Имя
                                                            </Typography>
                                                            <Typography variant="body1">{profile.firstName || "Не указано"}</Typography>
                                                        </Box>
                                                    </Grid>
                                                    <Grid item xs={12} sm={6}>
                                                        <Box>
                                                            <Typography variant="caption" color="text.secondary">
                                                                Фамилия
                                                            </Typography>
                                                            <Typography variant="body1">{profile.lastName || "Не указано"}</Typography>
                                                        </Box>
                                                    </Grid>
                                                </Grid>
                                            </Paper>
                                        </Grid>
                                    )}

                                    {/* Даты */}
                                    <Grid item xs={12}>
                                        <Paper variant="outlined" sx={{ p: 3 }}>
                                            <Typography variant="subtitle1" gutterBottom fontWeight="bold" color="primary">
                                                Даты
                                            </Typography>
                                            <Grid container spacing={2}>
                                                <Grid item xs={12} sm={6}>
                                                    <Stack direction="row" spacing={2} alignItems="center">
                                                        <CalendarTodayIcon color="action" />
                                                        <Box>
                                                            <Typography variant="caption" color="text.secondary">
                                                                Дата регистрации
                                                            </Typography>
                                                            <Typography variant="body1">{formatDate(profile.createdAt)}</Typography>
                                                        </Box>
                                                    </Stack>
                                                </Grid>
                                                <Grid item xs={12} sm={6}>
                                                    <Stack direction="row" spacing={2} alignItems="center">
                                                        <UpdateIcon color="action" />
                                                        <Box>
                                                            <Typography variant="caption" color="text.secondary">
                                                                Последнее обновление
                                                            </Typography>
                                                            <Typography variant="body1">{formatDate(profile.updatedAt)}</Typography>
                                                        </Box>
                                                    </Stack>
                                                </Grid>
                                            </Grid>
                                        </Paper>
                                    </Grid>

                                    {/* Действия */}
                                    <Grid item xs={12}>
                                        <Paper variant="outlined" sx={{ p: 3 }}>
                                            <Typography variant="subtitle1" gutterBottom fontWeight="bold" color="primary">
                                                Действия с аккаунтом
                                            </Typography>
                                            <Stack direction="row" spacing={2} flexWrap="wrap" useFlexGap>
                                                <Button variant="contained" startIcon={<EditIcon />}>
                                                    Изменить пароль
                                                </Button>
                                                <Button variant="outlined" color="secondary">
                                                    Сменить email
                                                </Button>
                                                {!profile.activated && (
                                                    <Button variant="outlined" color="warning">
                                                        Активировать аккаунт
                                                    </Button>
                                                )}
                                                <Button variant="text" color="error">
                                                    Удалить аккаунт
                                                </Button>
                                            </Stack>
                                        </Paper>
                                    </Grid>

                                    {/* ID пользователя */}
                                    <Grid item xs={12}>
                                        <Paper variant="outlined" sx={{ p: 2, bgcolor: "grey.50" }}>
                                            <Typography variant="caption" color="text.secondary">
                                                ID пользователя: {profile.id}
                                            </Typography>
                                        </Paper>
                                    </Grid>
                                </Grid>
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>

                {/* Быстрые действия внизу */}
                <Box sx={{ mt: 4 }}>
                    <Typography variant="h6" gutterBottom>
                        Быстрые действия
                    </Typography>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6} md={3}>
                            <Button variant="outlined" fullWidth sx={{ height: 100 }}>
                                <Stack alignItems="center">
                                    <PersonIcon sx={{ fontSize: 30, mb: 1 }} />
                                    <Typography variant="body2">Личные данные</Typography>
                                </Stack>
                            </Button>
                        </Grid>
                        <Grid item xs={12} sm={6} md={3}>
                            <Button variant="outlined" fullWidth sx={{ height: 100 }}>
                                <Stack alignItems="center">
                                    <EmailIcon sx={{ fontSize: 30, mb: 1 }} />
                                    <Typography variant="body2">Настройки email</Typography>
                                </Stack>
                            </Button>
                        </Grid>
                        <Grid item xs={12} sm={6} md={3}>
                            <Button variant="outlined" fullWidth sx={{ height: 100 }}>
                                <Stack alignItems="center">
                                    <BadgeIcon sx={{ fontSize: 30, mb: 1 }} />
                                    <Typography variant="body2">Безопасность</Typography>
                                </Stack>
                            </Button>
                        </Grid>
                        <Grid item xs={12} sm={6} md={3}>
                            <Button variant="outlined" fullWidth sx={{ height: 100 }}>
                                <Stack alignItems="center">
                                    <AdminPanelSettingsIcon sx={{ fontSize: 30, mb: 1 }} />
                                    <Typography variant="body2">Привилегии</Typography>
                                </Stack>
                            </Button>
                        </Grid>
                    </Grid>
                </Box>
            </Box>
        </BaseMainWraper>
    );
};
