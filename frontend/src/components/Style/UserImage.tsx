import { Box } from "@mui/material";

interface UserImageProps {
  image: string;
  size?: string;
}

export default function UserImage({ image, size = "60px" }: UserImageProps) {
  return (
    <Box width={size} height={size}>
      <img
        src={`${import.meta.env.VITE_BACKEND_BASE_URL}/assets/${image}`}
        alt="user"
        style={{ objectFit: "cover", borderRadius: "50%" }}
        width={size}
        height={size}
      />
    </Box>
  );
}
