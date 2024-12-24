import { useAuth0 } from "@auth0/auth0-react";
import { useGetUserBySubQuery } from "@/redux/api/userApi";

const useCurrentUser = () => {
  const { user, isAuthenticated } = useAuth0();
  const sub = user?.sub;

  const {
    data: currentUser,
    error,
    isLoading,
  } = useGetUserBySubQuery(sub, {
    skip: !isAuthenticated || !sub,
  });

  return { currentUser, isLoading, error };
};

export default useCurrentUser;
