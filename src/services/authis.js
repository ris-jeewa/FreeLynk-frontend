const CLIENT_ID = "dGruDQql119VO8EW3Ef8I0ReGgwa";
const IDP_HOST = "https://localhost:9443"; // include protocol and :9443
const REDIRECT_URI = "http://localhost:5173";
const API_BASE_URL = "http://localhost:8080";

function generateRandomString(length = 64) {
    const charset = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_';
    let result = '';

    const randomValues = window.crypto.getRandomValues(new Uint8Array(length));
    for (let i = 0; i < length; i++) {
        result += charset[randomValues[i] % charset.length];
    }
    return result;
}


async function getCodeChallenge(codeVerifier) {
    const encoder = new TextEncoder();
    const data = encoder.encode(codeVerifier);
    const digest = await window.crypto.subtle.digest('SHA-256', data);
    return btoa(String.fromCharCode(...new Uint8Array(digest)))
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/, '');
}



export const login = async () => {
    const codeVerifier = generateRandomString(64);
    const codeChallenge = await getCodeChallenge(codeVerifier);
   
    localStorage.setItem('codeVerifier', codeVerifier);

    const params = new URLSearchParams({
        response_type: "code",
        client_id: CLIENT_ID,
        redirect_uri: REDIRECT_URI,
        scope: "openid profile email",
        code_challenge: codeChallenge,
        code_challenge_method: "S256",
    });

    window.location.href = `${IDP_HOST}/oauth2/authorize?${params.toString()}`;

}


export const handleCallback = async () => {
    const params = new URLSearchParams(window.location.search);
    const code = params.get('code');
    const codeVerifier = localStorage.getItem('codeVerifier');

    if (!code || !codeVerifier) return null;

    const body = new URLSearchParams({
        grant_type: "authorization_code",
        code: code,
        redirect_uri: REDIRECT_URI,
        client_id: CLIENT_ID,
        code_verifier: codeVerifier,
    });

    const response = await fetch(`${IDP_HOST}/oauth2/token`, {
        method: "POST",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
        body: body,
    });

    // const response = await fetch(`${API_BASE_URL}/auth/callback`, {
    //     method: "POST",
    //     headers: { "Content-Type": "application/json" },
    //     body: JSON.stringify({ code })
    //   });

    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }

    const tokenResponse = await response.json();

    if (tokenResponse.access_token) {
        localStorage.setItem('access_token', tokenResponse.access_token);
    }
    if (tokenResponse.refresh_token) {
        localStorage.setItem('refresh_token', tokenResponse.refresh_token);
    }
    if (tokenResponse.id_token) {
        localStorage.setItem('id_token', tokenResponse.id_token);
    }


    return tokenResponse;
}

export const logout = async () => {
    const idToken = localStorage.getItem('id_token');
    const logoutUrl = `${IDP_HOST}/oidc/logout`;
    const params = new URLSearchParams({
        id_token_hint: idToken,
        post_logout_redirect_uri: REDIRECT_URI,
    });

    localStorage.clear();

    window.location.href = `${logoutUrl}?${params.toString()}`;
}

export const isLoggedIn = () => {
    const accessToken = localStorage.getItem('access_token');
    if (!accessToken) return false;
    
    try {
        const payload = JSON.parse(atob(accessToken.split('.')[1]));
        return payload.exp > Date.now() / 1000;
    } catch (error) {
        return false;
    }
}

export const refreshToken = async () => {
    const refreshToken = localStorage.getItem('refresh_token');

    if (!refreshToken) {
        login();
        return null;
    }

    const body = new URLSearchParams({
        grant_type: "refresh_token",
        refresh_token: refreshToken,
        client_id: CLIENT_ID,
    });

    try {
        const response = await fetch(`${IDP_HOST}/oauth2/token`, {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            },
            body: body,
        });
    } catch (error) {
        return null;
    }

    if (!response.ok) {
        login();
        return null;
    }

    const tokenResponse = await response.json();
    if (tokenResponse.access_token) {
        localStorage.setItem('access_token', tokenResponse.access_token);
    }
    if (tokenResponse.refresh_token) {
        localStorage.setItem('refresh_token', tokenResponse.refresh_token);
    }
    if (tokenResponse.id_token) {
        localStorage.setItem('id_token', tokenResponse.id_token);
    }
    return tokenResponse;
}