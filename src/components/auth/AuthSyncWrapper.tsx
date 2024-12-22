"use client";

import { ReactNode } from "react";
import useCurrentUser from "@/hooks/useCurrentUser";

const AuthSyncWrapper = ({ children }: { children: ReactNode }) => {
  const { currentUser, loading, error } = useCurrentUser();

  if (loading)
    return (
      <div className="w-full bg-black bg-opacity-50 h-screen flex text-white justify-center items-center">
        {" "}
        Loading...
      </div>
    );
  if (error) return <p>Error loading user: {error}</p>;

  if (!currentUser) return <p>Please log in.</p>;

  return <>{children}</>;
};

export default AuthSyncWrapper;
