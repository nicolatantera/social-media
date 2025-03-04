import { Palette, PaletteOptions } from "@mui/material/styles";

declare module "@mui/material/styles" {
  interface TypeBackground {
    alt: string;
  }

  interface Palette {
    primary: {
      dark: string;
      main: string;
      light: string;
    };
    neutral: {
      dark: string;
      main: string;
      mediumMain: string;
      medium: string;
      light: string;
    };
  }

  interface PaletteOptions {
    primary: {
      dark: string;
      main: string;
      light: string;
    };
    neutral: {
      dark: string;
      main: string;
      mediumMain: string;
      medium: string;
      light: string;
    };
  }
}
