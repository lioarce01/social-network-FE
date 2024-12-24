"use client";

import "./globals.css";
import { Inter } from "next/font/google";
import { Auth0Provider } from "@auth0/auth0-react";
import { useRouter } from "next/navigation";
import { Providers } from "@/lib/providers";
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

  const router = useRouter();

  const onRedirectCallback = (appState: any) => {
    console.log("Redirecting to:", appState?.returnTo || "/");
    router.push(appState?.returnTo?.toLowerCase() || "/");
  };

  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="flex flex-col min-h-screen">
          <main>
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
              <Providers>{children}</Providers>
            </Auth0Provider>
          </main>
        </div>
      </body>
    </html>
  );
}
