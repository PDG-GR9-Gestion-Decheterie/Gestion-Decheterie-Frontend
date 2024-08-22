import React from "react";
import Layout from "../components/Layout";
import { Grid, Paper } from "@mui/material";
import Typography from "@mui/material/Typography";

export default function Home() {
  return (
    <Layout
      title={"Home"}
      content={
        <Grid item xs={12}>
          <Paper sx={{ p: 2, display: "flex", flexDirection: "column" }}>
            <Typography
              component="h2"
              variant="h6"
              color="primary"
              gutterBottom
            >
              Bienvenue !
            </Typography>
          </Paper>
        </Grid>
      }
    />
  );
}
