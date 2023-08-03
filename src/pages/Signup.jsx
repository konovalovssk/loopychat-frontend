import * as React from "react";
import { useNavigate } from "react-router-dom";
import Avatar from "@mui/material/Avatar";
import Alert from "@mui/material/Alert";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import AppRegistrationOutlinedIcon from "@mui/icons-material/AppRegistrationOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import { ToggleButton } from "@mui/material";
import { useCsrfToken } from "../hooks/useCsrfToken";
import { useAuth } from "../hooks/useAuth";

export const SignupPage = () => {
    const { setUser } = useAuth();
    const [getCsrfToken] = useCsrfToken();
    const [errorMessage, setErrorMessage] = React.useState('');
    const [gender, setGender] = React.useState('MALE');
    const navigate = useNavigate();

    const handleSubmit2 = async (event) => {
        event.preventDefault();
        setErrorMessage('');

        try {
            const data = new FormData(event.currentTarget);
            const csrfToken = await getCsrfToken();
            if (!csrfToken) {
                setErrorMessage('Cannot get csrfToken');
                return;
            }

            const response = await fetch('/api/signup', {
                method: 'POST',
                body: JSON.stringify(
                    {
                        username: data.get("username"),
                        password: data.get("password"),
                        gender: data.get("gender"),
                    }
                ),
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRF-TOKEN': csrfToken
                }
            });

            const payload = await response.json();

            //---------------
            console.log("payload:", payload);
            console.log("response:", response);
            //---------------

            if (response.ok) {
                setUser(payload);
                //---------------
                console.log("redirect_to: profile");
                //---------------

                navigate("/profile", { replace: true });
            } else {
                setErrorMessage(payload.message);
            }
        } catch (error) {
            console.error("signup:", error);
            setErrorMessage("Cannot signup");
        }
    };

    const handleGenderChange = (event, selectedGender) => {
        if (selectedGender !== null) {
            setGender(selectedGender);
        }
    };

    return (
        <Container component="main" maxWidth="xs">
            <Box
                sx={{
                    marginTop: 8,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center"
                }}
            >
                <Avatar sx={{ m: 1, bgcolor: "primary.main" }}>
                    <AppRegistrationOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Sign Up
                </Typography>
                <Box component="form" onSubmit={handleSubmit2} noValidate sx={{ mt: 1 }} >
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="username"
                        label="username"
                        name="username"
                        autoComplete="username"
                        autoFocus
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                    />

                    <TextField
                        id="gender"
                        name="gender"
                        margin="normal"
                        required
                        fullWidth
                        hidden={true}
                        value={gender}
                    />

                    <ToggleButtonGroup

                        margin="normal"
                        color="primary"
                        value={gender}
                        exclusive
                        onChange={handleGenderChange}
                        aria-label="Platform"
                        required
                        fullWidth
                        style={{marginBottom: "8px"}}
                    >
                        <ToggleButton value="MALE">Male</ToggleButton>
                        <ToggleButton value="FEMALE">Female</ToggleButton>
                    </ToggleButtonGroup>

                    {errorMessage && <Alert severity="error">{errorMessage}</Alert>}

                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                    >Login In
                    </Button>
                </Box>
            </Box>
        </Container>
    );
};
