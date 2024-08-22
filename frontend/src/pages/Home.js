import React from "react";
import Layout from "../components/Layout";
import { Grid, Box, Avatar } from "@mui/material";
import Typography from "@mui/material/Typography";

export default function Home() {
  return (
    <Layout
      title={"Home"}
      content={
        <Grid item xs={12}>
          <Box
            sx={{
              marginTop: 8,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar
              sx={{ width: 250, height: 250 }}
              src="DIRTS_logo.png"
              alt="DIRTS-LOGO"
            />
            <Typography
              component="h1"
              variant="h5"
              color="primary"
              sx={{ fontSize: 50 }}
            >
              Bienvenue !
            </Typography>
          </Box>
        </Grid>
      }
    />
  );
}
