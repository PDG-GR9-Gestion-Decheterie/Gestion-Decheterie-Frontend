import React, { useEffect } from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import FactoryIcon from "@mui/icons-material/Factory";
import QuestionMarkIcon from "@mui/icons-material/QuestionMark";
import BreakfastDiningIcon from "@mui/icons-material/BreakfastDining";
import ScaleIcon from "@mui/icons-material/Scale";
import NumbersIcon from "@mui/icons-material/Numbers";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
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
  FormControl,
  InputLabel,
} from "@mui/material";
import {
  getDecheteries,
  getStatus,
  getVehicules,
  getContenants,
  getEmployes,
  getRamassage,
  createRamassage,
  updateRamassage,
} from "../Endpoints";

export default function RamassageForm({ idRamassage }) {
  const navigate = useNavigate();
  const [id, setId] = React.useState();
  const [date, setDate] = React.useState();
  const [fk_status, setFk_status] = React.useState();
  const [poids, setPoids] = React.useState();
  const [fk_contenant, setFk_contenant] = React.useState();
  const [fk_employe, setFk_employe] = React.useState();
  const [fk_decheterie, setFk_decheterie] = React.useState();
  const [fk_vehicule, setFk_vehicule] = React.useState();
  const [status, setStatus] = React.useState([]);
  const [decheteries, setDecheteries] = React.useState([]);
  const [contenants, setContenants] = React.useState([]);
  const [vehicules, setVehicules] = React.useState([]);
  const [employes, setEmployes] = React.useState([]);
  const [ramassageFetched, setRamassageFetched] = React.useState(false);
  const [selectedPermis, setSelectedPermis] = React.useState();

  useEffect(() => {
    if (idRamassage) {
      const fetchRamassage = async () => {
        const response = await getRamassage(idRamassage);
        if (response.ok) {
          const data = await response.json();
          setRamassageFetched(true);
          setId(data.ramassageData.id);
          setDate(data.ramassageData.date);
          setFk_status(data.ramassageData.fk_status);
          setPoids(data.ramassageData.poids);
          setFk_contenant(data.ramassageData.fk_contenant);
          setFk_employe(data.ramassageData.fk_employee);
          setFk_decheterie(data.ramassageData.fk_decheterie);
          setFk_vehicule(data.ramassageData.fk_vehicule);
        } else if (response.status === 401) {
          navigate("/login");
        } else {
          navigate("/error");
        }
      };
      fetchRamassage();
    }

    const fetchStatus = async () => {
      const response = await getStatus();
      if (response.ok) {
        const data = await response.json();
        setStatus(data.statusData);
      } else if (response.status === 401) {
        navigate("/login");
      } else {
        navigate("/error");
      }
    };
    fetchStatus();

    const fetchDecheteries = async () => {
      const response = await getDecheteries();
      if (response.ok) {
        const data = await response.json();
        setDecheteries(data.decheteriesData);
      } else if (response.status === 401) {
        navigate("/login");
      } else {
        navigate("/error");
      }
    };
    fetchDecheteries();

    const fetchVehicules = async () => {
      const response = await getVehicules();
      if (response.ok) {
        const data = await response.json();
        setVehicules(data.vehiculesData);
      } else if (response.status === 401) {
        navigate("/login");
      } else {
        navigate("/error");
      }
    };
    fetchVehicules();

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

    const fetchContenants = async () => {
      const response = await getContenants();
      if (response.ok) {
        const data = await response.json();
        setContenants(data.contenantsData);
      } else if (response.status === 401) {
        navigate("/login");
      } else {
        navigate("/error");
      }
    };
    fetchContenants();
  }, []);

  const handleCreate = async (e) => {
    e.preventDefault();
    const response = await createRamassage({
      id,
      date,
      fk_status,
      poids,
      fk_contenant,
      fk_employee: fk_employe,
      fk_decheterie,
      fk_vehicule,
    });
    if (response.ok) {
      navigate("/ramassages");
    } else if (response.status === 401) {
      navigate("/login");
    } else {
      navigate("/error");
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    const response = await updateRamassage({
      id: idRamassage,
      date,
      fk_status,
      poids,
      fk_contenant,
      fk_employee: fk_employe,
      fk_decheterie,
      fk_vehicule,
    });
    if (response.ok) {
      navigate("/ramassages");
    } else if (response.status === 401) {
      navigate("/login");
    } else {
      navigate("/error");
    }
  };

  // Wait for ramassage to be fetched (Update case)
  if (idRamassage && !ramassageFetched) {
    return (
      <Box style={{ textAlign: "center", marginTop: "5rem" }}>
        <CircularProgress />
      </Box>
    );
  }

  // Wait for fields to be filled
  if (
    !status.length ||
    !decheteries.length ||
    !vehicules.length ||
    !employes.length
  ) {
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
          {idRamassage ? "Modification" : "Création"}
        </Typography>
        <Box
          component="form"
          onSubmit={idRamassage ? handleUpdate : handleCreate}
          noValidate
          sx={{ mt: 1 }}
        >
          <List
            sx={{
              width: "100%",
              bgcolor: "background.paper",
            }}
          >
            {!idRamassage && (
              <ListItem>
                <ListItemAvatar>
                  <Avatar>
                    <NumbersIcon />
                  </Avatar>
                </ListItemAvatar>
                <TextField
                  type="number"
                  onChange={(e) => setId(e.target.value)}
                  label="Identifiant"
                  fullWidth
                  InputProps={{ inputProps: { min: 0 } }}
                />
              </ListItem>
            )}
            <ListItem>
              <ListItemAvatar>
                <Avatar>
                  <CalendarMonthIcon />
                </Avatar>
              </ListItemAvatar>
              <TextField
                value={date}
                label="Date du ramassage"
                type="date"
                onChange={(e) => setDate(e.target.value)}
                InputLabelProps={{
                  shrink: true,
                }}
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
                  onChange={(e) => {
                    setFk_decheterie(e.target.value);
                    setFk_contenant(null);
                  }}
                  value={fk_decheterie}
                  labelId="decheterie-label"
                  label="Décheterie"
                >
                  {decheteries.map((d) => (
                    <MenuItem key={`decheterie-${d.id}`} value={d.id}>
                      {d.nom}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </ListItem>
            <ListItem>
              <ListItemAvatar>
                <Avatar>
                  <QuestionMarkIcon />
                </Avatar>
              </ListItemAvatar>
              <FormControl fullWidth>
                <InputLabel id="status-label">Status</InputLabel>
                <Select
                  onChange={(e) => setFk_status(e.target.value)}
                  value={fk_status}
                  labelId="status-label"
                  label="Status"
                >
                  {status.map((s) => (
                    <MenuItem key={`status-${s.id}`} value={s.nom}>
                      {s.nom}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </ListItem>
            <ListItem>
              <ListItemAvatar>
                <Avatar>
                  <ScaleIcon />
                </Avatar>
              </ListItemAvatar>
              <TextField
                type="number"
                value={poids}
                onChange={(e) => setPoids(e.target.value)}
                label="Poids ramassage"
                fullWidth
                InputProps={{ inputProps: { min: 0 } }}
              />
            </ListItem>
            <ListItem>
              <ListItemAvatar>
                <Avatar>
                  <BreakfastDiningIcon />
                </Avatar>
              </ListItemAvatar>
              <FormControl fullWidth>
                <InputLabel id="contenant-label">Contenant</InputLabel>
                <Select
                  onChange={(e) => setFk_contenant(e.target.value)}
                  value={fk_contenant}
                  labelId="contenant-label"
                  label="Contenant"
                >
                  {contenants
                    .filter((c) => c.fk_decheterie === fk_decheterie)
                    .map((c) => (
                      <MenuItem key={`contenant-${c.id}`} value={c.id}>
                        id: {c.id}, {c.nom}, {c.capacitemax} L, nbcadre:{" "}
                        {c.nbcadre ? c.nbcadre : "- "}, taille:{" "}
                        {c.taille ? c.taille : "- "}, couleur:{" "}
                        {c.couleur ? c.couleur : "- "}, déchet: {c.fk_dechet}
                      </MenuItem>
                    ))}
                </Select>
              </FormControl>
            </ListItem>
            <ListItem>
              <ListItemAvatar>
                <Avatar>
                  <AccountCircleIcon />
                </Avatar>
              </ListItemAvatar>
              <FormControl fullWidth>
                <InputLabel id="employe-label">Employé</InputLabel>
                <Select
                  onChange={(e) => {
                    setFk_employe(e.target.value);
                    setFk_vehicule(null);
                    setSelectedPermis(
                      employes.find((emp) => emp.idlogin === e.target.value)
                        .typepermis
                    );
                  }}
                  value={fk_employe}
                  labelId="employe-label"
                  label="Employé"
                >
                  {employes
                    .filter((e) => e.typepermis !== null)
                    .map((e) => (
                      <MenuItem key={`employe-${e.idlogin}`} value={e.idlogin}>
                        {e.prenom} {e.nom}, {e.fk_fonction}, {e.typepermis}
                      </MenuItem>
                    ))}
                </Select>
              </FormControl>
            </ListItem>
            <ListItem>
              <ListItemAvatar>
                <Avatar>
                  <LocalShippingIcon />
                </Avatar>
              </ListItemAvatar>
              <FormControl fullWidth>
                <InputLabel id="vehicule-label">Véhicule</InputLabel>
                <Select
                  onChange={(e) => setFk_vehicule(e.target.value)}
                  value={fk_vehicule}
                  labelId="vehicule-label"
                  label="Véhicule"
                >
                  {(selectedPermis === "B" &&
                    vehicules
                      .filter((v) => v.type === "camionnette")
                      .map((v) => (
                        <MenuItem
                          key={`vehicule-${v.immatriculation}`}
                          value={v.immatriculation}
                        >
                          {v.immatriculation}, {v.type}, remorque:{" "}
                          {v.remorque ? "Oui" : "Non"}
                        </MenuItem>
                      ))) ||
                    vehicules.map((v) => (
                      <MenuItem
                        key={`vehicule-${v.immatriculation}`}
                        value={v.immatriculation}
                      >
                        {v.immatriculation}, {v.type}, remorque:{" "}
                        {v.remorque ? "Oui" : "Non"}
                      </MenuItem>
                    ))}
                </Select>
              </FormControl>
            </ListItem>
          </List>
          <Box display="flex" justifyContent="end">
            {idRamassage ? (
              <>
                <Button
                  variant="outlined"
                  sx={{ mt: 3, mb: 2, mr: 2 }}
                  onClick={() => navigate(`/ramassages/${idRamassage}`)}
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
