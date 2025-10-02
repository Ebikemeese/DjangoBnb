import { authService } from "./auth"

const BASE_URL = import.meta.env.VITE_PUBLIC_API_HOST


function handleUnauthorized() {
    authService.clear();
    localStorage.removeItem("userId")
    window.location.href = "/"
}

const apiService = {
    get: async function (url: string): Promise<any> {
        let token = authService.getToken();

        try {
        const response = await fetch(`${import.meta.env.VITE_PUBLIC_API_HOST}${url}`, {
            method: 'GET',
            headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            ...(token ? { 'Authorization': `Bearer ${token}` } : ''),
            },
        });

        if (response.status === 401) {
            handleUnauthorized();
            return null;
        }

        const contentType = response.headers.get('content-type');
        if (!response.ok || !contentType?.includes('application/json')) {
            const errorText = await response.text(); 
            throw new Error(`Unexpected response: ${errorText}`);
        }

        return await response.json();
        } catch (error) {
        console.error('API GET error:', error);
        throw error;
        }
    },

    post: async function(url: string, data: any): Promise<any> {
        // console.log('post', url, data)

        return fetch(`${import.meta.env.VITE_PUBLIC_API_HOST}${url}`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data) 
        })
        .then(response => response.json())
        .then(json => {
            // console.log('Response', json)
            return json
        })
        .catch(error => {
            console.error('API error:', error)
            throw error
        })
    },

    getWithToken: async function (url: string): Promise<any> {
        let token = authService.getToken();

        let response = await fetch(`${BASE_URL}${url}`, {
            method: 'GET',
            credentials: 'include',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                ...(token ? { 'Authorization': `Bearer ${token}` } : {}),
            }
        });

        if (response.status === 401) {
            handleUnauthorized();
            return null;
        }

        return response.json();
    },

    postWithToken: async function(url: string, data: any): Promise<any> {
        let token = authService.getToken();

        const isFormData = data instanceof FormData;

        let response = await fetch(`${BASE_URL}${url}`, {
            method: 'POST',
            body: isFormData ? data : JSON.stringify(data),
            credentials: 'include',
            headers: {
                // ...(isFormData ? {} : { 'Accept': 'application/json' }),
                ...(token ? { 'Authorization': `Bearer ${token}` } : {}),
                ...(isFormData ? {} : {'Content-Type': 'application/json' }),
            },
        });

        if (response.status === 401) {
            handleUnauthorized();
            return null;
        }

        return response.json();
    },
}

export default apiService;
