"use client";

import { Provider } from "react-redux";
import "./globals.css";
import { Inter } from "next/font/google";
import { persistor, store } from "@/redux/store";
import { PersistGate } from "redux-persist/integration/react";
import { Auth0Provider } from "@auth0/auth0-react";
import AuthSyncWrapper from "@/components/auth/AuthSyncWrapper";

const inter = Inter({ subsets: ["latin"] });

// export const metadata = {
//   title: "TechConnect - Professional Network for Tech Experts",
//   description: "Connect, collaborate, and grow in the tech industry",
// };

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const redirectUri =
    typeof window !== "undefined" ? window.location.origin : "";

  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="flex flex-col min-h-screen">
          <main>
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
                  cacheLocation="localstorage"
                >
                  {children}
                </Auth0Provider>
              </PersistGate>
            </Provider>
          </main>
        </div>
      </body>
    </html>
  );
}
