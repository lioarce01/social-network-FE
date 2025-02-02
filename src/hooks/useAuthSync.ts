import { useAuth0 } from "@auth0/auth0-react";
import { useEffect, useCallback } from "react";
import
{
  useRegisterUserMutation,
} from "@/redux/api/userApi";
import { auth0Client } from "@/lib/Auth0Config";

const useAuthSync = () =>
{
  const { isAuthenticated } = useAuth0();
  const [registerUser] = useRegisterUserMutation();

  const syncUser = useCallback(async () =>
  {
    if (isAuthenticated) {
      try {
        await registerUser().unwrap();
      } catch (error) {
        if ((error as any).status === 401) {
          await auth0Client.loginWithRedirect();
        }
      }
    }
  }, [isAuthenticated]);

  useEffect(() =>
  {
    syncUser();
  }, [isAuthenticated]);
};

export default useAuthSync;
