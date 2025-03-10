import { Typography, useTheme } from "@mui/material";

import FlexBetween from "../Style/FlexBetween";
import WidgetWrapper from "../Style/WidgetWrapper";

export default function AdvertWidget() {
  const { palette } = useTheme();
  const dark = palette.neutral.dark;
  const main = palette.neutral.main;
  const medium = palette.neutral.medium;

  return (
    <WidgetWrapper>
      <FlexBetween>
        <Typography color={dark} variant="h5" fontWeight="500">
          Sponsored
        </Typography>
        <Typography color={medium}>Create Ad</Typography>
      </FlexBetween>
      <img
        src={`${import.meta.env.VITE_BACKEND_BASE_URL}/assets/info4.jpeg`}
        alt="advert"
        width="100%"
        height="auto"
        style={{ borderRadius: "0.75rem", margin: "0.75rem, 0" }}
      />
      <FlexBetween>
        <Typography color={main}>MikaCosmetics</Typography>
        <Typography color={medium}>mikacosmetics.com</Typography>
      </FlexBetween>
      <Typography color={medium} margin="0.5rem 0">
        Your pathway to stunning and immaculate beauty, and made sure your skin is exfoliating skin and shining like
        light.
      </Typography>
    </WidgetWrapper>
  );
}
