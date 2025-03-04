import { Box, Typography, useTheme } from "@mui/material";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import Friend from "../Friend/Friend";
import WidgetWrapper from "../Style/WidgetWrapper";
import { setFriends } from "@/utils/state/state";
import { AuthState } from "@/utils/interfaces/Auth";

interface FriendListProps {
  userId: string;
}

export default function FriendListWidget({ userId }: FriendListProps) {
  const dispatch = useDispatch();
  const { palette } = useTheme();

  const token = useSelector((state: AuthState) => state.token);
  const friends = useSelector((state: AuthState) => state.user?.friends || []);

  const getFriends = async () => {
    const response = await fetch(`${import.meta.env.VITE_BACKEND_BASE_URL}/users/${userId}/friends`, {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });

    const data = await response.json();
    dispatch(setFriends({ friends: data }));
  };

  useEffect(() => {
    getFriends();
  }, []); //eslint-disable-line react-hooks/exhaustive-deps

  return (
    <WidgetWrapper>
      <Typography color={palette.neutral.dark} variant="h5" fontWeight="500" sx={{ mb: "1.5rem" }}>
        Friend List
      </Typography>
      <Box display="flex" flexDirection="column" gap="1.5rem">
        {friends.length > 0 ? (
          friends.map((friend) => (
            <Friend
              key={friend._id}
              friendId={friend._id}
              name={`${friend.firstName} ${friend.lastName}`}
              subtitle={friend.occupation}
              userPicturePath={friend.picturePath}
            />
          ))
        ) : (
          <p>You have no friends :(</p>
        )}
      </Box>
    </WidgetWrapper>
  );
}
