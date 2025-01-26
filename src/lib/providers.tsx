"use client";

import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "@/redux/store";
import AuthSyncWrapper from "@/components/auth/AuthSyncWrapper";
import { Auth0Provider } from "@auth0/auth0-react";
import { useRouter } from "next/navigation";
import { Toaster } from "sonner";

export function Providers({ children }: { children: React.ReactNode }) {
  const router = useRouter();

  const redirectUri =
    typeof window !== "undefined" ? window.location.origin : "";

  const onRedirectCallback = (appState: any) => {
    router.push(appState?.returnTo?.toLowerCase() || "/");
  };

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Auth0Provider
          domain={process.env.NEXT_PUBLIC_AUTH0_DOMAIN!}
          clientId={process.env.NEXT_PUBLIC_AUTH0_CLIENT_ID!}
          authorizationParams={{
            redirect_uri: redirectUri,
            audience: process.env.NEXT_PUBLIC_AUTH_AUDIENCE,
            scope: "openid profile email",
          }}
          onRedirectCallback={onRedirectCallback}
          cacheLocation="localstorage"
        >
          <Toaster position="top-center" />
          <AuthSyncWrapper>{children}</AuthSyncWrapper>
        </Auth0Provider>
      </PersistGate>
    </Provider>
  );
}
