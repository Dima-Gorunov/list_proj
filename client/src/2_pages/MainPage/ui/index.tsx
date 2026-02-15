import { FC, useState, useRef, useCallback, DragEvent, useEffect } from "react";
import {
    Box,
    Typography,
    Grid,
    Card,
    CardContent,
    CardMedia,
    IconButton,
    Checkbox,
    Chip,
    Stack,
    TextField,
    MenuItem,
    Button as MuiButton,
    Divider,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Alert,
    Paper,
    LinearProgress,
    Tooltip,
    Fab,
    Fade,
    useTheme,
    useMediaQuery,
} from "@mui/material";
import {
    CloudUpload as CloudUploadIcon,
    AddPhotoAlternate as ImageIcon,
    Videocam as VideoIcon,
    Delete as DeleteIcon,
    Download as DownloadIcon,
    Share as ShareIcon,
    Add as AddIcon,
    Folder as FolderIcon,
    CalendarToday as CalendarIcon,
    CheckBox as CheckBoxIcon,
    CheckBoxOutlineBlank as CheckBoxOutlineBlankIcon,
    DragIndicator as DragIndicatorIcon,
} from "@mui/icons-material";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";
import { BaseMainWraper, Loader, ProtectedMedia } from "../../../6_shared";
import { useAppDispatch, useAppSelector } from "../../../1_app/model/hooks";
import { getProfileSelector } from "../../../5_entities/Profile/selectors";
import { ActivatedWait, MediaList } from "../../../3_widgets";
import { deletefilesThunk, getMyFilesThunk, uploadFileThunk } from "../../../5_entities/Files/FilesSlice";
import { getProfileFilesLoadingSelector, getProfileFilesSelector } from "../../../5_entities/Files/selectors";
import { FILE_TYPES_CONST } from "../../../6_shared/constants";
import { IFile, IFileType } from "../../../5_entities/Files/types";
import { formatBytesToMB } from "../../../6_shared/helpers/sizeHelpers";
import { CustomFade } from "../../../4_features";

// Типы для медиафайлов
interface MediaFile {
    id: string;
    name: string;
    type: IFileType;
    url: string;
    size: string;
    uploadedAt: string;
    tags: string[];
}

export const MainPage: FC = () => {
    const dispatch = useAppDispatch();
    const profile = useAppSelector(getProfileSelector);
    const mediaFiles = useAppSelector(getProfileFilesSelector);
    const profileFilesLoading = useAppSelector(getProfileFilesLoadingSelector);

    const [selectedFiles, setSelectedFiles] = useState<number[]>([]);
    const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
    const [filterType, setFilterType] = useState<"all" | IFileType>("all");
    const [sortBy, setSortBy] = useState<"date" | "name" | "size">("date");
    const [uploadDialogOpen, setUploadDialogOpen] = useState(false);
    const [resultUploadFiles, setResultUploadFiles] = useState<{ name: string; success: boolean }[]>([]);
    const [mayloadedIds, setMayloadedIds] = useState<number[]>([]);
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [uploadProgress, setUploadProgress] = useState(0);
    const [isUploading, setIsUploading] = useState(false);
    const [isDragOver, setIsDragOver] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleDragOver = useCallback((e: DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setIsDragOver(true);
    }, []);

    const handleDragLeave = useCallback((e: DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setIsDragOver(false);
    }, []);

    const handleDrop = useCallback((e: DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setIsDragOver(false);

        const files = Array.from(e.dataTransfer.files);
        if (files.length > 0) {
            handleUpload(files);
        }
    }, []);

    const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files;
        if (files && files.length > 0) {
            handleUpload(Array.from(files));
            // Сбрасываем значение input чтобы можно было выбрать те же файлы снова
            if (fileInputRef.current) {
                fileInputRef.current.value = "";
            }
        }
    };

    const handleUpload = async (files: File[]) => {
        setUploadDialogOpen(true);
        setIsUploading(true);
        setUploadProgress(0);

        // Если нет файлов, выходим
        if (!files || files.length === 0) {
            setIsUploading(false);
            setUploadDialogOpen(false);
            return;
        }

        // Для отслеживания прогресса каждого файла
        const totalFiles = files.length;
        const stepCount = Math.floor(100 / totalFiles);
        try {
            // Обрабатываем файлы последовательно
            for (let i = 0; i < files.length; i++) {
                const file = files[i];
                dispatch(uploadFileThunk(file)).then((res) => {
                    if (res.meta.requestStatus === "fulfilled") {
                        setResultUploadFiles((prev) => [...prev, { name: file.name, success: true }]);
                    }
                    if (res.meta.requestStatus === "rejected") {
                        setResultUploadFiles((prev) => [...prev, { name: file.name, success: false }]);
                    }
                    if (i === files.length - 1) {
                        setUploadProgress(100);
                    } else {
                        setUploadProgress((prev) => prev + stepCount);
                    }
                });
            }
        } catch (error) {
            console.error("Общая ошибка загрузки:", error);
        } finally {
        }
    };

    const handleSelectFile = (id: number) => {
        setSelectedFiles((prev) => (prev.includes(id) ? prev.filter((fileId) => fileId !== id) : [...prev, id]));
    };

    const handleSelectAll = () => {
        if (selectedFiles.length === mediaFiles.length) {
            setSelectedFiles([]);
        } else {
            setSelectedFiles(mediaFiles.map((file) => file.id));
        }
    };

    const handleDeleteSelected = () => {
        console.log("Удаление выбранных файлов:", selectedFiles);
        dispatch(deletefilesThunk(selectedFiles));
        setDeleteDialogOpen(false);
    };

    const handleDownloadSelected = () => {
        console.log("Скачивание выбранных файлов:", selectedFiles);
        alert(`Скачивание ${selectedFiles.length} файлов...`);
    };

    const handleDownloadSelectedOnce = (id: number) => {
        const findItem = mediaFiles.find((item) => item.id === id);
        console.log("Скачивание файла:", findItem);
        alert(`Скачивание файла`);
    };

    const handleShareSelected = () => {
        console.log("Поделиться выбранными файлами:", selectedFiles);
        alert(`Поделиться ${selectedFiles.length} файлами...`);
    };
    const storageUsed = mediaFiles.reduce((acc, file) => {
        const size = parseFloat(file.size);
        return acc + (isNaN(size) ? 0 : size);
    }, 0);

    const storageLimitByte = 1073741824; // 1 Gb

    useEffect(() => {
        if (!uploadDialogOpen) {
            setResultUploadFiles([]);
        }
    }, [uploadDialogOpen]);
    useEffect(() => {
        dispatch(getMyFilesThunk());
    }, []);

    if (!profile?.activated) {
        return <ActivatedWait />;
    }

    if (profileFilesLoading) {
        return <Loader />;
    }

    return (
        <BaseMainWraper>
            <Box sx={{ display: "flex", flexDirection: "column", overflow: "hidden", flex: 1 }}>
                {/* Хедер с информацией о хранилище */}
                <Paper
                    elevation={0}
                    sx={{
                        p: 3,
                        mb: 4,
                        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                        color: "white",
                        borderRadius: 2,
                    }}
                >
                    <Grid container alignItems="center" spacing={3}>
                        <Grid item xs={12} md={8}>
                            <Typography variant="h4" gutterBottom fontWeight="bold">
                                Облачное хранилище медиафайлов
                            </Typography>
                            <Typography variant="body1" sx={{ mb: 2, opacity: 0.9 }}>
                                Загружайте, храните и управляйте вашими фотографиями и видео в безопасном облаке. Доступ к вашим файлам с любого устройства в
                                любое время.
                            </Typography>
                            <Stack direction="row" spacing={2} alignItems="center">
                                <Chip
                                    icon={<ImageIcon />}
                                    label={`${mediaFiles.filter((f) => f.type === FILE_TYPES_CONST.images).length} фото`}
                                    sx={{ background: "rgba(255,255,255,0.2)", color: "white" }}
                                />
                                <Chip
                                    icon={<VideoIcon />}
                                    label={`${mediaFiles.filter((f) => f.type === FILE_TYPES_CONST.videos).length} видео`}
                                    sx={{ background: "rgba(255,255,255,0.2)", color: "white" }}
                                />
                                <Chip
                                    icon={<InsertDriveFileIcon />}
                                    label={`${mediaFiles.filter((f) => f.type === FILE_TYPES_CONST.files).length} файлы`}
                                    sx={{ background: "rgba(255,255,255,0.2)", color: "white" }}
                                />
                                <Chip
                                    icon={<FolderIcon />}
                                    label={`Всего ${mediaFiles.length} элементов`}
                                    sx={{ background: "rgba(255,255,255,0.2)", color: "white" }}
                                />
                            </Stack>
                        </Grid>
                        <Grid item xs={12} md={4}>
                            <Box sx={{ background: "rgba(255,255,255,0.1)", p: 2, borderRadius: 2 }}>
                                <Typography variant="subtitle2" gutterBottom>
                                    Использовано хранилища
                                </Typography>
                                <LinearProgress
                                    variant="determinate"
                                    value={(100 * storageUsed) / storageLimitByte}
                                    sx={{ height: 8, borderRadius: 4, mb: 1 }}
                                />
                                <Typography variant="body2">
                                    {formatBytesToMB(storageUsed)} из {formatBytesToMB(storageLimitByte)}
                                </Typography>
                            </Box>
                        </Grid>
                    </Grid>
                </Paper>

                {/* Панель управления */}
                <Paper sx={{ p: 2, mb: 3 }}>
                    <Grid container alignItems="center" spacing={2}>
                        <Grid item xs={12} md={8}>
                            <Stack direction="row" spacing={2} alignItems="center" flexWrap="wrap">
                                <Checkbox
                                    icon={<CheckBoxOutlineBlankIcon />}
                                    checkedIcon={<CheckBoxIcon />}
                                    checked={selectedFiles.length > 0 && selectedFiles.length === mediaFiles.length}
                                    indeterminate={selectedFiles.length > 0 && selectedFiles.length < mediaFiles.length}
                                    onChange={handleSelectAll}
                                />
                                <Typography variant="body2" color="text.secondary">
                                    Выбрано: {selectedFiles.length}
                                </Typography>

                                {selectedFiles.length > 0 && (
                                    <>
                                        <Divider orientation="vertical" flexItem />
                                        <Tooltip title="Скачать">
                                            <IconButton onClick={handleDownloadSelected} size="small">
                                                <DownloadIcon />
                                            </IconButton>
                                        </Tooltip>
                                        <Tooltip title="Поделиться">
                                            <span>
                                                <IconButton disabled onClick={handleShareSelected} size="small">
                                                    <ShareIcon />
                                                </IconButton>
                                            </span>
                                        </Tooltip>
                                        <Tooltip title="Удалить">
                                            <IconButton onClick={() => setDeleteDialogOpen(true)} size="small" color="error">
                                                <DeleteIcon />
                                            </IconButton>
                                        </Tooltip>
                                    </>
                                )}
                            </Stack>
                        </Grid>
                        <Grid item xs={12} md={4}>
                            <Stack direction="row" spacing={1} justifyContent="flex-end">
                                <TextField select size="small" value={filterType} onChange={(e) => setFilterType(e.target.value as any)} sx={{ minWidth: 120 }}>
                                    <MenuItem value="all">Все файлы</MenuItem>
                                    <MenuItem value={FILE_TYPES_CONST.images}>Только фото</MenuItem>
                                    <MenuItem value={FILE_TYPES_CONST.videos}>Только видео</MenuItem>
                                    <MenuItem value={FILE_TYPES_CONST.files}>Только файлы</MenuItem>
                                </TextField>
                                <TextField select size="small" value={sortBy} onChange={(e) => setSortBy(e.target.value as any)} sx={{ minWidth: 140 }}>
                                    <MenuItem value="date">По дате</MenuItem>
                                    <MenuItem value="name">По имени</MenuItem>
                                    <MenuItem value="size">По размеру</MenuItem>
                                </TextField>
                            </Stack>
                        </Grid>
                    </Grid>
                </Paper>

                {/* Основная область для перетаскивания и отображения файлов */}
                <MediaList
                    fileInputRef={fileInputRef}
                    handleDownloadSelectedOnce={handleDownloadSelectedOnce}
                    handleSelectFile={handleSelectFile}
                    handleDragLeave={handleDragLeave}
                    handleDragOver={handleDragOver}
                    handleDrop={handleDrop}
                    mediaFiles={mediaFiles}
                    selectedFiles={selectedFiles}
                    isDragOver={isDragOver}
                />

                {/* Кнопка добавления файлов */}
                <Fab
                    color="primary"
                    sx={{
                        position: "fixed",
                        bottom: 32,
                        right: 32,
                    }}
                    onClick={() => fileInputRef.current?.click()}
                >
                    <AddIcon />
                </Fab>

                <input type="file" ref={fileInputRef} style={{ display: "none" }} multiple accept="image/*,video/*" onChange={handleFileSelect} />

                {/* Диалог загрузки */}
                <Dialog
                    open={uploadDialogOpen}
                    sx={{
                        p: 2,
                    }}
                    PaperProps={{
                        sx: { width: "100%", height: "100%", maxHeight: "700px" },
                    }}
                    onClose={() => {
                        if (!isUploading) {
                            setUploadDialogOpen(false);
                        }
                    }}
                >
                    <DialogTitle sx={{ m: "auto" }}>Загрузка файлов</DialogTitle>
                    <DialogContent sx={{ p: 0 }}>
                        <Box sx={{ height: "100%", overflow: "hidden", display: "flex", flexDirection: "column" }}>
                            <LinearProgress variant="determinate" value={uploadProgress} sx={{ mb: 2 }} />
                            <Typography align="center">{uploadProgress}% завершено</Typography>
                            <Box sx={{ overflow: "auto" }}>
                                {resultUploadFiles.reverse().map((item) => (
                                    <Alert key={item.name} severity={item.success ? "success" : "error"} sx={{ mt: 2, marginX: 2 }}>
                                        {item.name}
                                    </Alert>
                                ))}
                            </Box>
                        </Box>
                    </DialogContent>
                    <DialogActions>
                        <MuiButton onClick={() => setUploadDialogOpen(false)}>{isUploading ? "Отмена" : "Закрыть"}</MuiButton>
                    </DialogActions>
                </Dialog>

                {/* Диалог подтверждения удаления */}
                <Dialog open={deleteDialogOpen} onClose={() => setDeleteDialogOpen(false)}>
                    <DialogTitle>Подтверждение удаления</DialogTitle>
                    <DialogContent>
                        <Typography>Вы уверены, что хотите удалить {selectedFiles.length} выбранных файлов?</Typography>
                        <Alert severity="warning" sx={{ mt: 2 }}>
                            Это действие нельзя отменить. Файлы будут удалены безвозвратно.
                        </Alert>
                    </DialogContent>
                    <DialogActions>
                        <MuiButton onClick={() => setDeleteDialogOpen(false)}>Отмена</MuiButton>
                        <MuiButton onClick={handleDeleteSelected} color="error" variant="contained">
                            Удалить
                        </MuiButton>
                    </DialogActions>
                </Dialog>
            </Box>
        </BaseMainWraper>
    );
};
