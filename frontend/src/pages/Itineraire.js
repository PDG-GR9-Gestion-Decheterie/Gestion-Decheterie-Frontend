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
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import {
  getApiKey,
  getRamassages,
  getAdresse,
  getEmployes,
  getDecheteries,
} from "../Endpoints";
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
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";

export default function Itineraire() {
  const navigate = useNavigate();
  const [apiKey, setApiKey] = React.useState("");
  const [ramassages, setRamassages] = React.useState([]);
  const [addresses, setAddresses] = React.useState([]);
  const [employes, setEmployes] = React.useState([]);
  const [dateSetted, setDateSetted] = React.useState(false);
  const [employeSetted, setEmployeSetted] = React.useState(false);
  const [noRamassagesInDate, setNoRamassagesInDate] = React.useState(false);
  const [noRamassagesForEmploye, setNoRamassagesForEmploye] =
    React.useState(false);
  const [date, setDate] = React.useState("");
  const [employe, setEmploye] = React.useState("");
  const [principalAddress, setPrincipalAddress] = React.useState("");

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

    const fetchEmployes = async () => {
      const response = await getEmployes();
      if (response.ok) {
        const data = await response.json();
        setEmployes(data.employesData);
      } else if (response.status === 401) {
        navigate("/login");
      } else {
        navigate("/error");
      }
    };
    fetchEmployes();

    const fetchDecheteries = async () => {
      const response = await getDecheteries();
      if (response.ok) {
        const data = await response.json();
        const decheterie = data.decheteriesData.find(
          (d) => d.principal === true
        );
        setPrincipalAddress(
          `${decheterie.adresse_street} ${decheterie.adresse_number}, ${decheterie.adresse_postcode} ${decheterie.adresse_city}`
        );
      } else if (response.status === 401) {
        navigate("/login");
      } else {
        navigate("/error");
      }
    };
    fetchDecheteries();
  }, [navigate]);

  function handleDateChange(e) {
    setDateSetted(true);
    setDate(e.target.value);

    if (employe === "") {
      return;
    }

    const addressesByDate = ramassages.filter(
      (ramassage) => ramassage.date === e.target.value
    );

    if (addressesByDate.length === 0) {
      setNoRamassagesInDate(true);
      return;
    }

    setNoRamassagesInDate(false);

    const addressesByEmploye = addressesByDate.filter(
      (ramassages) => ramassages.fk_employee === employe
    );

    if (addressesByEmploye.length === 0) {
      setNoRamassagesForEmploye(true);
      return;
    }

    setNoRamassagesForEmploye(false);

    const addressPromises = addressesByEmploye.map((ramassage) =>
      getAdresse(ramassage.decheterie_fk_adresse).then((response) => {
        if (response.ok) {
          return response.json().then((data) => data.adresseData);
        } else {
          navigate("/error");
        }
      })
    );

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

  function handleEmployeChange(e) {
    setEmployeSetted(true);
    setEmploye(e.target.value);

    if (date === "") {
      return;
    }

    const addressesByDate = ramassages.filter(
      (ramassage) => ramassage.date === date
    );

    if (addressesByDate.length === 0) {
      setNoRamassagesInDate(true);
      return;
    }

    setNoRamassagesInDate(false);

    const addressesByEmploye = addressesByDate.filter(
      (ramassages) => ramassages.fk_employee === e.target.value
    );

    if (addressesByEmploye.length === 0) {
      setNoRamassagesForEmploye(true);
      return;
    }

    setNoRamassagesForEmploye(false);

    const addressPromises = addressesByEmploye.map((ramassage) =>
      getAdresse(ramassage.decheterie_fk_adresse).then((response) => {
        if (response.ok) {
          return response.json().then((data) => data.adresseData);
        } else {
          navigate("/error");
        }
      })
    );

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

  if (
    !dateSetted ||
    !employeSetted ||
    noRamassagesInDate ||
    noRamassagesForEmploye
  ) {
    return (
      <Layout
        title={"Itinéraire"}
        content={
          <Grid item xs={12}>
            <Paper sx={{ p: 2 }}>
              <Stack
                spacing={2}
                direction="row"
                sx={{ alignItems: "center", paddingBottom: 2 }}
              >
                <Avatar>
                  <CalendarMonthIcon />
                </Avatar>
                <TextField
                  label="Date des ramassages"
                  type="date"
                  onChange={handleDateChange}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  value={date}
                />
                <Avatar>
                  <LocalShippingIcon />
                </Avatar>
                <FormControl sx={{ minWidth: 150 }}>
                  <InputLabel id="employe-label">Chauffeur</InputLabel>
                  <Select
                    onChange={handleEmployeChange}
                    labelId="employe-label"
                    label="Chauffeur"
                    value={employe}
                  >
                    {employes
                      .filter((e) => e.typepermis !== null)
                      .map((e) => (
                        <MenuItem
                          key={`employe-${e.idlogin}`}
                          value={e.idlogin}
                        >
                          {e.prenom} {e.nom}
                        </MenuItem>
                      ))}
                  </Select>
                </FormControl>
              </Stack>
              {noRamassagesInDate && (
                <Typography variant="body2" color="error">
                  Aucun ramassage prévu pour cette date
                </Typography>
              )}
              {noRamassagesForEmploye && (
                <Typography variant="body2" color="error">
                  Aucun ramassage prévu pour ce chauffeur
                </Typography>
              )}
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
            <Stack
              spacing={2}
              direction="row"
              sx={{ alignItems: "center", paddingBottom: 2 }}
            >
              <Avatar>
                <CalendarMonthIcon />
              </Avatar>
              <TextField
                label="Date des ramassages"
                type="date"
                onChange={handleDateChange}
                InputLabelProps={{
                  shrink: true,
                }}
                value={date}
              />
              <Avatar>
                <LocalShippingIcon />
              </Avatar>
              <FormControl sx={{ minWidth: 150 }}>
                <InputLabel id="employe-label">Chauffeur</InputLabel>
                <Select
                  onChange={handleEmployeChange}
                  labelId="employe-label"
                  label="Chauffeur"
                  value={employe}
                >
                  {employes
                    .filter((e) => e.typepermis !== null)
                    .map((e) => (
                      <MenuItem key={`employe-${e.idlogin}`} value={e.idlogin}>
                        {e.prenom} {e.nom}
                      </MenuItem>
                    ))}
                </Select>
              </FormControl>
            </Stack>
            {noRamassagesInDate && (
              <Typography variant="body2" color="error">
                Aucun ramassage prévu pour cette date
              </Typography>
            )}
            {noRamassagesForEmploye && (
              <Typography variant="body2" color="error">
                Aucun ramassage prévu pour ce chauffeur
              </Typography>
            )}
            <div style={{ height: "68vh", width: "100%" }}>
              <APIProvider apiKey={apiKey}>
                <Map
                  defaultZoom={13}
                  defaultCenter={{ lat: 46.784372, lng: 6.642003 }}
                >
                  <Directions
                    addresses={addresses}
                    principalAddress={principalAddress}
                  />
                </Map>
              </APIProvider>
            </div>
          </Paper>
        </Grid>
      }
    />
  );
}

function Directions({ addresses, principalAddress }) {
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
        origin: principalAddress,
        destination: principalAddress,
        travelMode: "DRIVING",
        provideRouteAlternatives: true,
        waypoints: addresses.map((address) => ({
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
  }, [directionsService, directionsRenderer, addresses, principalAddress]);

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
            De {leg.start_address.split(",").slice(0, 2).join(",")} à{" "}
            {leg.end_address.split(",").slice(0, 2).join(",")}
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
