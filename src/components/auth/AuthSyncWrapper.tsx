"use client";

import { useAuth0 } from "@auth0/auth0-react";
import useAuthSync from "@/hooks/useAuthSync";
import { ReactNode, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";

const AuthSyncWrapper = ({ children }: { children: ReactNode }) => {
  const { isAuthenticated, isLoading } = useAuth0();
  useAuthSync();

  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    if (isAuthenticated && pathname === "/") {
      router.push("/feed");
    }
  }, [isAuthenticated, pathname, router]);

  if (isLoading) {
    return (
      <div className="flex flex-col w-full bg-gray-200 text-neutral-800 h-screen justify-center items-center">
        <p>TechConnect</p>
        <Loader2 className="animate-spin" />
      </div>
    );
  }

  if (!isAuthenticated && pathname !== "/") {
    router.push("/");
  }

  return <>{children}</>;
};

export default AuthSyncWrapper;
