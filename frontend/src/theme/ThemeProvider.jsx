import {
  ThemeProvider as MuiThemeProvider,
  createTheme,
} from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

const theme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#1976d2", //"French Blue"
    },
    secondary: {
      main: "#f50057", //"Red (Crayola)"
    },
    background: {
      default: "#121212", // Dark background
      paper: "#1e1e1e", // Darker paper background
    },
    text: {
      primary: "#ffffff", // White text
      secondary: "#bbbbbb", // Light gray text
    },
    draftStatus: {
      picked: "#f50057", //secondary.main
      selected: "#33B88B", //tier.green
      available: "#1976d2", //primary.main
    },
    positions: {
      qb: "#c7557d", //"Fuchsia rose"
      rb: "#5cc0a0", //"Mint"
      wr: "#11a0c7", //"Blue Green"
      te: "#d6824a", //"Caramel"
      def: "#9a5648", //"Redwood"
    },
  },
  shape: {
    borderRadius: 4,
  },
  typography: {
    fontFamily: "Roboto, sans-serif",
    h1: {
      fontSize: "2.2rem",
      fontWeight: 300,
    },
    h2: {
      fontSize: "2rem",
      fontWeight: 300,
    },
    h3: {
      fontSize: "1.8rem",
      fontWeight: 400,
    },
    h4: {
      fontSize: "1.6rem",
      fontWeight: 400,
    },
    h5: {
      fontSize: "1.4rem",
      fontWeight: 400,
    },
    h6: {
      fontSize: "1.2rem",
      fontWeight: 500,
    },
    body1: {
      fontSize: "1rem",
      fontWeight: 400,
    },
    body2: {
      fontSize: "0.875rem",
      fontWeight: 400,
    },
    button: {
      fontSize: "0.875rem",
      fontWeight: 500,
    },
  },
});

const ThemeProvider = ({ children }) => {
  return (
    <MuiThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </MuiThemeProvider>
  );
};

export default ThemeProvider;
