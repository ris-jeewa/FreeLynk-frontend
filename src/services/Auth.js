// Auth.js
// Single-file React component providing manual OAuth2 Authorization Code + PKCE flow
// Replace CLIENT_ID and WSO2_HOST below.

import React, { useEffect, useState } from "react";

/**
 * CONFIG - Change these values
 */
const CLIENT_ID = "VaksZKyRRN2JqGhTIENqlyfqwNga";
const WSO2_HOST = "https://localhost:9443"; // include protocol and :9443
const REDIRECT_URI = "http://localhost:5173/"; // make sure this matches the SP redirect URI exactly
const AUTHORIZATION_ENDPOINT = `${WSO2_HOST.replace(/\/$/, "")}/oauth2/authorize`;
const TOKEN_ENDPOINT = `${WSO2_HOST.replace(/\/$/, "")}/oauth2/token`;
const LOGOUT_ENDPOINT = `${WSO2_HOST.replace(/\/$/, "")}/oidc/logout`;

/**
 * Storage keys
 */
const STORAGE = {
  CODE_VERIFIER: "pkce_code_verifier",
  OAUTH_STATE: "oauth_state",
  ACCESS_TOKEN: "access_token",
  ID_TOKEN: "id_token",
  REFRESH_TOKEN: "refresh_token",
  TOKEN_EXPIRES_AT: "token_expires_at",
};

/**
 * Utility: generate random string (URL-safe)
 */
function generateRandomString(length = 64) {
  const array = new Uint8Array(length);
  crypto.getRandomValues(array);
  // convert to URL-safe base64
  const base64 = btoa(String.fromCharCode(...array));
  return base64.replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

/**
 * Utility: SHA-256 and base64url encode (for code challenge)
 * returns promise<string>
 */
async function sha256Base64Url(input) {
  const encoder = new TextEncoder();
  const data = encoder.encode(input);
  const digest = await crypto.subtle.digest("SHA-256", data);
  // convert ArrayBuffer to byte string
  const bytes = new Uint8Array(digest);
  let binary = "";
  for (let i = 0; i < bytes.byteLength; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  const base64 = btoa(binary);
  // base64url
  return base64.replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

/**
 * Helper: URL-encode an object for application/x-www-form-urlencoded
 */
function toFormUrlEncoded(obj) {
  return Object.entries(obj)
    .map(([k, v]) => encodeURIComponent(k) + "=" + encodeURIComponent(v))
    .join("&");
}

/**
 * Small JWT decode (only to read payload; no signature verification client-side)
 */
function parseJwt(token) {
  if (!token) return null;
  const parts = token.split(".");
  if (parts.length < 2) return null;
  const payload = parts[1];
  const json = atob(payload.replace(/-/g, "+").replace(/_/g, "/"));
  try {
    return JSON.parse(
      decodeURIComponent(
        json
          .split("")
          .map(function (c) {
            return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
          })
          .join("")
      )
    );
  } catch (e) {
    return null;
  }
}

/**
 * Initiate login: build authorization URL with PKCE and redirect
 */
export async function login({ scope = "openid profile email" } = {}) {
  const state = generateRandomString(16);
  const codeVerifier = generateRandomString(64);
  const codeChallenge = await sha256Base64Url(codeVerifier);

  // store state & codeVerifier locally (for callback verification)
  localStorage.setItem(STORAGE.OAUTH_STATE, state);
  localStorage.setItem(STORAGE.CODE_VERIFIER, codeVerifier);

  const params = {
    response_type: "code",
    client_id: CLIENT_ID,
    redirect_uri: REDIRECT_URI,
    scope,
    state,
    code_challenge: codeChallenge,
    code_challenge_method: "S256",
    // add nonce if you want OpenID Connect id_token nonce verification on client
    // nonce: generateRandomString(12)
  };

  const url = AUTHORIZATION_ENDPOINT + "?" + new URLSearchParams(params).toString();
  // redirect browser to WSO2 IS authorization endpoint
  window.location.href = url;
}

/**
 * Exchange authorization code for tokens using PKCE (called on redirect callback)
 * Expects the browser location to contain ?code=...&state=...
 */
export async function handleCallback() {
  const url = new URL(window.location.href);
  const code = url.searchParams.get("code");
  const state = url.searchParams.get("state");
  const error = url.searchParams.get("error");

  if (error) {
    throw new Error("Authorization error: " + error);
  }

  if (!code) {
    // nothing to do
    return null;
  }

  const savedState = localStorage.getItem(STORAGE.OAUTH_STATE);
  if (!savedState || state !== savedState) {
    // possible CSRF or tampered state
    throw new Error("Invalid or missing state parameter.");
  }

  const codeVerifier = localStorage.getItem(STORAGE.CODE_VERIFIER);
  if (!codeVerifier) {
    throw new Error("Missing code_verifier in localStorage.");
  }

  // Prepare token request - application/x-www-form-urlencoded
  const body = toFormUrlEncoded({
    grant_type: "authorization_code",
    code,
    redirect_uri: REDIRECT_URI,
    client_id: CLIENT_ID,
    code_verifier: codeVerifier,
  });

  const resp = await fetch(TOKEN_ENDPOINT, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      // Note: For public clients (SPAs) do NOT send client_secret.
    },
    body,
  });

  if (!resp.ok) {
    const txt = await resp.text();
    throw new Error("Token endpoint error: " + resp.status + " - " + txt);
  }

  const tokenResponse = await resp.json();
  // expected: access_token, id_token (if openid), refresh_token (optional), expires_in
  const now = Math.floor(Date.now() / 1000);
  const expiresAt = tokenResponse.expires_in ? now + Number(tokenResponse.expires_in) : null;

  if (tokenResponse.access_token) {
    localStorage.setItem(STORAGE.ACCESS_TOKEN, tokenResponse.access_token);
  }
  if (tokenResponse.refresh_token) {
    localStorage.setItem(STORAGE.REFRESH_TOKEN, tokenResponse.refresh_token);
  }
  if (tokenResponse.id_token) {
    localStorage.setItem(STORAGE.ID_TOKEN, tokenResponse.id_token);
  }
  if (expiresAt) {
    localStorage.setItem(STORAGE.TOKEN_EXPIRES_AT, String(expiresAt));
  }

  // cleanup used items (do not clear tokens)
  localStorage.removeItem(STORAGE.CODE_VERIFIER);
  localStorage.removeItem(STORAGE.OAUTH_STATE);

  // Optionally, remove code & state from URL (clean up history)
  url.searchParams.delete("code");
  url.searchParams.delete("state");
  window.history.replaceState({}, document.title, url.pathname + url.search);

  return tokenResponse;
}

/**
 * isLoggedIn() - checks if access token present and not expired
 */
export function isLoggedIn() {
  const token = localStorage.getItem(STORAGE.ACCESS_TOKEN);
  if (!token) return false;
  const expiresAt = localStorage.getItem(STORAGE.TOKEN_EXPIRES_AT);
  if (!expiresAt) return true; // no expiry info -> assume valid (but risky)
  const now = Math.floor(Date.now() / 1000);
  return now < Number(expiresAt) - 10; // 10s clock skew tolerance
}

/**
 * logout() - RP-initiated logout. WSO2 supports OIDC RP-Initiated Logout at /oidc/logout.
 * We redirect user to the logout endpoint with optional post_logout_redirect_uri and id_token_hint.
 */
export function logout() {
  const idToken = localStorage.getItem(STORAGE.ID_TOKEN);
  const params = new URLSearchParams();
  if (idToken) {
    params.set("id_token_hint", idToken);
  }
  // after logout, WSO2 will redirect back to this URL (must be registered as allowed post logout redirect URL in SP)
  params.set("post_logout_redirect_uri", REDIRECT_URI);

  // clear local tokens immediately
  localStorage.removeItem(STORAGE.ACCESS_TOKEN);
  localStorage.removeItem(STORAGE.ID_TOKEN);
  localStorage.removeItem(STORAGE.REFRESH_TOKEN);
  localStorage.removeItem(STORAGE.TOKEN_EXPIRES_AT);

  const url = LOGOUT_ENDPOINT + "?" + params.toString();
  window.location.href = url;
}

/**
 * Simple helper: getAccessToken
 */
export function getAccessToken() {
  return localStorage.getItem(STORAGE.ACCESS_TOKEN);
}

/**
 * React component demonstrating the usage
 */
export default function Auth() {
  const [authState, setAuthState] = useState({
    loggedIn: isLoggedIn(),
    user: null,
  });

  useEffect(() => {
    // If callback contains code, handle it
    const url = new URL(window.location.href);
    if (url.searchParams.get("code") && url.searchParams.get("state")) {
      handleCallback()
        .then((tokens) => {
          // optionally parse id_token to get user info
          const idToken = localStorage.getItem(STORAGE.ID_TOKEN);
          const payload = idToken ? parseJwt(idToken) : null;
          setAuthState({ loggedIn: true, user: payload });
        })
        .catch((err) => {
          console.error("Callback handling failed:", err);
          setAuthState({ loggedIn: false, user: null });
        });
    } else {
      if (isLoggedIn()) {
        const idToken = localStorage.getItem(STORAGE.ID_TOKEN);
        const payload = idToken ? parseJwt(idToken) : null;
        setAuthState({ loggedIn: true, user: payload });
      } else {
        setAuthState({ loggedIn: false, user: null });
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div style={{ padding: 20, fontFamily: "Arial, sans-serif" }}>
      <h2>WSO2 IS 6.1.0 — Manual OAuth2 (Auth Code + PKCE)</h2>
      <div>
        <strong>Server:</strong> {WSO2_HOST}
      </div>
      <div>
        <strong>Client ID:</strong> {CLIENT_ID}
      </div>
      <div style={{ marginTop: 12 }}>
        {authState.loggedIn ? (
          <>
            <div>
              <strong>Logged in</strong>
            </div>
            {authState.user && (
              <pre style={{ maxWidth: 600, background: "#f2f2f2", padding: 8 }}>
                {JSON.stringify(authState.user, null, 2)}
              </pre>
            )}
            <button onClick={() => { logout(); }} style={{ marginTop: 8 }}>
              Logout
            </button>
          </>
        ) : (
          <>
            <div>
              <strong>Not logged in</strong>
            </div>
            <button
              onClick={() => {
                login();
              }}
              style={{ marginTop: 8 }}
            >
              Login
            </button>
          </>
        )}
      </div>
    </div>
  );
}
