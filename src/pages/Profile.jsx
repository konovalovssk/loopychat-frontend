import {useCsrfToken} from "../hooks/useCsrfToken";
import {useNavigate} from "react-router-dom";
import {useEffect} from "react";
import { useEventSource } from "../hooks/useEventSource";

export const ProfilePage = () => {

    //const data = useEventSource("/api/channel/sse");
    //const data = useEventSource("https://localhost:8443/api/channel/sse");

    //const [getCsrfToken] = useCsrfToken();
    //const navigate = useNavigate();

/*    const joinChannel = async (event) => {
        try {
            const csrfToken = await getCsrfToken();
            if (!csrfToken) {
                console.error("joinChannel: Cannot get csrfToken");
                return;
            }

            const response = await fetch('/api/channel/join', {
                method: 'POST',
                body: JSON.stringify({channel: ''}),
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
                navigate("/profile", {replace: true});
            } else {
                console.error("joinChannel: " + payload.message);
            }
        } catch (error) {
            console.error("signup:", error);
        }
    };*/

    //const [status, setStatus] = useState(false);

/*    const subscribe = () => {
        const es = new EventSource("/api/channel/sse");
        es.onmessage = (e) => {
            console.log("[EventSource] Message: " + e.data);
        };

        es.onopen = function() {
            console.log("[EventSource] Connection to server opened");
        };

        es.onerror = function(e) {
            console.log("[EventSource] EventSource failed", e);
        };

        es.addEventListener('chat', event => {
            console.log("[EventSource] chat: " + event.data);
        });

        es.addEventListener('welcome', event => {
            console.log("[EventSource] welcome: " + event.data);
        });

        return es;
    };

    useEffect(() => {
        window.eventSource = subscribe();
    });*/




    return (
        <div>
            <h1>This is the Profile Page</h1>
        </div>
    );
};