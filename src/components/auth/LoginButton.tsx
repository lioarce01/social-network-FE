"use client";

import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { Button } from "@/components/ui/button";

interface LoginButtonProps {
  text: string;
}

const LoginButton: React.FC<LoginButtonProps> = ({ text }) => {
  const { loginWithRedirect, isAuthenticated, isLoading } = useAuth0();

  const handleLogin = async () => {
    await loginWithRedirect({
      appState: { returnTo: "/feed" },
    });
  };

  return (
    <div>
      {!isAuthenticated && (
        <Button disabled={isLoading} onClick={handleLogin}>
          {text}
        </Button>
      )}
    </div>
  );
};

export default LoginButton;
