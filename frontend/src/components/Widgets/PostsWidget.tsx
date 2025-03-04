import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPosts } from "@/utils/state/state";
import PostWidget from "./PostWidget";
import { AuthState } from "@/utils/interfaces/Auth";

interface PostsWidgetProps {
  userId: string;
  isProfile?: true | false;
}

export default function PostsWidget({ userId, isProfile = false }: PostsWidgetProps) {
  const dispatch = useDispatch();

  const posts = useSelector((state: AuthState) => state.posts);
  const token = useSelector((state: AuthState) => state.token);

  const getPosts = async () => {
    const response = await fetch(`${import.meta.env.VITE_BACKEND_BASE_URL}/posts`, {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });

    const data = await response.json();
    dispatch(setPosts({ posts: data }));
  };

  const getUserPosts = async () => {
    const response = await fetch(`${import.meta.env.VITE_BACKEND_BASE_URL}/posts/${userId}`, {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });

    const data = await response.json();
    dispatch(setPosts({ posts: data }));
  };

  useEffect(() => {
    if (isProfile) {
      getUserPosts();
    } else {
      getPosts();
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <>
      {Array.isArray(posts) ? (
        posts.map(
          ({
            _id,
            userId,
            firstName,
            lastName,
            description = "",
            location = "",
            picturePath = "",
            userPicturePath = "",
            likes,
            comments,
          }) => (
            <PostWidget
              key={_id}
              postId={_id}
              postUserId={userId}
              name={`${firstName} ${lastName}`}
              description={description}
              location={location}
              picturePath={picturePath}
              userPicturePath={userPicturePath}
              likes={likes}
              comments={comments}
            />
          )
        )
      ) : (
        <p>No posts available</p>
      )}
    </>
  );
}
