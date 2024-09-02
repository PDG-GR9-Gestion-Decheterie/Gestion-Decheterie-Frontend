import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  APIProvider,
  Map,
  useMapsLibrary,
  useMap,
} from "@vis.gl/react-google-maps";
import OpenInFullIcon from "@mui/icons-material/OpenInFull";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import { getApiKey, getRamassages, getAdresse } from "../Endpoints";
import Layout from "../components/Layout";
import {
  Grid,
  Paper,
  Box,
  CircularProgress,
  Typography,
  Avatar,
  Stack,
  TextField,
  ListItem,
  ListItemAvatar,
  List,
} from "@mui/material";

export default function Itineraire() {
  const navigate = useNavigate();
  const [apiKey, setApiKey] = React.useState("");
  const [ramassages, setRamassages] = React.useState([]);
  const [addresses, setAddresses] = React.useState([]);
  const [dateSetted, setDateSetted] = React.useState(false);
  const [noRamassagesInDate, setNoRamassagesInDate] = React.useState(false);

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
  }, [navigate]);

  function handleDateChange(e) {
    setDateSetted(true);
    // Create an array of promises to get addresses
    const addressPromises = ramassages
      .filter((ramassage) => ramassage.date === e.target.value)
      .map((ramassage) =>
        getAdresse(ramassage.decheterie_fk_adresse).then((response) => {
          if (response.ok) {
            return response.json().then((data) => data.adresseData);
          } else {
            navigate("/error");
          }
        })
      );

    if (addressPromises.length === 0) {
      setNoRamassagesInDate(true);
      return;
    }

    setNoRamassagesInDate(false);

    // Wait for all address promises to resolve
    Promise.all(addressPromises).then((addresses) => {
      // Filter out any null results in case of errors
      const validAddresses = addresses.filter((address) => address !== null);
      // Remove duplicates
      const uniqueAddresses = Array.from(
        new Set(validAddresses.map((a) => a.id))
      ).map((id) => {
        return validAddresses.find((a) => a.id === id);
      });
      setAddresses(uniqueAddresses);
    });
  }

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

  if (!dateSetted || noRamassagesInDate) {
    return (
      <Layout
        title={"Itinéraire"}
        content={
          <Grid item xs={12}>
            <Paper sx={{ p: 2 }}>
              <List>
                <ListItem>
                  <ListItemAvatar>
                    <Avatar>
                      <CalendarMonthIcon />
                    </Avatar>
                  </ListItemAvatar>
                  <TextField
                    label="Date des ramassages"
                    type="date"
                    onChange={handleDateChange}
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                </ListItem>
                {noRamassagesInDate && (
                  <Typography variant="body2" color="error">
                    Aucun ramassage prévu pour cette date
                  </Typography>
                )}
              </List>
            </Paper>
          </Grid>
        }
      />
    );
  }

  return (
    <Layout
      title={"Itinéraire"}
      content={
        <Grid item xs={12}>
          <Paper sx={{ p: 2 }}>
            <List>
              <ListItem>
                <ListItemAvatar>
                  <Avatar>
                    <CalendarMonthIcon />
                  </Avatar>
                </ListItemAvatar>
                <TextField
                  label="Date des ramassages"
                  type="date"
                  onChange={handleDateChange}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </ListItem>
            </List>
            <div style={{ height: "68vh", width: "100%" }}>
              <APIProvider apiKey={apiKey}>
                <Map
                  defaultZoom={13}
                  defaultCenter={{ lat: 46.784372, lng: 6.642003 }}
                >
                  <Directions addresses={addresses} />
                </Map>
              </APIProvider>
            </div>
          </Paper>
        </Grid>
      }
    />
  );
}

function Directions({ addresses }) {
  const map = useMap();
  const routesLibrary = useMapsLibrary("routes");
  const [directionsService, setDirectionsService] = React.useState();
  const [directionsRenderer, setDirectionsRenderer] = React.useState();
  const [routes, setRoutes] = React.useState([]);
  const [routeIndex, setRouteIndex] = React.useState(0);
  const selected = routes[routeIndex];
  const leg = selected?.legs[0];

  // Initialize directions service and renderer
  useEffect(() => {
    if (!routesLibrary || !map) return;
    setDirectionsService(new routesLibrary.DirectionsService());
    setDirectionsRenderer(new routesLibrary.DirectionsRenderer({ map }));
  }, [routesLibrary, map, addresses]);

  // Use directions service
  useEffect(() => {
    if (!directionsService || !directionsRenderer) return;

    directionsService
      .route({
        origin: `${addresses[0].street} ${addresses[0].number}, ${addresses[0].postcode} ${addresses[0].city}`,
        destination: `${addresses[0].street} ${addresses[0].number}, ${addresses[0].postcode} ${addresses[0].city}`,
        travelMode: "DRIVING",
        provideRouteAlternatives: true,
        waypoints: addresses.slice(1).map((address) => ({
          location: `${address.street} ${address.number}, ${address.postcode} ${address.city}`,
          stopover: true,
        })),
        optimizeWaypoints: true,
      })
      .then((response) => {
        directionsRenderer.setDirections(response);
        setRoutes(response.routes);
      });

    return () => directionsRenderer.setMap(null);
  }, [directionsService, directionsRenderer, addresses]);

  // Update direction route
  useEffect(() => {
    if (!directionsRenderer) return;
    directionsRenderer.setRouteIndex(routeIndex);
  }, [routeIndex, directionsRenderer, addresses]);

  if (!leg) return null;

  return (
    <div
      style={{
        position: "absolute",
        width: "275px",
        top: "0px",
        right: "0px",
        padding: "1.25rem",
        margin: "0.25rem",
        backgroundColor: "white",
        borderRadius: "0.25rem",
        maxHeight: "80%",
        overflowY: "auto",
      }}
    >
      {selected.legs.map((leg, legIndex) => (
        <div key={legIndex}>
          <strong>
            De {leg.start_address.split(",")[0]} à{" "}
            {leg.end_address.split(",")[0]}
          </strong>
          <Stack
            spacing={2}
            direction="row"
            sx={{ alignItems: "center", paddingBottom: 2 }}
          >
            <Avatar sx={{ height: 30, width: 30 }}>
              <OpenInFullIcon />
            </Avatar>
            <Typography variant="body2" color="text.secondary">
              {leg.distance?.text}
            </Typography>
            <Avatar sx={{ height: 30, width: 30 }}>
              <AccessTimeIcon />
            </Avatar>
            <Typography variant="body2" color="text.secondary">
              {leg.duration?.text}
            </Typography>
          </Stack>
        </div>
      ))}
      <strong>
        Total:{" "}
        {(
          selected.legs.reduce((total, leg) => {
            const legDistance = leg.distance?.value || 0;
            return total + legDistance;
          }, 0) / 1000
        ).toFixed(1)}{" "}
        {/* Convert to kilometers if the distance is in meters */}
        km pour une durée de{" "}
        {(
          selected.legs.reduce((total, leg) => {
            const legDuration = leg.duration?.value || 0;
            return total + legDuration;
          }, 0) / 60
        ).toFixed(0)}{" "}
        {/* Convert to minutes if the duration is in seconds */}
        min
      </strong>
    </div>
  );
}
