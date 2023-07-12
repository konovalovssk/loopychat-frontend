export const useCsrfToken = () => {
    const getCsrfToken = async () => {
        try {
            const response = await fetch('/api/csrf');
            const payload = await response.json()
            return payload.token;
        } catch (error) {
            console.error("getCsrfToken:", error);
            return '';
        }
    };

    return [getCsrfToken];
};