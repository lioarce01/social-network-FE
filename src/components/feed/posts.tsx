"use client";
import React, { useState, useEffect } from "react";
import { useGetPostsQuery, useGetRecentPostsQuery } from "@/redux/api/postApi";
import PostCard from "./postCard";
import useCurrentUser from "@/hooks/useCurrentUser";
import { PostFilters } from "./postFilters";
import PostSkeleton from "./postSkeleton";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import {
  addPosts,
  selectAllPosts,
  selectLoading,
  setPosts,
  setTotalCount,
  selectNoMorePosts,
  setNoMorePosts,
} from "@/redux/slices/postSlice";
import useSocket from "@/hooks/useSocket";

const Posts = () => {
  const dispatch = useDispatch<AppDispatch>();
  const posts = useSelector((state: RootState) => selectAllPosts(state) || []);
  const [showNewPostsButton, setShowNewPostsButton] = useState(false);
  const noMorePosts = useSelector(selectNoMorePosts);
  const { currentUser } = useCurrentUser();

  useSocket("http://localhost:4000", setShowNewPostsButton);

  const [queryParams, setQueryParams] = useState({
    offset: 0,
    limit: 5,
    sortBy: "createdAt",
    sortOrder: "desc",
  });

  const {
    data,
    isLoading,
    isFetching,
    refetch: refetchPosts,
  } = useGetPostsQuery(queryParams);
  const loading = useSelector(selectLoading);

  const [lastPostDate, setLastPostDate] = useState(new Date().toISOString());
  const {
    data: recentPostsData,
    isLoading: isRecentPostsLoading,
    isFetching: isRecentPostsFetching,
    refetch: refetchRecentPosts, // Función para re-ejecutar la consulta
  } = useGetRecentPostsQuery(
    { lastPostDate, limit: 5 }, // Parámetros para el endpoint
    { skip: !showNewPostsButton }, // Solo ejecutar cuando showNewPostsButton es true
  );

  console.log("recent post data:", recentPostsData);

  // Efecto para agregar los nuevos posts al estado global
  useEffect(() => {
    if (recentPostsData && recentPostsData.posts.length > 0) {
      // Agrega los nuevos posts al estado global
      console.log(
        "Agregando nuevos posts al estado global:",
        recentPostsData.posts,
      );
      dispatch(addPosts(recentPostsData.posts));
      // Actualiza la fecha del último post
      console.log(
        "Actualizando la fecha del último post:",
        recentPostsData.posts[0].createdAt,
      );
      setLastPostDate(
        new Date(recentPostsData.posts[0].createdAt).toISOString(),
      );
    }
  }, [recentPostsData, dispatch]);

  // Manejador de clics para el botón "Ver nuevos posts"
  const handleNewPostsClick = async () => {
    console.log("Haciendo clic en 'Ver nuevos posts'");
    setShowNewPostsButton(false); // Oculta el botón inmediatamente
    await refetchRecentPosts(); // Re-ejecuta la consulta para obtener los posts recientes
    await refetchPosts();
  };

  // Efecto para manejar la carga inicial de posts
  useEffect(() => {
    if (data && data.posts) {
      if (data.posts.length === 0) {
        dispatch(setNoMorePosts(true));
      } else {
        if (queryParams.offset === 0) {
          dispatch(setPosts(data.posts));
        } else {
          dispatch(addPosts(data.posts));
        }
        dispatch(setTotalCount(data.totalCount));
      }
    }
  }, [data, dispatch, queryParams.offset]);

  // Lógica del scroll infinito
  const handleScroll = () => {
    const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
    if (
      scrollHeight - scrollTop <= clientHeight + 100 &&
      !isFetching &&
      !noMorePosts
    ) {
      setQueryParams((prevParams) => ({
        ...prevParams,
        offset: prevParams.offset + prevParams.limit,
      }));
    }
  };

  useEffect(() => {
    if (!noMorePosts) {
      window.addEventListener("scroll", handleScroll);
    }
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [isFetching, noMorePosts]);

  if (isLoading || (isFetching && posts.length === 0)) {
    return (
      <div className="space-y-4">
        {[...Array(3)].map((_, index) => (
          <PostSkeleton key={index} />
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <PostFilters
        sortBy={queryParams.sortBy}
        sortOrder={queryParams.sortOrder}
        onSortChange={(sortBy, sortOrder) => {
          setQueryParams({
            ...queryParams,
            sortBy,
            sortOrder,
            offset: 0,
          });
          dispatch(setNoMorePosts(false));
        }}
      />
      <div className="space-y-4">
        {posts.length > 0
          ? posts.map((post: any) => (
              <PostCard key={post.id} post={post} currentUser={currentUser} />
            ))
          : !isFetching && (
              <div className="text-center text-gray-500">No posts found</div>
            )}
      </div>
      {isFetching ||
        (loading && <div className="space-y-4">{<PostSkeleton />}</div>)}
      {noMorePosts && posts.length > 0 && (
        <div className="text-center text-gray-500">No more posts available</div>
      )}
      {showNewPostsButton && (
        <button
          disabled={isRecentPostsLoading || isRecentPostsFetching}
          className="fixed bottom-4 right-4 bg-blue-500 text-white px-4 py-2 rounded-full shadow-lg hover:bg-blue-600"
          onClick={handleNewPostsClick}
        >
          Ver nuevos posts
        </button>
      )}
    </div>
  );
};
export default Posts;
