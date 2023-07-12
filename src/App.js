import { Routes, Route } from "react-router-dom";
import { LoginPage } from "./pages/Login";
import { SignupPage } from "./pages/Signup";
import { HomePage } from "./pages/Home";
import { ProfilePage } from "./pages/Profile";
import { NotAuthorizedLayout } from "./components/NotAuthorizedLayout";
import { ProtectedLayout } from "./components/ProtectedLayout";
import './App.css';

export default function App() {
    return (
        <Routes>
            <Route element={<NotAuthorizedLayout />}>
                <Route path="/login" element={<LoginPage />} />
                <Route path="/signup" element={<SignupPage />} />
            </Route>

            <Route element={<ProtectedLayout />}>
                <Route path="/" element={<HomePage />} />
                <Route path="/profile" element={<ProfilePage />} />
            </Route>
        </Routes>
    );
}
