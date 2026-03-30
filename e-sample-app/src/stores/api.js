import {ref} from "vue";

const token = ref(localStorage.getItem("fs_token"));

export const useFreesoundAuth = () => {
    // freesound API vars
    const freesoundURL = `https://freesound.org/apiv2/`
    const client_id = import.meta.env.VITE_FREESOUND_CLIENT_ID;
    const client_secret = import.meta.env.VITE_FREESOUND_CLIENT_SECRET;

    // freesound user login function
    const login = () => {
        const url = `${freesoundURL}oauth2/authorize/?client_id=${client_id}&response_type=code`;
        window.location.href = url; // user is redirected to freesound's page
    };

    const logout = () => {
        localStorage.removeItem("fs_token");
        localStorage.removeItem("fs_refresh_token");
        token.value = null;
        console.log("Logged out and cleared tokens");
    };

    const getToken = async () => {
        const code = new URLSearchParams(window.location.search).get("code")
        if (code) {
            try {
                // body constructor
                const formData = new FormData();
                formData.append("client_id", client_id);
                formData.append("client_secret", client_secret);
                formData.append("code", code)
                formData.append("grant_type", "authorization_code")
                console.log("api.js/getToken/formData: ", formData) // DEBUG

                const res = await fetch("https://freesound.org/apiv2/oauth2/access_token/",{
                    method: "POST",
                    body: formData
                })

                const data = await res.json()
                console.log("getToken/data: ", data) // DEBUG

                if (data.access_token) {
                    console.log("access_token: ", data.access_token) // DEBUG
                    // stock access token in local storage
                    localStorage.setItem("fs_token", data.access_token);

                    localStorage.setItem("fs_refresh_token", data.refresh_token);

                    token.value = data.access_token;

                    window.history.replaceState({}, "", "/");
                } else {
                    console.error("Auth Error:", data);
                }
                console.log("localStorage.fs_token: ", localStorage.getItem("fs_token")); // DEBUG
            } catch(e) {
                console.error("Network-Fetch Error", e);
            }
        }
    }
    return { login, logout, getToken, freesoundURL, client_id, client_secret, token};
}