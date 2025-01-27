import { useGetUserFollowingQuery } from "@/redux/api/userApi";
import useCurrentUser from "./useCurrentUser";

const useGetUserFollowings = () => {
  const { currentUser } = useCurrentUser();
  const { data, isLoading, isError } = useGetUserFollowingQuery(
    { id: currentUser?.id, offset: 0, limit: 10 },
    {
      skip: !currentUser?.id,
    },
  );

  const followings = data?.following?.map((f: any) => f.id) || [];

  return { followings, isLoading, isError };
};

export default useGetUserFollowings;
