import React, { useEffect } from "react";
import { APIProvider, Map } from "@vis.gl/react-google-maps";
import { useNavigate } from "react-router-dom";
import { getApiKey } from "../Endpoints";
import Layout from "../components/Layout";
import { Grid, Paper, Box, CircularProgress } from "@mui/material";

export default function Itineraire() {
  const navigate = useNavigate();
  const [apiKey, setApiKey] = React.useState("");

  useEffect(() => {
    const fetchApiKey = async () => {
      const response = await getApiKey();
      if (response.ok) {
        const data = await response.json();
        setApiKey(data.APIKey);
      } else if (response.status === 401) {
        navigate("/login");
      } else {
        navigate("/error");
      }
    };
    fetchApiKey();
  }, [navigate]);

  if (!apiKey) {
    return (
      <Layout
        title="Chargement..."
        content={
          <Box style={{ textAlign: "center", marginTop: "5rem" }}>
            <CircularProgress />
          </Box>
        }
      />
    );
  }

  return (
    <Layout
      title={"Itinéraire"}
      content={
        <Grid item xs={12}>
          <Paper sx={{ p: 2, display: "flex", flexDirection: "column" }}>
            <div style={{ height: "80vh", width: "100%" }}>
              <APIProvider apiKey={apiKey}>
                <Map
                  defaultZoom={13}
                  defaultCenter={{ lat: 46.784372, lng: 6.642003 }}
                />
              </APIProvider>
            </div>
          </Paper>
        </Grid>
      }
    />
  );
}
