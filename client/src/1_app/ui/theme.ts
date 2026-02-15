// import { createTheme } from "@mui/material";
import { ThemeProvider, createTheme } from "@mui/material/styles";

// error: Цвет для обозначения ошибок.
// warning: Цвет для обозначения предупреждений.
// info: Цвет для информационных сообщений.
// success: Цвет для обозначения успешных операций.
// text: Основной цвет текста.
// background: Цвет фона.
// divider: Цвет разделителей между элементами.

export const theme = createTheme({
    palette: {
        // Минималистичный основной цвет - темно-серый вместо зеленого
        primary: {
            main: "#2c3e50", // Темный шифер (вместо зеленого)
            light: "#34495e", // Чуть светлее для hover
            dark: "#1c2833", // Темнее для active
            contrastText: "#ffffff",
        },

        // Вторичный - очень нейтральный серый
        secondary: {
            main: "#7f8c8d", // Средне-серый
            light: "#95a5a6", // Светло-серый
            dark: "#5d6d7e", // Темно-серый
            contrastText: "#ffffff",
        },

        // Минималистичные цвета состояний
        error: {
            main: "#e74c3c", // Приглушенный красный
            light: "#ec7063",
            dark: "#c0392b",
        },
        warning: {
            main: "#f39c12", // Приглушенный оранжевый
            light: "#f5b041",
            dark: "#d68910",
        },
        info: {
            main: "#3498db", // Приглушенный синий
            light: "#5dade2",
            dark: "#2c81ba",
        },
        success: {
            main: "#27ae60", // Приглушенный зеленый
            light: "#52be80",
            dark: "#229954",
        },

        // Очень светлые, чистые фоны
        background: {
            default: "#f8f9fa", // Почти белый фон страниц
            paper: "#ffffff", // Чисто белый для карточек
        },

        // Высокий контраст текста
        text: {
            primary: "#212529", // Почти черный для основного текста
            secondary: "#6c757d", // Средне-серый для второстепенного
            disabled: "#adb5bd", // Светло-серый для disabled
        },

        // Упрощенная шкала серого (меньше вариантов)
        grey: {
            50: "#f8f9fa", // Очень светлый фон
            100: "#e9ecef", // Светлый фон
            200: "#dee2e6", // Границы
            300: "#ced4da", // Disabled
            400: "#adb5bd", // Иконки
            500: "#6c757d", // Второстепенный текст
            600: "#495057", // Основной серый текст
            700: "#343a40", // Заголовки
            800: "#212529", // Темный текст
            900: "#121416", // Почти черный
        },

        // Едва заметные разделители
        divider: "rgba(0, 0, 0, 0.08)",

        // Минималистичные action цвета
        action: {
            active: "rgba(0, 0, 0, 0.6)", // Не слишком яркие иконки
            hover: "rgba(0, 0, 0, 0.02)", // Едва заметный hover
            selected: "rgba(0, 0, 0, 0.04)", // Минимальный selection
            disabled: "rgba(0, 0, 0, 0.2)", // Приглушенный disabled
            disabledBackground: "rgba(0, 0, 0, 0.05)",
        },
    },

    // Простые, четкие формы
    shape: {
        borderRadius: 4, // Меньше закругления для строгости
    },

    // Чистые шрифты
    typography: {
        fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
        fontWeightLight: 300,
        fontWeightRegular: 400,
        fontWeightMedium: 500,
        fontWeightBold: 600,
    },

    // Компоненты с минималистичными настройками
    components: {
        MuiButton: {
            styleOverrides: {
                root: {
                    textTransform: "none", // Без заглавных букв
                    fontWeight: 500,
                },
                contained: {
                    boxShadow: "none",
                    "&:hover": {
                        boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
                    },
                },
            },
        },
        MuiPaper: {
            styleOverrides: {
                root: {
                    boxShadow: "0 1px 3px rgba(0,0,0,0.05)",
                },
                elevation1: {
                    boxShadow: "0 1px 3px rgba(0,0,0,0.05)",
                },
                elevation2: {
                    boxShadow: "0 1px 5px rgba(0,0,0,0.08)",
                },
            },
        },
        MuiAppBar: {
            styleOverrides: {
                root: {
                    boxShadow: "0 1px 3px rgba(0,0,0,0.08)",
                },
            },
        },
    },
});
