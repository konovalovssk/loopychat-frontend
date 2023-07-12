import { Navigate, useOutlet } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { AppBar } from "./AppBar";

export const NotAuthorizedLayout = () => {
    const { user } = useAuth();
    const outlet = useOutlet();

    if (user) {
        return <Navigate to="/" replace />;
    }

    return (
        <div>
            <AppBar
                pages={[
                    { label: "Login", path: "/login" },
                    { label: "Sign Up", path: "/signup" }
                ]}
            />
            {outlet}
        </div>
    );
};
