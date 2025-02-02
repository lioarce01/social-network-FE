import { Auth0Client } from "@auth0/auth0-spa-js";
import { fetchBaseQuery } from "@reduxjs/toolkit/query";

export const API_URL = process.env.NEXT_PUBLIC_API_URL;
export const AUDIENCE = process.env.NEXT_PUBLIC_AUTH0_AUDIENCE
export const SCOPE = process.env.NEXT_PUBLIC_AUTH0_SCOPE

export const auth0Client = new Auth0Client({
    domain: `${process.env.NEXT_PUBLIC_AUTH0_DOMAIN}`,
    clientId: `${process.env.NEXT_PUBLIC_AUTH0_CLIENT_ID}`,
    authorizationParams: {
        audience: AUDIENCE,
        redirect_uri: typeof window !== "undefined" ? window.location.origin : "",
    },
    cacheLocation: "localstorage",
    useRefreshTokens: true,
});

export const baseQuery = fetchBaseQuery({
    baseUrl: API_URL,
    prepareHeaders: async (headers) =>
    {
        try {
            const token = await auth0Client.getTokenSilently({
                detailedResponse: true,
                authorizationParams: {
                    audience: `${AUDIENCE}`,
                    scope: `${SCOPE}`
                }
            });

            if (token) {
                console.log("token:", token.access_token)
                headers.set("Authorization", `Bearer ${token.access_token}`);
                headers.set('Content-Type', 'application/json');
            }
        } catch (error) {
            console.error("Error obteniendo token:", error);
            if (typeof window !== "undefined" && (error as { error: string }).error === "login_required") {
                await auth0Client.loginWithRedirect();
            }
        }
        return headers;
    },
});