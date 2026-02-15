import React, { useState, useEffect } from "react";
import { Modal, Box, TextField, Select, MenuItem, Button, Typography, FormControlLabel, Checkbox, Fade } from "@mui/material";
import { CloudUpload as CloudUploadIcon } from "@mui/icons-material";
import { IFile } from "../../5_entities/Files/types";

export const CustomFade: React.FC<{ mediaFiles: IFile[]; isDragOver: boolean; fileInputRef: React.MutableRefObject<HTMLInputElement> }> = ({
    mediaFiles,
    isDragOver,
    fileInputRef,
}) => {
    return (
        <Fade in={mediaFiles.length === 0 || isDragOver}>
            <Box
                onClick={() => fileInputRef.current?.click()}
                sx={{
                    border: "2px dashed",
                    borderColor: isDragOver ? "primary.main" : mediaFiles.length === 0 ? "grey.300" : "transparent",
                    borderRadius: 2,
                    p: mediaFiles.length === 0 ? 8 : 4,
                    textAlign: "center",
                    cursor: "pointer",
                    bgcolor: isDragOver ? "action.hover" : mediaFiles.length === 0 ? "transparent" : "rgba(0,0,0,0.02)",
                    transition: "all 0.3s",
                    minHeight: "100%",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    position: "sticky",
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    zIndex: 2,
                    backdropFilter: mediaFiles.length > 0 && isDragOver ? "blur(2px)" : "none",
                    ...(isDragOver && {
                        "&::before": {
                            // content: '""',
                            // position: "absolute",
                            // top: 0,
                            // left: 0,
                            // right: 0,
                            // bottom: 0,
                            // bgcolor: "rgba(59, 172, 116, 0.1)",
                            // border: "4px dashed",
                            // borderColor: "primary.main",
                            // borderRadius: 2,
                            // zIndex: 1,
                            // pointerEvents: "none",
                        },
                    }),
                }}
            >
                <CloudUploadIcon
                    sx={{
                        fontSize: mediaFiles.length === 0 ? 60 : 40,
                        color: isDragOver ? "primary.main" : "grey.400",
                        mb: 2,
                        pointerEvents: "none",
                    }}
                />
                <Typography sx={{ pointerEvents: "none" }} variant={mediaFiles.length === 0 ? "h6" : "body1"} gutterBottom>
                    {"Отпустите для загрузки"}
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 3, pointerEvents: "none" }}>
                    или нажмите для выбора файлов
                </Typography>
            </Box>
        </Fade>
    );
};
