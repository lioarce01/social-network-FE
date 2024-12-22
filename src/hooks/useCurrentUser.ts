import { useAuth0 } from "@auth0/auth0-react";
import { useState, useEffect, useCallback } from "react";
import {
  useRegisterUserMutation,
  useLazyGetUserBySubQuery,
} from "@/redux/api/userApi";

const useCurrentUser = () => {
  const { user: auth0User, isAuthenticated } = useAuth0();
  const [registerUser] = useRegisterUserMutation();
  const [getUserBySub] = useLazyGetUserBySubQuery();
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const syncUser = useCallback(async () => {
    if (isAuthenticated && auth0User) {
      const { email, sub, name, picture } = auth0User;

      try {
        const existingUser = await getUserBySub(sub).unwrap();
        setCurrentUser(existingUser);
      } catch {
        try {
          const newUser = await registerUser({
            email,
            sub,
            name,
            profile_pic: picture,
          }).unwrap();
          setCurrentUser(newUser);
        } catch (registerError) {
          setError("Failed to register user");
          console.error(registerError);
        }
      } finally {
        setLoading(false);
      }
    } else {
      setLoading(false);
    }
  }, [isAuthenticated, auth0User, getUserBySub, registerUser]);

  useEffect(() => {
    syncUser();
  }, [syncUser]);

  return { currentUser, loading, error };
};

export default useCurrentUser;
