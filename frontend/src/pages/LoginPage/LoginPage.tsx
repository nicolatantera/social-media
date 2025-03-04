import { Box, Typography, useTheme, useMediaQuery } from "@mui/material";
import Form from "./Form";

import "./LoginPage.scss";

export default function LoginPage() {
  const theme = useTheme();
  const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");

  return (
    <Box>
      <Box
        sx={{
          width: "100%",
          backgroundColor: theme.palette.background.alt,
          p: "1rem 6%",
          textAlign: "center",
        }}
        width="100%"
      >
        <Typography fontWeight="bold" fontSize="32px" color="primary">
          My Social Media
        </Typography>
      </Box>

      <Box
        sx={{
          width: isNonMobileScreens ? "50%" : "93%",
          p: "2rem",
          m: "2rem auto",
          borderRadius: "1.5rem",
          backgroundColor: theme.palette.background.alt,
        }}
      >
        <Typography fontWeight="500" variant="h5" sx={{ mb: "1.5rem" }}>
          Welcome to my Social Media Website!!!
        </Typography>
        <Form></Form>
      </Box>
    </Box>
  );
}
