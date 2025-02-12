
import { useGetMeQuery } from "@/redux/api/userApi";

const useCurrentUser = () =>
{
  const {
    data,
    error,
    isLoading,
    refetch
  } = useGetMeQuery({});

  const currentUser = data?.user

  return { currentUser, isLoading, error, refetch };
};

export default useCurrentUser;
