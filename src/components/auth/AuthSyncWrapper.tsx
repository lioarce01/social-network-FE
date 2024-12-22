"use client";
import { useAuth0 } from "@auth0/auth0-react";
import useAuthSync from "@/hooks/useAuthSync";
import { ReactNode } from "react";

const AuthSyncWrapper = ({ children }: { children: ReactNode }) => {
  const { isAuthenticated, isLoading } = useAuth0();

  useAuthSync();

  if (isLoading)
    return (
      <div className="w-full bg-black bg-opacity-50 h-screen flex text-white justify-center items-center">
        {" "}
        Loading...
      </div>
    );
  if (!isAuthenticated) return <p>Please log in.</p>;

  return <>{children}</>;

  // const { currentUser, loading, error } = useCurrentUser();

  // if (loading)
  //   return (
  //     <div className="w-full bg-black bg-opacity-50 h-screen flex text-white justify-center items-center">
  //       {" "}
  //       Loading...
  //     </div>
  //   );
  // if (error) return <p>Error loading user: {error}</p>;

  // if (!currentUser) return <p>Please log in.</p>;

  // return <>{children}</>;
};

export default AuthSyncWrapper;
