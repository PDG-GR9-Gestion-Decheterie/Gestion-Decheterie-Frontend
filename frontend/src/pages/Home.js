import React, { useEffect } from "react";
import Layout from "../components/Layout";
import { Grid, Paper, Button } from "@mui/material";
import Typography from "@mui/material/Typography";

export default function Ramassages() {
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
