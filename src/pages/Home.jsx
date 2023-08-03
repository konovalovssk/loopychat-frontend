import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import {Paper} from "@mui/material";
import {useLocalStorage} from "../hooks/useLocalStorage";
import {useEventSource} from "../hooks/useEventSource";
import {useCsrfToken} from "../hooks/useCsrfToken";
import {useAuth} from "../hooks/useAuth";
import {useState} from "react";

export const HomePage = () => {
    const { user } = useAuth();
    //const data = useEventSource(process.env.REACT_APP_PROXY_HOST + "/api/channel/sse");
    const data = {};
    const [getCsrfToken] = useCsrfToken();
    const [messages, setMessages] = useLocalStorage("messages", {});
    const [newMessage, setNewMessage] = useState("");

    let messagesMap = new Map(Object.entries(messages));

    if (data && data.type === 'chat') {
        if (!messagesMap.has("m_" + data.payload.id)) {
            messagesMap.set(
                "m_" + data.payload.id,
                {
                    id: data.payload.id,
                    body: data.payload.body,
                    username: data.payload.username,
                    createdAt: data.payload.createdAt
                }
            );

            setMessages(Object.fromEntries(messagesMap));

            //----
            //console.log("new", data);
            //----
        }
    }

    const handleChangeNewMessage = (event) => {
        event.preventDefault();
        setNewMessage(event.target.value);
    };

    const handleSendNewMessage = async (event) => {
        event.preventDefault();
        setNewMessage("");

        try {
            const csrfToken = await getCsrfToken();
            if (!csrfToken) {
                console.error("handleSendNewMessage: Cannot get csrfToken");
                return;
            }

            await fetch('/api/channel/send', {
                method: 'POST',
                body: JSON.stringify({body: newMessage}),
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRF-TOKEN': csrfToken
                }
            });
        } catch (error) {
            console.error("handleSendNewMessage:", error);
        }
    };

    const handleKeyDownNewMessage = async (event) => {
        if (event.keyCode === 13) { // the enter key
            await handleSendNewMessage(event);
        }
    };

    return (
        <Container component="main" disableGutters={true} sx={{m: 2, p: 0}}>
        <Grid container sx={{ m: 0}}>
            <Grid xs={4}>
                <Typography component="h1" variant="h5">
                    People
                </Typography>
            </Grid>
            <Grid container xs={7}>
                <Grid xs={12}>
                    <Box
                        sx={{
                            overflowY: "scroll",
                            height: "700px"
                        }}
                    >

                        {(() => {
                            let rows = [];
                            messagesMap.forEach((message) => {
                                rows.push(<Message key={message.id} message={message} currUser={user} />);
                            });

                            return rows;
                        })()}
                    </Box>
                </Grid>

                <Grid container xs={12}>
                    <Grid xs={10}>
                        <TextField
                            required
                            fullWidth
                            id="body"
                            name="body"
                            autoComplete="body"
                            value={newMessage}
                            onChange={handleChangeNewMessage}
                            onKeyDown={handleKeyDownNewMessage}
                            sx={{ m: 0, input: {color: "#ececec"} }}
                        />
                    </Grid>

                    <Grid xs={1} sx={{ ml: 3}}>
                        <Button
                            fullWidth
                            variant="outlined"
                            size="large"
                            sx={{ height: "100%" }}
                            onClick={handleSendNewMessage}
                            autoFocus
                        >
                            Send
                        </Button>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
        </Container>
    );
};

const Message = ({ message, currUser }) => {
    const isSystem = message.username === "system";
    const isBot = isSystem || message.username !== currUser.username;
    const date = new Date(message.createdAt);

    let backgroundColor = isBot ? "primary.light" : "secondary.light";
    if (isSystem) {
        backgroundColor = "darkgreen";
    }

    return (
        <Box
            sx={{
                display: "flex",
                justifyContent: isBot ? "flex-start" : "flex-end",
                mb: 2,
            }}
        >
            <Paper
                variant="outlined"
                sx={{
                    p: 1,
                    backgroundColor: {backgroundColor},
                    borderRadius: isBot ? "20px 20px 20px 5px" : "20px 20px 5px 20px",
                }}
            >
                <Typography fontStyle="italic" fontSize="smaller">{date.toLocaleTimeString()} : {message.username}</Typography>
                <Typography variant="body1">{message.body}</Typography>
            </Paper>
        </Box>
    );
};