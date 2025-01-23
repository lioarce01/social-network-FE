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
  setLoading,
} from "@/redux/slices/postSlice";
import useSocket from "@/hooks/useSocket";
import { ArrowUp, Loader2 } from "lucide-react";

const Posts = () => {
  const dispatch = useDispatch<AppDispatch>();
  const posts = useSelector((state: RootState) => selectAllPosts(state) || []);
  const [showNewPostsButton, setShowNewPostsButton] = useState(false);
  const [scrollPosition, setScrollPosition] = useState(0);
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

  const navbarHeight = 40; // Altura de la navbar
  const initialTop = 260; // Espacio adicional entre la navbar y el botón
  const buttonTop =
    scrollPosition > initialTop - navbarHeight ? navbarHeight : initialTop;

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
    dispatch(setLoading(true)); // Activa el loading
    await refetchRecentPosts(); // Re-ejecuta la consulta para obtener los posts recientes
    await refetchPosts(); // Re-ejecuta la consulta para obtener todos los posts
    dispatch(setLoading(false)); // Desactiva el loading
    setShowNewPostsButton(false); // Oculta el botón inmediatamente
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

  useEffect(() => {
    const handleScroll = () => {
      setScrollPosition(window.scrollY); // Actualiza la posición del scroll
    };

    window.addEventListener("scroll", handleScroll); // Escucha el evento scroll
    return () => {
      window.removeEventListener("scroll", handleScroll); // Limpia el evento
    };
  }, []);

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
        <div
          className="w-full flex justify-center fixed max-w-[635px] transition-all duration-500 ease-in-out"
          style={{ top: `${buttonTop}px` }}
        >
          <button
            disabled={loading || isRecentPostsLoading || isRecentPostsFetching}
            className="self-center bg-neutral-800 px-3 py-2 rounded-full text-white text-sm shadow-neutral-500 shadow-md hover:bg-neutral-700 transition-all duration-300"
            onClick={handleNewPostsClick}
          >
            {loading ? (
              <div className="flex items-center">
                <Loader2 className="animate-spin h-5 w-5" />
              </div>
            ) : (
              <div className="flex flex-row items-center space-x-1">
                <ArrowUp className="h-4 w-4" />
                <span>New Posts</span>
              </div>
            )}
          </button>
        </div>
      )}
    </div>
  );
};
export default Posts;
