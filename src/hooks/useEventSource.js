import * as React from "react";
export const useEventSource = (url) => {
    const [data, updateData] = React.useState(null);

    React.useEffect(() => {
        const es = new EventSource(url, { withCredentials: true });

        es.onopen = function() {
            //-------------------
            console.log("[EventSource] Connection to server opened");
            //-------------------


        };

        es.onerror = function(e) {
            //-------------------
            console.log("[EventSource] EventSource failed", e);
            //-------------------
        };

        es.addEventListener('chat', event => {
            //-------------------
            console.log("[EventSource] Chat: ", event.data);
            //-------------------

            updateData({type: 'chat', payload: JSON.parse(event.data)});
        });

/*        es.addEventListener('system', event => {
            console.log("[EventSource] Welcome: ", event.data);

            updateData({type: 'system', payload: event.data});
        });*/

    }, []);

    return data
}