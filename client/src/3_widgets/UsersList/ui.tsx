import { Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TablePagination, IconButton, Typography } from "@mui/material";
import { useAppSelector } from "../../1_app/model/hooks";
import { getAllUsersSelector } from "../../5_entities/Users/selectors";
import { useEffect, useState } from "react";
import { EditUserModal } from "../../4_features";
import { IUser } from "../../5_entities/Users/types";
import { Button } from "../../6_shared";
import { Edit } from "@mui/icons-material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { FRONT_ROLES_STR } from "../../6_shared/constants";

export const UsersList: React.FC = () => {
    const users = useAppSelector(getAllUsersSelector);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [modalopen, setModalopen] = useState(false);
    const [activeUser, setActiveUser] = useState<IUser>(null);

    const handleRowClick = (user: IUser) => {
        setActiveUser(user);
        setModalopen(true);
    };

    const handleCloseModal = () => {
        setActiveUser(null);
        setModalopen(false);
    };

    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    // Рассчитываем пользователей для текущей страницы
    const paginatedUsers = users.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

    if (!users || users.length === 0) {
        return (
            <Typography variant="h3" component="h1" align="center" sx={{ mt: 2 }}>
                Нет пользователей
            </Typography>
        );
    }

    return (
        <>
            <Paper sx={{ width: "100%", height: "100%", overflow: "hidden", position: "relative" }}>
                <TableContainer sx={{ height: "93%" }}>
                    <Table sx={{ overflow: "auto" }} stickyHeader>
                        <TableHead>
                            <TableRow>
                                <TableCell></TableCell>
                                <TableCell>ID</TableCell>
                                <TableCell>Username</TableCell>
                                <TableCell>Email</TableCell>
                                <TableCell>Имя</TableCell>
                                <TableCell>Фамилия</TableCell>
                                <TableCell>Роль</TableCell>
                                <TableCell>Активирован</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {paginatedUsers.map((user) => (
                                <TableRow
                                    sx={{
                                        ":hover": {
                                            cursor: "pointer",
                                        },
                                    }}
                                    key={user.id}
                                >
                                    <TableCell>
                                        <Box sx={{ display: "flex", gap: 1 }}>
                                            {/* Иконка редактирования (карандаш) */}
                                            <IconButton
                                                size="small"
                                                onClick={(e) => {
                                                    e.stopPropagation(); // Предотвращаем всплытие события
                                                    handleRowClick(user);
                                                }}
                                            >
                                                <EditIcon fontSize="small" />
                                            </IconButton>

                                            {/* Иконка удаления (красная корзина) */}
                                            <IconButton
                                                size="small"
                                                onClick={(e) => {
                                                    e.stopPropagation(); // Предотвращаем всплытие события
                                                    // handleDeleteUser(user);
                                                }}
                                            >
                                                <DeleteIcon fontSize="small" />
                                            </IconButton>
                                        </Box>
                                    </TableCell>
                                    <TableCell>{user.id}</TableCell>
                                    <TableCell>{user.username}</TableCell>
                                    <TableCell sx={{ maxWidth: "150px", overflowWrap: "anywhere" }}>{user.email}</TableCell>
                                    <TableCell>{user.firstName || "-"}</TableCell>
                                    <TableCell>{user.lastName || "-"}</TableCell>
                                    <TableCell sx={{ color: user.role === FRONT_ROLES_STR.ADMIN ? "error.main" : "" }}>{user.role}</TableCell>
                                    <TableCell sx={{ color: user.activated ? "success.main" : "error.main" }}>{user.activated ? "Да" : "Нет"}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    sx={{
                        position: "absolute",
                        bottom: "20px",
                        right: "30px",
                        height: "6%",
                    }}
                    rowsPerPageOptions={[5, 10, 25]}
                    component="div"
                    count={users.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </Paper>
            <EditUserModal open={modalopen} user={activeUser} onClose={() => handleCloseModal()} />
        </>
    );
};
