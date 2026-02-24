export const useFreesoundAuth = () => {
    // freesound API vars
    const freesoundURL = `https://freesound.org/apiv2/`
    const id = import.meta.env.VITE_FREESOUND_CLIENT_ID;

    // freesound user login function
    const login = () => {
        const url = `${freesoundURL}oauth2/authorize/?client_id=${id}&response_type=code`;
        window.location.href = url; // user is redirected to freesound's page
    };

    return {login};
}