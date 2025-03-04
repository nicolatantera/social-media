import { Box, useMediaQuery } from "@mui/material";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import Navbar from "@/components/Navbar/Navbar";
import FriendListWidget from "@/components/Widgets/FriendListWidget";
import MyPostWidget from "@/components/Widgets/MyPostWidget";
import PostsWidget from "@/components/Widgets/PostsWidget";
import UserWidget from "@/components/Widgets/UserWidget";

import { AuthState } from "@/utils/interfaces/Auth";
import { User } from "@/utils/interfaces/User";

export default function ProfilePage() {
  const [user, setUser] = useState<User | null>(null);

  const { userId } = useParams();

  const token = useSelector((state: AuthState) => state.token);
  const isNonMobileScreens = useMediaQuery("(min-width:1000px)");

  const getUser = async () => {
    const response = await fetch(`${import.meta.env.VITE_BACKEND_BASE_URL}/users/${userId}`, {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });

    const data = await response.json();
    setUser(data);
  };

  useEffect(() => {
    getUser();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  if (!user) return null;

  return (
    <>
      {userId && user ? (
        <Box>
          <Navbar />
          <Box
            width="100%"
            p="2rem 6%"
            display={isNonMobileScreens ? "flex" : "block"}
            gap="2rem"
            justifyContent="center"
          >
            <Box flexBasis={isNonMobileScreens ? "26%" : undefined}>
              <UserWidget userId={userId} picturePath={user.picturePath} />
              <Box m="2rem 0" />
              <FriendListWidget userId={userId} />
            </Box>
            <Box flexBasis={isNonMobileScreens ? "42%" : undefined} mt={isNonMobileScreens ? undefined : "2rem"}>
              <MyPostWidget picturePath={user.picturePath} />
              <Box m="2rem 0" />
              <PostsWidget userId={userId} isProfile />
            </Box>
          </Box>
        </Box>
      ) : (
        <p>You tried to snitch into another user profile huh!</p>
      )}
    </>
  );
}
