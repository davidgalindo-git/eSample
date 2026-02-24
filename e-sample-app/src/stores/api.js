export const useFreesoundAuth = () => {
    // freesound API vars
    const freesoundURL = `https://freesound.org/apiv2/`
    const client_id = import.meta.env.VITE_FREESOUND_CLIENT_ID;
    const client_secret = import.meta.env.VITE_FREESOUND_CLIENT_SECRET;

    // freesound user login function
    const login = () => {
        const url = `${freesoundURL}oauth2/authorize/?client_id=${id}&response_type=code`;
        window.location.href = url; // user is redirected to freesound's page
    };

    return {login};
}