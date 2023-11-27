import { createTheme } from "@mui/material";

declare module "@mui/material/styles" {
  interface TypographyVariants {
    caption1: React.CSSProperties;
    overline2: React.CSSProperties;
  }
  interface TypographyVariantsOptions {
    caption1?: React.CSSProperties;
    overline2?: React.CSSProperties;
  }
  interface Palette {
    textColor: {
      lowEmphasis: string;
      mediumEmphasis: string;
      highEmphasis: string;
      white: string;
      black: string;
    };
    structural: {
      background1: string;
      background2: string;
      background3: string;
      background4: string;
      background5: string;
      scrollTrack?: string;
    };
    gradient: {
      main: string;
      stroke1: string;
    };
  }
  interface PaletteOptions {
    textColor: {
      lowEmphasis: string;
      mediumEmphasis: string;
      highEmphasis: string;
      white: string;
      black: string;
    };
    structural: {
      background1: string;
      background2: string;
      background3: string;
      background4: string;
      background5: string;
      scrollTrack?: string;
    };
    gradient: {
      main: string;
      stroke1: string;
    };
  }
  interface PaletteColor {
    primary100: string;
    primary500: string;
    primary300: string;
  }
  interface SimplePaletteColorOptions {
    primary100?: string;
    primary500?: string;
    primary300?: string;
  }
}
declare module "@mui/material/Typography" {
  interface TypographyPropsVariantOverrides {
    caption1: true;
    overline2: true;
  }
}
const theme = createTheme({
  spacing: 4,
  components: {
     MuiOutlinedInput: {
      styleOverrides: {
        root: {
          "& .MuiOutlinedInput-notchedOutline": {
            borderColor: "transparent"
          },
          "&:hover .MuiOutlinedInput-notchedOutline": {
            borderColor: "transparent",
          },
          "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
            borderColor: "transparent",
          },
          ".MuiInputBase-input.MuiOutlinedInput-input": {
            fontFamily: "Manrope-Regular",
            fontSize:"14px",
            fontWeight:400
          }
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        containedPrimary: {
          "&.Mui-disabled": {
            backgroundColor: "#F2EAFD", 
          },
          boxShadow: 'none'
        },
      },
    },
    MuiLinearProgress: {
      styleOverrides: {
        barColorPrimary: {
          backgroundColor: "#0B69FF",
        },
      },
    },
    MuiButtonBase: {
      styleOverrides: {
        root: {
          padding: 0,
        },
      },
    },
    MuiIconButton: {
      styleOverrides: {
        root: {
          padding: 0,
        },
      },
    },
    MuiSelect: {
      styleOverrides: {
        root: {
          "& .MuiOutlinedInput-notchedOutline": {
            borderColor: "transparent",
          },
          "&:hover .MuiOutlinedInput-notchedOutline": {
            borderColor: "transparent",
          },
          "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
            borderColor: "transparent",
          },
        },
      },
    },
    MuiCardContent: {
      styleOverrides: {
        root: {
          padding: "0px",
        },
      },
    },
  },
  typography: {
    h1: {
      fontFamily: "Manrope-SemiBold",
      fontSize: "56px",
      lineHeight: "76.5px",
      fontWeight: "600",
    },
    h2: {
      fontFamily: "Manrope-SemiBold",
      fontSize: "24px",
      lineHeight: "32px",
      fontWeight: "600",
    },
    h3: {
      fontFamily: "Manrope-SemiBold",
      fontSize: "20px",
      lineHeight: "28px",
      fontWeight: "600",
    },
    h6: {
      fontFamily: "Manrope-Regular",
      fontSize: "12px",
      lineHeight: "20px",
      fontWeight: "400",
    },
    subtitle1: {
      fontFamily: "Manrope-Regular",
      fontSize: "18px",
      lineHeight: "24px",
      fontWeight: "400",
    },
    subtitle2: {
      fontFamily: "Manrope-Regular",
      fontSize: "16px",
      lineHeight: "26px",
      fontWeight: "400",
    },
    body1: {
      fontFamily: "Manrope-Bold",
      fontSize: "14px",
      lineHeight: "22px",
      fontWeight: "600",
    },
    body2: {
      fontFamily: "Manrope-Regular",
      fontSize: "14px",
      lineHeight: "22px",
      fontWeight: "400",
    },
    caption1: {
      fontFamily: "Manrope-Bold",
      fontSize: "12px",
      lineHeight: "20px",
      fontWeight: "700",
    },
    overline: {
      fontFamily: "Manrope-Regular",
      fontSize: "10px",
      lineHeight: "16px",
      fontWeight: "600",
      textTransform: "none",
    },
    overline2: {
      fontFamily: "Manrope-Regular",
      fontSize: "9px",
      lineHeight: "7px",
      fontWeight: "500",
      textTransform: "none",
    },
    button: {
      textTransform: "none",
    },
  },
  palette: {
    primary: {
      main: "#8B3DFF",
      primary100: "#F2EAFD",
      primary500: "#8B3DFF",
      primary300: "#7F56DA",
    },
    textColor: {
      lowEmphasis: "#707477",
      mediumEmphasis: "#959596",
      highEmphasis: "#D3D4D4",
      white: "#FFFFFF",
      black: "#2A3238",
    },
    grey: {
      100: "#BFC4C8",
      200: "#959596",
      300: "#343536",
      400: "#252627",
      500: "#18191B",
    },
    structural: {
      background1: "#EC3A3A",
      background2: "#EBECF0",
      background3: "#F4F5F5",
      background4: "#0B69FF",
      background5: "#D7DFE980",
      scrollTrack: "#F0F0F0",
    },
    gradient: {
      stroke1: "#E3E4E6",
      main: "linear-gradient(166deg, #05BDCD 10.18%, #7C2BE8 108.2%);",
    },
  },
});

export default theme;
