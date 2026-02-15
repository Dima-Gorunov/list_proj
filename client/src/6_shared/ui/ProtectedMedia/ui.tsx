import React, { useState, useEffect } from "react";
import { CardMedia, Box, CircularProgress, IconButton, Tooltip } from "@mui/material";
import VideoIcon from "@mui/icons-material/VideoLibrary";
import ImageIcon from "@mui/icons-material/Image";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";
import DownloadIcon from "@mui/icons-material/Download";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import { loadProtectedFile } from "../../api/instances";
import { IFileType } from "../../../5_entities/Files/types";
import { FILE_TYPES_CONST } from "../../constants";

interface ProtectedMediaProps {
    type: IFileType;
    src: string;
    name: string;
    height?: number;
    mayLoaded: boolean;
    fileName?: string; // Добавляем имя файла для отображения
    fileSize?: string; // Размер файла (опционально)
}

export const ProtectedMedia: React.FC<ProtectedMediaProps> = ({ type, src, name, height = 160, mayLoaded = false, fileName = "Файл", fileSize }) => {
    const [mediaSrc, setMediaSrc] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<boolean>(false);
    const [isImageLoaded, setIsImageLoaded] = useState<boolean>(false);
    const [isVideoLoaded, setIsVideoLoaded] = useState<boolean>(false);

    // Загружаем медиа только для изображений и видео
    useEffect(() => {
        if (!mayLoaded || type === FILE_TYPES_CONST.files) {
            return;
        }

        let isMounted = true;
        let objectUrl: string | null = null;

        const loadMedia = async () => {
            try {
                setLoading(true);
                setError(false);
                objectUrl = await loadProtectedFile(src);

                if (isMounted) {
                    setMediaSrc(objectUrl);
                    if (type === FILE_TYPES_CONST.images) {
                        setIsImageLoaded(true);
                    } else if (type === FILE_TYPES_CONST.videos) {
                        setIsVideoLoaded(true);
                    }
                }
            } catch (error) {
                console.error(`Error loading ${type}:`, error);
                if (isMounted) {
                    setError(true);
                }
            } finally {
                if (isMounted) {
                    setLoading(false);
                }
            }
        };

        loadMedia();

        return () => {
            isMounted = false;
            if (objectUrl) {
                URL.revokeObjectURL(objectUrl);
            }
        };
    }, [src, type, mayLoaded]);

    // Функция для загрузки файла по клику
    const handleDownloadFile = async () => {
        try {
            setLoading(true);
            const fileUrl = await loadProtectedFile(src);

            // Создаем временную ссылку для скачивания
            const link = document.createElement("a");
            link.href = fileUrl;
            link.download = name || "download";
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);

            // Освобождаем URL после загрузки
            setTimeout(() => {
                URL.revokeObjectURL(fileUrl);
            }, 100);
        } catch (error) {
            console.error("Error downloading file:", error);
            setError(true);
        } finally {
            setLoading(false);
        }
    };

    // Получаем иконку для типа файла
    const getFileIcon = () => {
        const fileExtension = name.split(".").pop()?.toLowerCase();

        // Иконки для разных типов файлов
        const iconStyle = { fontSize: 48, color: "grey.400" };

        switch (fileExtension) {
            case "pdf":
                return <span style={{ fontSize: 48 }}>📄</span>;
            case "doc":
            case "docx":
                return <span style={{ fontSize: 48 }}>📝</span>;
            case "xls":
            case "xlsx":
                return <span style={{ fontSize: 48 }}>📊</span>;
            case "zip":
            case "rar":
            case "7z":
                return <span style={{ fontSize: 48 }}>📦</span>;
            case "txt":
                return <span style={{ fontSize: 48 }}>📃</span>;
            default:
                return <InsertDriveFileIcon sx={iconStyle} />;
        }
    };

    // Отображаем информацию о файле
    const renderFileInfo = () => (
        <Box
            sx={{
                textAlign: "center",
                maxWidth: "100%",
                wordBreak: "break-word",
                px: 1,
            }}
        >
            <Box sx={{ fontSize: "0.875rem", fontWeight: 500, mb: 0.5 }}>{name}</Box>
            {fileSize && (
                <Box
                    sx={{
                        fontSize: "0.75rem",
                        color: "grey.600",
                        mb: 1,
                    }}
                >
                    {fileSize}
                </Box>
            )}
        </Box>
    );

    if (loading && type !== FILE_TYPES_CONST.files) {
        return (
            <Box
                sx={{
                    height,
                    bgcolor: "grey.100",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                }}
            >
                <CircularProgress size={24} />
            </Box>
        );
    }

    if (error) {
        return (
            <Box
                sx={{
                    height,
                    bgcolor: "grey.100",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexDirection: "column",
                    gap: 1,
                }}
            >
                <ErrorOutlineIcon sx={{ fontSize: 48, color: "grey.400" }} />
                <span style={{ fontSize: "0.875rem", color: "grey.600" }}>
                    {type === FILE_TYPES_CONST.images && "Не удалось загрузить изображение"}
                    {type === FILE_TYPES_CONST.videos && "Не удалось загрузить видео"}
                    {type === FILE_TYPES_CONST.files && "Не удалось загрузить файл"}
                </span>
            </Box>
        );
    }

    // Для файлов - только иконка без предзагрузки
    if (type === FILE_TYPES_CONST.files) {
        return (
            <Box
                sx={{
                    height,
                    bgcolor: "grey.50",
                    border: "1px solid",
                    borderColor: "grey.200",
                    borderRadius: 1,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    p: 2,
                    gap: 1.5,
                    transition: "all 0.2s ease",
                    "&:hover": {
                        bgcolor: "grey.100",
                        borderColor: "grey.300",
                    },
                    position: "relative",
                }}
            >
                {getFileIcon()}
                {renderFileInfo()}

                <Tooltip title="Скачать файл">
                    <IconButton
                        onClick={handleDownloadFile}
                        sx={{
                            position: "absolute",
                            bottom: 8,
                            right: 8,
                            bgcolor: "primary.main",
                            color: "white",
                            "&:hover": {
                                bgcolor: "primary.dark",
                            },
                            width: 32,
                            height: 32,
                        }}
                        disabled={loading}
                    >
                        {loading ? <CircularProgress size={16} color="inherit" /> : <DownloadIcon sx={{ fontSize: 18 }} />}
                    </IconButton>
                </Tooltip>

                <Box
                    sx={{
                        position: "absolute",
                        top: 8,
                        right: 8,
                        bgcolor: "grey.200",
                        color: "grey.700",
                        px: 1,
                        py: 0.25,
                        borderRadius: 1,
                        fontSize: "0.7rem",
                        fontWeight: 500,
                    }}
                >
                    ФАЙЛ
                </Box>
            </Box>
        );
    }

    if (type === FILE_TYPES_CONST.images && isImageLoaded) {
        return (
            <CardMedia
                component="img"
                image={mediaSrc}
                alt={name}
                sx={{
                    height,
                    bgcolor: "grey.100",
                    objectFit: "contain",
                }}
                onError={() => setError(true)}
            />
        );
    }

    if (type === FILE_TYPES_CONST.videos && isVideoLoaded) {
        return (
            <Box
                sx={{
                    height,
                    bgcolor: "grey.100",
                    position: "relative",
                    overflow: "hidden",
                }}
            >
                <video
                    src={mediaSrc}
                    style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "contain",
                    }}
                    controls={false}
                    muted
                    onError={() => setError(true)}
                />
                <Box
                    sx={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        bgcolor: "rgba(0,0,0,0.3)",
                    }}
                >
                    <VideoIcon sx={{ fontSize: 48, color: "white" }} />
                </Box>
                <Box
                    sx={{
                        position: "absolute",
                        bottom: 8,
                        right: 8,
                        bgcolor: "rgba(0,0,0,0.7)",
                        color: "white",
                        px: 1,
                        py: 0.5,
                        borderRadius: 1,
                        fontSize: "0.75rem",
                    }}
                >
                    Видео
                </Box>
            </Box>
        );
    }

    // Плейсхолдеры для изображений и видео (когда mayLoaded = false)
    if (!mayLoaded) {
        return (
            <Box
                sx={{
                    height,
                    bgcolor: "grey.100",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexDirection: "column",
                    gap: 1,
                }}
            >
                {type === FILE_TYPES_CONST.images && (
                    <>
                        <ImageIcon sx={{ fontSize: 48, color: "grey.400" }} />
                        <span style={{ fontSize: "0.875rem", color: "grey.600" }}>Изображение</span>
                    </>
                )}
                {type === FILE_TYPES_CONST.videos && (
                    <>
                        <VideoIcon sx={{ fontSize: 48, color: "grey.400" }} />
                        <span style={{ fontSize: "0.875rem", color: "grey.600" }}>Видео</span>
                    </>
                )}
                {type === FILE_TYPES_CONST.files && (
                    <>
                        <InsertDriveFileIcon sx={{ fontSize: 48, color: "grey.400" }} />
                        <span style={{ fontSize: "0.875rem", color: "grey.600" }}>Файл</span>
                    </>
                )}
            </Box>
        );
    }

    return null;
};
