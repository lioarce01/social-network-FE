import { useAuth0 } from "@auth0/auth0-react";
import { useEffect, useCallback } from "react";
import {
  useRegisterUserMutation,
  useLazyGetUserBySubQuery,
} from "@/redux/api/userApi";

const useAuthSync = () => {
  const { user, isAuthenticated } = useAuth0();
  const [registerUser] = useRegisterUserMutation();
  const [getUserBySub] = useLazyGetUserBySubQuery();

  const syncUser = useCallback(async () => {
    if (isAuthenticated && user) {
      const { email, sub, name, picture } = user;
      try {
        const existingUser = await getUserBySub(sub).unwrap();
        console.log("User already exists:", existingUser);
      } catch {
        try {
          const newUser = await registerUser({
            email,
            sub,
            name,
            profile_pic: picture,
          }).unwrap();
          console.log("User created:", newUser);
        } catch (error) {
          console.error("Failed to create user:", error);
        }
      }
    }
  }, [isAuthenticated, user, registerUser, getUserBySub]);

  useEffect(() => {
    syncUser();
  }, [syncUser]);
};

export default useAuthSync;