
import { useGetMeQuery } from "@/redux/api/userApi";

const useCurrentUser = () =>
{
  const {
    data,
    error,
    isLoading,
  } = useGetMeQuery({});

  const currentUser = data?.user

  return { currentUser, isLoading, error };
};

export default useCurrentUser;
