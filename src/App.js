import {
  createMuiTheme,
  ThemeProvider,
  makeStyles,
} from "@material-ui/core/styles";
import React, { useState } from "react";
import {
  CssBaseline,
  Container,
  Grid,
  Typography,
  Paper,
  IconButton,
  InputBase,
  CircularProgress,
} from "@material-ui/core";
import "@fontsource/pacifico";
import Cards from "./Components/Cards";
import SearchIcon from "@material-ui/icons/Search";
import Brightness4Icon from "@material-ui/icons/Brightness4";
import Brightness7Icon from "@material-ui/icons/Brightness7";
import axios from "axios";

const useStyles = makeStyles({
  mainTitle: {
    marginTop: 25,
    "&:hover": {
      cursor: "pointer",
    },
    "-webkit-touch-callout": "none",
    "-webkit-user-select": "none",
    "-khtml-user-select": "none",
    "-moz-user-select": "none",
    "-ms-user-select": "none",
    "user-select": "none",
  },
  root: {
    padding: "2px 4px",
    display: "flex",
    alignItems: "center",
    width: "100%",
    marginTop: 50,
  },
  input: {
    flex: 1,
    padding: "0 2px",
  },
  iconButton: {
    padding: 10,
  },
  divider: {
    height: 28,
    margin: 4,
  },
  resultGrid: {
    marginTop: 50,
  },
});

export default function App() {
  const [darkMode, setdarkMode] = useState(true);
  const [word, setWord] = useState("");
  const [response, setResponse] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const theme = createMuiTheme({
    palette: {
      type: darkMode ? "dark" : "light",
    },
  });

  const fontTheme = createMuiTheme({
    typography: {
      fontFamily: ["Pacifico"].join(","),
    },
  });

  const handleThemeChange = () => {
    setdarkMode(!darkMode);
  };

  const setInput = (data) => {
    setWord(data);
  };

  const classes = useStyles();

  const search = (e) => {
    e.preventDefault();
    setIsLoading(true);
    axios
      .get(`https://api.dictionaryapi.dev/api/v2/entries/en_US/${word}`)
      .then((response) => {
        setResponse(response.data.slice(0, 1));
        setWord("");
        setIsLoading(false);
      })
      .catch(() => {
        setIsLoading(false);
        setWord("");
        setResponse("");
      });
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container maxWidth="lg">
        <Grid
          container
          spacing={0}
          direction="column"
          alignItems="center"
          justify="center"
        >
          <Grid item lg={12}>
            <ThemeProvider theme={fontTheme}>
              <Typography
                className={classes.mainTitle}
                variant="h2"
                onClick={handleThemeChange}
              >
                dictionary
              </Typography>
            </ThemeProvider>
          </Grid>

          <Grid item>
            <IconButton onClick={handleThemeChange}>
              {darkMode ? <Brightness4Icon /> : <Brightness7Icon />}
            </IconButton>
          </Grid>

          <Grid item xs={12} sm={8} md={8} lg={8} style={{ width: "100%" }}>
            <Paper
              component="form"
              onSubmit={search}
              elevation={3}
              className={classes.root}
            >
              <InputBase
                className={classes.input}
                placeholder="Search for your word"
                inputProps={{ "aria-label": "search for your word" }}
                value={word}
                onChange={(e) => {
                  e.preventDefault();
                  setInput(e.target.value);
                }}
              />
              <IconButton
                type="submit"
                className={classes.iconButton}
                aria-label="search"
              >
                <SearchIcon />
              </IconButton>
            </Paper>
          </Grid>
        </Grid>

        <Grid
          direction="column"
          alignItems="center"
          justify="center"
          className={classes.resultGrid}
        >
          <Grid item xs={12}>
            {response !== "" && !isLoading
              ? response.map((obj, i) => {
                  return <Cards key={i} response={obj} />;
                })
              : ""}
            {isLoading ? <CircularProgress /> : ""}
          </Grid>
        </Grid>
      </Container>
    </ThemeProvider>
  );
}
