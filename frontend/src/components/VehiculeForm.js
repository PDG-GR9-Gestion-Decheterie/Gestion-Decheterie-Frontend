import React, { useEffect } from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import FactoryIcon from "@mui/icons-material/Factory";
import NumbersIcon from "@mui/icons-material/Numbers";
import HandymanIcon from "@mui/icons-material/Handyman";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import RvHookupIcon from "@mui/icons-material/RvHookup";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import LocalGasStationIcon from "@mui/icons-material/LocalGasStation";
import { useNavigate } from "react-router-dom";
import {
  Grid,
  Paper,
  Typography,
  Button,
  Select,
  MenuItem,
  TextField,
  Box,
  CircularProgress,
} from "@mui/material";
import {
  getDecheteries,
  getVehicule,
  updateVehicule,
  createVehicule,
} from "../Endpoints";

export default function VehiculeForm({ idVehicule }) {
  const navigate = useNavigate();
  const [id, setId] = React.useState();
  const [type, setType] = React.useState();
  const [remorque, setRemorque] = React.useState();
  const [anneeFabrication, setAnneeFabrication] = React.useState();
  const [dateExpertise, setDateExpertise] = React.useState();
  const [consommationCarburant, setConsommationCarburant] = React.useState();
  const [fk_decheterie, setFk_decheterie] = React.useState();
  const [decheteries, setDecheteries] = React.useState([]);
  const [vehiculeFetched, setVehiculeFetched] = React.useState(false);

  useEffect(() => {
    if (idVehicule) {
      const fetchVehicule = async () => {
        const response = await getVehicule(idVehicule);
        if (response.ok) {
          const data = await response.json();
          setVehiculeFetched(true);
          setId(data.vehiculeData.immatriculation);
          setType(data.vehiculeData.type);
          setRemorque(data.vehiculeData.remorque);
          setAnneeFabrication(data.vehiculeData.anneefabrication);
          setDateExpertise(data.vehiculeData.dateexpertise);
          setConsommationCarburant(data.vehiculeData.consocarburant);
          setFk_decheterie(data.vehiculeData.fk_decheterie);
        } else if (response.status === 403) {
          navigate("/login");
        } else {
          navigate("/error");
        }
      };
      fetchVehicule();
    }

    const fetchDecheteries = async () => {
      const response = await getDecheteries();
      if (response.ok) {
        const data = await response.json();
        setDecheteries(data.decheteriesData);
      } else if (response.status === 403) {
        navigate("/login");
      } else {
        navigate("/error");
      }
    };
    fetchDecheteries();
  }, []);

  const handleCreate = async (e) => {
    e.preventDefault();
    const response = await createVehicule({
      immatriculation: id,
      type,
      remorque,
      anneefabrication: anneeFabrication,
      dateexpertise: dateExpertise,
      consocarburant: consommationCarburant,
      fk_decheterie,
    });
    if (response.ok) {
      navigate("/vehicules");
    } else if (response.status === 403) {
      navigate("/login");
    } else {
      navigate("/error");
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    const response = await updateVehicule({
      immatriculation: idVehicule,
      type,
      remorque,
      anneefabrication: anneeFabrication,
      dateexpertise: dateExpertise,
      consocarburant: consommationCarburant,
      fk_decheterie,
    });
    if (response.ok) {
      navigate("/vehicules");
    } else if (response.status === 403) {
      navigate("/login");
    } else {
      navigate("/error");
    }
  };

  // Wait for vehicule to be fetched (Update case)
  if (idVehicule && !vehiculeFetched) {
    return (
      <Box style={{ textAlign: "center", marginTop: "5rem" }}>
        <CircularProgress />
      </Box>
    );
  }

  // Wait for fields to be filled
  if (!decheteries.length) {
    return (
      <Box style={{ textAlign: "center", marginTop: "5rem" }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Grid item xs={12}>
      <Paper sx={{ p: 2, display: "flex", flexDirection: "column" }}>
        <Typography component="h2" variant="h6" color="primary" gutterBottom>
          {idVehicule ? "Modification" : "Création"}
        </Typography>
        <Box
          component="form"
          onSubmit={idVehicule ? handleUpdate : handleCreate}
          noValidate
          sx={{ mt: 1 }}
        >
          <List
            sx={{
              width: "100%",
              maxWidth: 360,
              bgcolor: "background.paper",
            }}
          >
            {!idVehicule && (
              <ListItem>
                <ListItemAvatar>
                  <Avatar>
                    <NumbersIcon />
                  </Avatar>
                </ListItemAvatar>
                <TextField
                  onChange={(e) => setId(e.target.value)}
                  label="Identifiant"
                  fullWidth
                />
              </ListItem>
            )}
            <ListItem>
              <ListItemAvatar>
                <Avatar>
                  <LocalShippingIcon />
                </Avatar>
              </ListItemAvatar>
              <TextField
                onChange={(e) => setType(e.target.value)}
                value={type}
                label="Type"
                fullWidth
              />
            </ListItem>
            <ListItem>
              <ListItemAvatar>
                <Avatar>
                  <RvHookupIcon />
                </Avatar>
              </ListItemAvatar>
              <FormControl fullWidth>
                <InputLabel id="remorque-label">Remorque</InputLabel>
                <Select
                  onChange={(e) => setRemorque(e.target.value)}
                  value={remorque}
                  labelId="remorque-label"
                  label="Remorque"
                >
                  <MenuItem value={true}>Oui</MenuItem>
                  <MenuItem value={false}>Non</MenuItem>
                </Select>
              </FormControl>
            </ListItem>
            <ListItem>
              <ListItemAvatar>
                <Avatar>
                  <HandymanIcon />
                </Avatar>
              </ListItemAvatar>
              <TextField
                onChange={(e) => setAnneeFabrication(e.target.value)}
                value={anneeFabrication}
                label="Année de fabrication"
                fullWidth
              />
            </ListItem>
            <ListItem>
              <ListItemAvatar>
                <Avatar>
                  <CalendarMonthIcon />
                </Avatar>
              </ListItemAvatar>
              <TextField
                value={dateExpertise}
                label="Date de naissance"
                type="date"
                onChange={(e) => setDateExpertise(e.target.value)}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </ListItem>
            <ListItem>
              <ListItemAvatar>
                <Avatar>
                  <LocalGasStationIcon />
                </Avatar>
              </ListItemAvatar>
              <TextField
                type="number"
                onChange={(e) => setConsommationCarburant(e.target.value)}
                value={consommationCarburant}
                label="Consommation de carburant"
                fullWidth
                InputProps={{ inputProps: { min: 0.1, max: 99.9 } }}
              />
            </ListItem>
            <ListItem>
              <ListItemAvatar>
                <Avatar>
                  <FactoryIcon />
                </Avatar>
              </ListItemAvatar>
              <FormControl fullWidth>
                <InputLabel id="decheterie-label">Décheterie</InputLabel>
                <Select
                  onChange={(e) => setFk_decheterie(e.target.value)}
                  value={fk_decheterie}
                  labelId="decheterie-label"
                  label="Décheterie"
                >
                  {decheteries.map((d) => (
                    <MenuItem key={d.id} value={d.id}>
                      {d.nom}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </ListItem>
          </List>
          <Box display="flex" justifyContent="end">
            {idVehicule ? (
              <>
                <Button
                  variant="outlined"
                  sx={{ mt: 3, mb: 2, mr: 2 }}
                  onClick={() => navigate(`/vehicules/${idVehicule}`)}
                >
                  Annuler
                </Button>
                <Button type="submit" variant="contained" sx={{ mt: 3, mb: 2 }}>
                  Modifier
                </Button>
              </>
            ) : (
              <>
                <Button
                  variant="outlined"
                  sx={{ mt: 3, mb: 2, mr: 2 }}
                  onClick={() => navigate("/")}
                >
                  Annuler
                </Button>
                <Button type="submit" variant="contained" sx={{ mt: 3, mb: 2 }}>
                  Créer
                </Button>
              </>
            )}
          </Box>
        </Box>
      </Paper>
    </Grid>
  );
}
