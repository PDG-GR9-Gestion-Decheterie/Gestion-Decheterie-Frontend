import React from "react";
import { Box, Container, Typography, Button } from "@mui/material";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const defaultTheme = createTheme({
  palette: {
    primary: {
      light: "#1a8b31",
      main: "#1a8b31",
      dark: "#16772a",
      contrastText: "#fff",
    },
  },
});

export default function Error() {
  return (
    <ThemeProvider theme={defaultTheme}>
      <Container
        maxWidth="sm"
        style={{ textAlign: "center", marginTop: "5rem" }}
      >
        <Box display="flex" flexDirection="column" alignItems="center">
          <ErrorOutlineIcon style={{ fontSize: 80, color: "#f44336" }} />
          <Typography variant="h3" component="h1" gutterBottom>
            Oops!
          </Typography>
          <Typography variant="h6" component="p" gutterBottom>
            Une erreur est survenue.
          </Typography>
          <Button variant="contained" href="/login">
            Retour à l'accueil
          </Button>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
