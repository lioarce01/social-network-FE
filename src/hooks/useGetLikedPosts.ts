import { useGetUserLikedPostsQuery } from "@/redux/api/postApi";
import useCurrentUser from "./useCurrentUser";

const useGetLikedPosts = () => {
  const { currentUser } = useCurrentUser();
  const { data, isLoading, isError } = useGetUserLikedPostsQuery(
    {
      id: currentUser?.id,
    },
    {
      skip: !currentUser,
    },
  );

  const likedPosts = data?.likedPosts || [];

  return { likedPosts, isLoading, isError };
};

export default useGetLikedPosts;
