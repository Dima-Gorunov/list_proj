import {
    Box,
    Button,
    Card,
    CardContent,
    Checkbox,
    Chip,
    CircularProgress,
    Fade,
    Grid,
    IconButton,
    Stack,
    Typography,
    useMediaQuery,
    useTheme,
} from "@mui/material";
import {
    CloudUpload as CloudUploadIcon,
    AddPhotoAlternate as ImageIcon,
    Videocam as VideoIcon,
    Download as DownloadIcon,
    Share as ShareIcon,
    CalendarToday as CalendarIcon,
} from "@mui/icons-material";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";
import React, { DragEvent, useEffect } from "react";
import { IFile } from "../../5_entities/Files/types";
import { ProtectedMedia } from "../../6_shared";
import { FILE_TYPES_CONST } from "../../6_shared/constants";
import { CustomFade } from "../../4_features";

export const MediaList: React.FC<{
    mediaFiles: IFile[];
    selectedFiles: number[];
    handleSelectFile: (id: number) => void;
    handleDownloadSelectedOnce: (id: number) => void;
    isDragOver: boolean;
    fileInputRef: React.MutableRefObject<HTMLInputElement>;
    handleDragOver: (e: DragEvent<HTMLDivElement>) => void;
    handleDragLeave: (e: DragEvent<HTMLDivElement>) => void;
    handleDrop: (e: DragEvent<HTMLDivElement>) => void;
}> = ({ mediaFiles, selectedFiles, handleSelectFile, handleDownloadSelectedOnce, isDragOver, fileInputRef, handleDragLeave, handleDragOver, handleDrop }) => {
    const theme = useTheme();

    // Отслеживаем все брейкпоинты
    const isXs = useMediaQuery(theme.breakpoints.down("sm"));
    const isSm = useMediaQuery(theme.breakpoints.between("sm", "md"));
    const isMd = useMediaQuery(theme.breakpoints.between("md", "lg"));
    const isLg = useMediaQuery(theme.breakpoints.up("lg"));

    // Определяем количество колонок
    const getColumnsCount = () => {
        if (isXs) return 1;
        if (isSm) return 2;
        if (isMd) return 3;
        if (isLg) return 4;
        return 4;
    };

    // Логируем при каждом изменении
    useEffect(() => {
        const columns = getColumnsCount();
        let breakpoint = "lg";
        if (isXs) breakpoint = "xs";
        else if (isSm) breakpoint = "sm";
        else if (isMd) breakpoint = "md";

        console.log(`🔄 Grid изменился: ${columns} колонки (${breakpoint}) - ${window.innerWidth}px`);
    }, [isXs, isSm, isMd, isLg]);

    return (
        <>
            <Box
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                sx={{
                    position: "relative",
                    minHeight: 300,
                    flex: 1,
                    overflow: "auto",
                }}
            >
                {/* Блок для перетаскивания - показывается когда нет файлов или при перетаскивании */}
                <CustomFade fileInputRef={fileInputRef} isDragOver={isDragOver} mediaFiles={mediaFiles} />
                {mediaFiles.length > 0 && (
                    <Fade in={mediaFiles.length > 0 && !isDragOver}>
                        <Grid container spacing={3} sx={{ position: "absolute", top: 0 }}>
                            {mediaFiles.map((file) => (
                                <Grid item xs={12} sm={6} md={4} lg={3} key={file.id}>
                                    <Card
                                        onClick={() => handleSelectFile(file.id)}
                                        sx={{
                                            position: "relative",
                                            cursor: "pointer",
                                            "&:hover": {
                                                boxShadow: 4,
                                                "& .file-actions": {
                                                    opacity: 1,
                                                },
                                                "& .selected-action": {
                                                    opacity: 1,
                                                },
                                            },
                                        }}
                                    >
                                        <Checkbox
                                            className="selected-action"
                                            checked={selectedFiles.includes(file.id)}
                                            sx={{
                                                position: "absolute",
                                                transition: "opacity 0.3s",
                                                opacity: selectedFiles.includes(file.id) ? 1 : 0,
                                                top: 8,
                                                left: 8,
                                                zIndex: 2,
                                                bgcolor: "background.paper",
                                                borderRadius: 1,
                                                ":hover": {
                                                    bgcolor: "background.paper",
                                                },
                                            }}
                                        />
                                        <Box className="file-actions" sx={{ position: "absolute", top: 8, right: 8, opacity: 0, transition: "opacity 0.3s" }}>
                                            <IconButton
                                                size="small"
                                                sx={{
                                                    bgcolor: "background.paper",
                                                    mr: 1,
                                                    ":hover": {
                                                        bgcolor: "background.paper",
                                                    },
                                                }}
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    e.preventDefault();
                                                    handleDownloadSelectedOnce(file.id);
                                                }}
                                            >
                                                <DownloadIcon fontSize="small" />
                                            </IconButton>
                                            <IconButton
                                                size="small"
                                                sx={{
                                                    bgcolor: "background.paper",
                                                    ":hover": {
                                                        bgcolor: "background.paper",
                                                    },
                                                }}
                                            >
                                                <ShareIcon fontSize="small" />
                                            </IconButton>
                                        </Box>

                                        {/* Для media */}
                                        {<ProtectedMedia mayLoaded={true} type={file.type} src={file.url} name={file.name} />}

                                        <CardContent sx={{ pt: 2, pb: "16px !important" }}>
                                            <Typography variant="subtitle2" noWrap title={file.name}>
                                                {file.name}
                                            </Typography>
                                            <Stack direction="row" justifyContent="space-between" alignItems="center" mt={1}>
                                                {file.type === FILE_TYPES_CONST.images && (
                                                    <Chip icon={<ImageIcon />} label={"Фото"} size="small" variant="outlined" />
                                                )}
                                                {file.type === FILE_TYPES_CONST.videos && (
                                                    <Chip icon={<VideoIcon />} label={"Видео"} size="small" variant="outlined" />
                                                )}
                                                {file.type === FILE_TYPES_CONST.files && (
                                                    <Chip icon={<InsertDriveFileIcon />} label={"Файл"} size="small" variant="outlined" />
                                                )}

                                                <Typography variant="caption" color="text.secondary">
                                                    {file.size}
                                                </Typography>
                                            </Stack>
                                            <Typography variant="caption" color="text.secondary" display="block" mt={1}>
                                                <CalendarIcon sx={{ fontSize: 12, verticalAlign: "middle", mr: 0.5 }} />
                                                {file.createdAt}
                                            </Typography>
                                        </CardContent>
                                    </Card>
                                </Grid>
                            ))}
                        </Grid>
                    </Fade>
                )}
            </Box>
        </>
    );
};
