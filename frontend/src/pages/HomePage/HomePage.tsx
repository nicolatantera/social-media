import { Box, useMediaQuery } from "@mui/material";
import "./HomePage.scss";
import Navbar from "@/components/Navbar/Navbar";
import { useSelector } from "react-redux";
import { AuthState } from "@/utils/interfaces/Auth";

import UserWidget from "@/components/Widgets/UserWidget";
import MyPostWidget from "@/components/Widgets/MyPostWidget";
import PostsWidget from "@/components/Widgets/PostsWidget";
import AdvertWidget from "@/components/Widgets/AdvertWidget";
import FriendListWidget from "@/components/Widgets/FriendListWidget";

export default function HomePage() {
  const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");
  const { _id, picturePath } = useSelector((state: AuthState) => state.user || { _id: null, picturePath: null });

  return (
    <>
      {_id && picturePath ? (
        <Box>
          <Navbar />
          <Box
            width="100%"
            p="2rem 6%"
            display={isNonMobileScreens ? "flex" : "block"}
            gap="0.5rem"
            justifyContent="space-between"
          >
            <Box flexBasis={isNonMobileScreens ? "26%" : undefined}>
              <UserWidget userId={_id} picturePath={picturePath} />
            </Box>
            <Box flexBasis={isNonMobileScreens ? "42%" : undefined} mt={isNonMobileScreens ? undefined : "2rem"}>
              <MyPostWidget picturePath={picturePath} />
              <PostsWidget userId={_id} />
            </Box>
            {isNonMobileScreens && (
              <Box flexBasis="26%">
                <AdvertWidget />
                <Box m="2rem 0" />
                <FriendListWidget userId={_id} />
              </Box>
            )}
          </Box>
        </Box>
      ) : (
        <p>You tried to snitch huh!</p>
      )}
    </>
  );
}
