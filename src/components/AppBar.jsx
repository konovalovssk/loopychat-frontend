import * as React from "react";
import MuiAppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

export const AppBar = ({ pages }) => {
    const navigate = useNavigate();
    const { user, logout } = useAuth();

    const handleOpenPage = (path) => {
        navigate(path);
    };

    return (
        <MuiAppBar position="static">
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <Typography
                        variant="h6"
                        noWrap
                        component="div"
                        sx={{ mr: 2, display: { xs: "flex", md: "flex" } }}
                    >
                        React Router Auth
                    </Typography>

                    <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "flex" } }}>
                        {pages?.map((page) => (
                            <Button
                                key={page.label}
                                onClick={() => handleOpenPage(page.path)}
                                sx={{ my: 2, color: "white", display: "block" }}
                            >
                                {page.label}
                            </Button>
                        ))}
                        {!!user && (
                            <Button
                                key={"logout"}
                                onClick={logout}
                                sx={{ my: 2, color: "white", display: "block" }}
                            >
                                {"logout"}
                            </Button>
                        )}
                    </Box>
                </Toolbar>
            </Container>
        </MuiAppBar>
    );
};
