import "./App.scss";
import { BrowserRouter, HashRouter, Outlet, Route, Routes } from "react-router-dom";
import { ThemeProvider } from "@mui/material";
import { ToastContainer } from "react-toastify";
import { AboutPage, HomePage, MainPage, MyProfilePage, NotFoundPage, UsersPage } from "../../2_pages";
import { Provider } from "react-redux";
import store from "../model/AppStore";
import { theme } from "./theme";
import { LoginRegPage } from "../../2_pages/LoginRegPage";
import { FRONT_ROUTES_STR } from "../../6_shared/constants";

export const App = () => {
    return (
        <Provider store={store}>
            <ThemeProvider theme={theme}>
                <HashRouter>
                    <Routes>
                        <Route path="/" element={<HomePage />}>
                            <Route index element={<MainPage />} />
                            <Route path="about/*" element={<AboutPage />} />
                            <Route path={`${FRONT_ROUTES_STR.main}/*`} element={<MainPage />} />
                            <Route path={`${FRONT_ROUTES_STR.users}/*`} element={<UsersPage />} />
                            <Route path={`${FRONT_ROUTES_STR.login}/*`} element={<LoginRegPage />} />
                            <Route path={`${FRONT_ROUTES_STR.myProfile}/*`} element={<MyProfilePage />} />
                            {/* 
            <Route path="rights/*" element={<RightsPage />} />
            <Route path="reports/*" element={<ReportsPage />} />
            <Route path="subscriptions/*" element={<SubscriptionsPage />} />
            <Route path="script-builder/*" element={<ScriptBuilderPage />} />
            <Route path="chat-platform/*" element={<ProjectSettingsPage />} />
            <Route path="admin/import-data/*" element={<ImportDataPage />} />
            <Route path="admin/export-audio/*" element={<ExportAudioPage />} />
            <Route path="admin/twin-data/*" element={<TwinDataPage />} />
            <Route path="admin/voxys-bot/*" element={<VoxysBotPage />} />
            <Route path="admin/cfg-settings/*" element={<CfgSettingsPage />} /> */}

                            <Route path="*" element={<NotFoundPage />} />
                        </Route>
                    </Routes>
                </HashRouter>
            </ThemeProvider>
        </Provider>
    );
};

export default App;
