import { createContext, useContext, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useLocalStorage } from "./useLocalStorage";
import { useCsrfToken } from "./useCsrfToken";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useLocalStorage("user", null);
    const [getCsrfToken] = useCsrfToken();
    const navigate = useNavigate();

    const login = async (data) => {

        const csrfToken = await getCsrfToken();
        if (!csrfToken) {
            return {error: "Cannot get csrfToken"};
        }

        try {
            const response = await fetch('/api/login', {
                method: 'POST',
                body: JSON.stringify(data),
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRF-TOKEN': csrfToken
                }
            });

            const payload = await response.json();

            //---------------
            console.log("payload:", payload);
            //---------------

            if (response.ok) {
                setUser(payload);
                navigate("/profile", { replace: true });
                return {error: ''};
            } else {
                return {error: payload.message};
            }
        } catch (error) {
            console.error("login: ", error);
            return {error: "Cannot login"};
        }
    };

    const logout = async () => {
        const csrfToken = await getCsrfToken();
        if (!csrfToken) {
            return;
        }

        try {
            await fetch('/api/logout', {
                method: 'POST',
                headers: {
                    'X-CSRF-TOKEN': csrfToken
                }
            });
        } catch (error) {
            console.error("logout: ", error);
        }

        setUser(null);
        navigate("/login", { replace: true });
    };

    const value = useMemo(
        () => ({
            user,
            login,
            logout
        }),
        [user]
    );

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
    return useContext(AuthContext);
};
