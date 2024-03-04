// import theme from "theme";

import { Loader, MantineThemeOverride } from "@mantine/core";
import { CssLoader } from "./components/BaseComponents/CustomLoader/CssLoader";

// Mantine theme
const theme: MantineThemeOverride = {
  // colorScheme: "light",
  fontFamily: "La",
  primaryColor: "blue",
  colors: {
    blue: [
      "#f1ecfe",
      "#ddd3f7",
      "#b9a2f2",
      "#9270ef",
      "#7344eb",
      "#5f2be9",
      "#541eea",
      "#4613d0",
      "#3d10ba",
      "#330aa3",
    ],
    // ...other colors
  },

  shadows: {
    xl: "0px 0px 40px 0px rgba(5, 40, 10, 0.25)",
  },
  radius: {
    xl: "10px",
  },
  components: {
    Paper: {
      styles: {
        root: {
          borderRadius: "18px",
          boxShadow: "10 40px 60px rgba(0, 0, 0, 1)",
        },
      },
    },
    Card: {
      styles: {
        root: {
          borderRadius: "18px",
          border: "1px solid #330aa3",
          boxShadow: "0 10px 40px rgba(0, 0, 0, 0.1)",
        },
      },
    },
    NavLink: {
      styles: {
        root: {
          borderRadius: "18px",
          boxShadow: "10 40px 60px rgba(0, 0, 0, 1)",
        },
      },
    },
    Loader: Loader.extend({
      defaultProps: {
        loaders: { ...Loader.defaultLoaders, custom: CssLoader },
        type: "custom",
      },
    }),
  },
};

export default theme;
