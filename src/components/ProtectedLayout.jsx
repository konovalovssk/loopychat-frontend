import { Navigate, useOutlet } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { AppBar } from "./AppBar";

export const ProtectedLayout = () => {
    const { user } = useAuth();
    const outlet = useOutlet();

    if (!user) {
        return <Navigate to="/login" replace />;
    }

    return (
        <div>
            <AppBar
                pages={[
                    { label: "Home", path: "/" },
                    { label: "Profile", path: "/profile" }
                ]}
            />
            {outlet}
        </div>
    );
};
