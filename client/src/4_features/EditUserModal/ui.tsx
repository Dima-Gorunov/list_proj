import React, { useState, useEffect } from "react";
import { Modal, Box, TextField, Select, MenuItem, Button, Typography, FormControlLabel, Checkbox } from "@mui/material";
import { IUser } from "../../5_entities/Users/types";
import { FRONT_ROLES_STR } from "../../6_shared/constants";
import { useAppDispatch } from "../../1_app/model/hooks";
import { changeUserThunk } from "../../5_entities/Users/UsersSlice";
import { CheckBox } from "@mui/icons-material";

interface EditUserModalProps {
    open: boolean;
    user: IUser | null;
    onClose: () => void;
}

export const EditUserModal: React.FC<EditUserModalProps> = ({ open, user, onClose }) => {
    const dispatch = useAppDispatch();
    const [editUser, setEditUser] = useState<IUser | null>(null);

    useEffect(() => {
        if (user) {
            setEditUser({ ...user });
        }
    }, [user]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!editUser) return;
        setEditUser({
            ...editUser,
            [e.target.name]: e.target.value,
        });
    };

    const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>, checked: boolean) => {
        if (!editUser) return;
        setEditUser({
            ...editUser,
            [e.target.name]: checked,
        });
    };

    const handleRoleChange = (e: any) => {
        if (!editUser) return;
        setEditUser({
            ...editUser,
            role: e.target.value,
            isAdmin: e.target.value === "ADMIN",
        });
    };

    const handleSave = () => {
        if (!editUser) return;
        dispatch(changeUserThunk(editUser)).then((res) => {
            if (res.meta.requestStatus === "fulfilled") {
                onClose();
            }
        });
    };

    if (!editUser) return null;

    return (
        <Modal open={open} onClose={onClose}>
            <Box
                sx={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    width: 400,
                    bgcolor: "background.paper",
                    boxShadow: 24,
                    p: 4,
                }}
            >
                <Typography variant="h6" gutterBottom>
                    Id: {user?.id}
                </Typography>
                <Typography variant="h6" gutterBottom sx={{ overflowWrap: "anywhere" }}>
                    Edit User: {user?.email}
                </Typography>

                <TextField fullWidth label="Email" name="email" disabled value={editUser.email || ""} onChange={handleInputChange} margin="normal" />

                <TextField fullWidth label="Username" name="username" value={editUser.username || ""} onChange={handleInputChange} margin="normal" />

                <TextField fullWidth label="First Name" name="firstName" value={editUser.firstName || ""} onChange={handleInputChange} margin="normal" />

                <TextField fullWidth label="Last Name" name="lastName" value={editUser.lastName || ""} onChange={handleInputChange} margin="normal" />

                <FormControlLabel
                    control={<Checkbox checked={editUser.activated} onChange={handleCheckboxChange} name="activated" color="primary" />}
                    label={"Activated"}
                />

                <Select fullWidth value={editUser.role || "-"} onChange={handleRoleChange} margin="dense" sx={{ mt: 2, mb: 2 }}>
                    <MenuItem value={FRONT_ROLES_STR.USER}>{FRONT_ROLES_STR.USER}</MenuItem>
                    <MenuItem value={FRONT_ROLES_STR.ADMIN}>{FRONT_ROLES_STR.ADMIN}</MenuItem>
                </Select>

                <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 2, mt: 3 }}>
                    <Button onClick={onClose}>Cancel</Button>
                    <Button variant="contained" onClick={handleSave}>
                        Save
                    </Button>
                </Box>
            </Box>
        </Modal>
    );
};
