import { Routes, Route } from "react-router-dom";
import { LoginPage } from "./pages/Login";
import { HomePage } from "./pages/Home";
import { HomeLayout } from "./components/HomeLayout";
import './App.css';

function App() {
    return (
        <Routes>

            <Route element={<HomeLayout />}>
                <Route path="/" element={<HomePage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/registration" element={<LoginPage />} />
            </Route>


            {/*<Route path="/room/general" element={<ProtectedLayout />}>*/}
            {/*    <Route path="profile" element={<ProfilePage />} />*/}
            {/*    <Route path="settings" element={<SettingsPage />} />*/}
            {/*</Route>*/}

        </Routes>
    );
}

export default App;
