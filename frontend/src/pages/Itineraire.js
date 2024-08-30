import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  APIProvider,
  Map,
  useMapsLibrary,
  useMap,
} from "@vis.gl/react-google-maps";
import { getApiKey, getRamassages, getAdresse } from "../Endpoints";
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
                >
                  <Directions />
                </Map>
              </APIProvider>
            </div>
          </Paper>
        </Grid>
      }
    />
  );
}

function Directions() {
  const map = useMap();
  const routesLibrary = useMapsLibrary("routes");
  const [directionsService, setDirectionsService] = React.useState();
  const [directionsRenderer, setDirectionsRenderer] = React.useState();
  const [routes, setRoutes] = React.useState([]);
  const [routeIndex, setRouteIndex] = React.useState(0);
  const selected = routes[routeIndex];
  const leg = selected?.legs[0];
  const [ramassages, setRamassages] = React.useState([]);
  const navigate = useNavigate();

  // Initialize directions service and renderer
  useEffect(() => {
    if (!routesLibrary || !map) return;
    setDirectionsService(new routesLibrary.DirectionsService());
    setDirectionsRenderer(new routesLibrary.DirectionsRenderer({ map }));

    const fetchRamassages = async () => {
      const response = await getRamassages();
      if (response.ok) {
        const data = await response.json();
        setRamassages(data.ramassagesData);
      } else if (response.status === 401) {
        navigate("/login");
      } else {
        navigate("/error");
      }
    };
    fetchRamassages();
  }, [routesLibrary, map, navigate]);

  // Use directions service
  useEffect(() => {
    if (!directionsService || !directionsRenderer) return;

    directionsService
      .route({
        origin: "Lausanne",
        destination: "Payerne",
        travelMode: "DRIVING",
        provideRouteAlternatives: true,
        waypoints: [
          {
            location: `moudon`,
            stopover: true,
          },
        ],
      })
      .then((response) => {
        directionsRenderer.setDirections(response);
        setRoutes(response.routes);
      });

    return () => directionsRenderer.setMap(null);
  }, [directionsService, directionsRenderer]);

  // Update direction route
  useEffect(() => {
    if (!directionsRenderer) return;
    directionsRenderer.setRouteIndex(routeIndex);
  }, [routeIndex, directionsRenderer]);

  if (!leg) return null;

  return (
    <div className="directions">
      <h2>{selected.summary}</h2>

      {/* Display details for each leg of the route */}
      {selected.legs.map((leg, legIndex) => (
        <div key={legIndex}>
          <p>
            {leg.start_address.split(",")[0]} to {leg.end_address.split(",")[0]}
          </p>
          <p>Distance: {leg.distance?.text}</p>
          <p>Duration: {leg.duration?.text}</p>
        </div>
      ))}

      <h2>Other Routes</h2>
      <ul>
        {routes.map((route, index) => (
          <li key={route.summary}>
            <button onClick={() => setRouteIndex(index)}>
              {route.summary}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
