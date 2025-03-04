import { PersonAddOutlined, PersonRemoveOutlined } from "@mui/icons-material";
import { Box, IconButton, Typography, useTheme } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { setFriends } from "@/utils/state/state";
import FlexBetween from "../Style/FlexBetween";
import UserImage from "@/components/Style/UserImage";
import { AuthState } from "@/utils/interfaces/Auth";

interface FriendProps {
  friendId: string;
  name: string;
  subtitle?: string;
  userPicturePath: string;
}

export default function Friend({ friendId, name, subtitle, userPicturePath }: FriendProps) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { _id } = useSelector((state: AuthState) => state.user || { _id: null });
  const token = useSelector((state: AuthState) => state.token);
  const friends = useSelector((state: AuthState) => state.user?.friends);

  const { palette } = useTheme();

  const primaryDark = palette.primary.dark;
  const main = palette.neutral.main;
  const medium = palette.neutral.medium;

  const isFriend = Array.isArray(friends) ? friends.find((friend) => friend._id === friendId) : false;

  const patchFriend = async () => {
    const response = await fetch(`${import.meta.env.VITE_BACKEND_BASE_URL}/users/${_id}/${friendId}`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    dispatch(setFriends({ friends: data }));
  };

  return (
    <FlexBetween>
      <FlexBetween gap="1rem">
        <UserImage image={userPicturePath} size="55px" />
        <Box
          onClick={() => {
            navigate(`/social-media/profile/${friendId}`);
            navigate(0);
          }}
        >
          <Typography
            color={main}
            variant="h5"
            fontWeight="500"
            sx={{
              "&:hover": {
                color: palette.primary.light,
                cursor: "pointer",
              },
            }}
          >
            {name}
          </Typography>
          <Typography color={medium} fontSize="0.75rem">
            {subtitle}
          </Typography>
        </Box>
      </FlexBetween>
      <IconButton onClick={() => patchFriend()} sx={{ backgroundColor: palette.primary.light, p: "0.6rem" }}>
        {isFriend ? (
          <PersonRemoveOutlined sx={{ color: primaryDark }} />
        ) : (
          <PersonAddOutlined sx={{ color: primaryDark }} />
        )}
      </IconButton>
    </FlexBetween>
  );
}
