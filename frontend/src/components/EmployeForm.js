import React, { useEffect } from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import FactoryIcon from "@mui/icons-material/Factory";
import NumbersIcon from "@mui/icons-material/Numbers";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import PortraitIcon from "@mui/icons-material/Portrait";
import AssignmentIcon from "@mui/icons-material/Assignment";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import BadgeIcon from "@mui/icons-material/Badge";
import BusinessCenterIcon from "@mui/icons-material/BusinessCenter";
import PasswordIcon from "@mui/icons-material/Password";
import HomeIcon from "@mui/icons-material/Home";
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
  getFonctions,
  getEmploye,
  updateEmploye,
  createEmploye,
  getAdresses,
} from "../Endpoints";

export default function EmployeForm({ idEmploye }) {
  const navigate = useNavigate();
  const [id, setId] = React.useState();
  const [password, setPassword] = React.useState();
  const [lastName, setLastName] = React.useState();
  const [firstName, setFirstName] = React.useState();
  const [birthDate, setBirthDate] = React.useState();
  const [startDate, setStartDate] = React.useState();
  const [phoneNumber, setPhoneNumber] = React.useState();
  const [typePermis, setTypePermis] = React.useState();
  const [fk_address, setFk_address] = React.useState();
  const [fk_decheterie, setFk_decheterie] = React.useState();
  const [fk_fonction, setFk_fonction] = React.useState();
  const [decheteries, setDecheteries] = React.useState([]);
  const [fonctions, setFonctions] = React.useState([]);
  const [addresses, setAddresses] = React.useState([]);
  const [employeFetched, setEmployeFetched] = React.useState(false);

  useEffect(() => {
    if (idEmploye) {
      const fetchEmploye = async () => {
        const response = await getEmploye(idEmploye);
        if (response.ok) {
          const data = await response.json();
          setEmployeFetched(true);
          setId(data.employeData.idlogin);
          setLastName(data.employeData.nom);
          setFirstName(data.employeData.prenom);
          setBirthDate(data.employeData.datenaissance);
          setStartDate(data.employeData.datedebutcontrat);
          setPhoneNumber(data.employeData.numtelephone);
          setTypePermis(data.employeData.typepermis);
          setFk_address(data.employeData.fk_adresse);
          setFk_decheterie(data.employeData.fk_decheterie);
          setFk_fonction(data.employeData.fk_fonction);
        } else if (response.status === 403) {
          navigate("/login");
        } else {
          navigate("/error");
        }
      };
      fetchEmploye();
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

    const fetchFonctions = async () => {
      const response = await getFonctions();
      if (response.ok) {
        const data = await response.json();
        setFonctions(data.fonctionsData);
      } else if (response.status === 403) {
        navigate("/login");
      } else {
        navigate("/error");
      }
    };
    fetchFonctions();

    const fetchAddresses = async () => {
      const response = await getAdresses();
      if (response.ok) {
        const data = await response.json();
        setAddresses(data.adressesData);
      } else if (response.status === 403) {
        navigate("/login");
      } else {
        navigate("/error");
      }
    };
    fetchAddresses();
  }, []);

  const handleCreate = async (e) => {
    e.preventDefault();
    const response = await createEmploye({
      idlogin: id,
      mdplogin: password,
      nom: lastName,
      prenom: firstName,
      datenaissance: birthDate,
      datedebutcontrat: startDate,
      fk_fonction,
      numtelephone: phoneNumber,
      typepermis: typePermis,
      fk_adresse: fk_address,
      fk_decheterie,
    });
    if (response.ok) {
      navigate("/employes");
    } else if (response.status === 403) {
      navigate("/login");
    } else {
      navigate("/error");
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    const response = await updateEmploye({
      idlogin: idEmploye,
      mdplogin: password,
      nom: lastName,
      prenom: firstName,
      datenaissance: birthDate,
      datedebutcontrat: startDate,
      fk_fonction,
      numtelephone: phoneNumber,
      typepermis: typePermis,
      fk_adresse: fk_address,
      fk_decheterie,
    });
    if (response.ok) {
      navigate("/employes");
    } else if (response.status === 403) {
      navigate("/login");
    } else {
      navigate("/error");
    }
  };

  // Wait for employee to be fetched (Update case)
  if (idEmploye && !employeFetched) {
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
          {idEmploye ? "Modification" : "Création"}
        </Typography>
        <Box
          component="form"
          onSubmit={idEmploye ? handleUpdate : handleCreate}
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
            {!idEmploye && (
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
                  <PasswordIcon />
                </Avatar>
              </ListItemAvatar>
              <TextField
                type="password"
                onChange={(e) => setPassword(e.target.value)}
                label="Mot de passe"
                fullWidth
              />
            </ListItem>
            <ListItem>
              <ListItemAvatar>
                <Avatar>
                  <PortraitIcon />
                </Avatar>
              </ListItemAvatar>
              <TextField
                value={lastName}
                label="Nom"
                onChange={(e) => setLastName(e.target.value)}
                fullWidth
              />
              <TextField
                value={firstName}
                label="Prénom"
                onChange={(e) => setFirstName(e.target.value)}
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
                value={birthDate}
                label="Date de naissance"
                type="date"
                onChange={(e) => setBirthDate(e.target.value)}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </ListItem>
            <ListItem>
              <ListItemAvatar>
                <Avatar>
                  <AssignmentIcon />
                </Avatar>
              </ListItemAvatar>
              <TextField
                value={startDate}
                label="Date de début du contrat"
                type="date"
                onChange={(e) => setStartDate(e.target.value)}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </ListItem>
            <ListItem>
              <ListItemAvatar>
                <Avatar>
                  <LocalPhoneIcon />
                </Avatar>
              </ListItemAvatar>
              <TextField
                value={phoneNumber}
                label="Numéro de téléphone"
                onChange={(e) => setPhoneNumber(e.target.value)}
                fullWidth
              />
            </ListItem>
            <ListItem>
              <ListItemAvatar>
                <Avatar>
                  <BadgeIcon />
                </Avatar>
              </ListItemAvatar>
              <TextField
                value={typePermis}
                label="Type de permis"
                onChange={(e) => setTypePermis(e.target.value)}
                fullWidth
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
            <ListItem>
              <ListItemAvatar>
                <Avatar>
                  <BusinessCenterIcon />
                </Avatar>
              </ListItemAvatar>
              <FormControl fullWidth>
                <InputLabel id="fonction-label">Fonction</InputLabel>
                <Select
                  onChange={(e) => setFk_fonction(e.target.value)}
                  value={fk_fonction}
                  labelId="fonction-label"
                  label="Fonction"
                >
                  {fonctions.map((f) => (
                    <MenuItem key={f.nom} value={f.nom}>
                      {f.nom}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </ListItem>
            <ListItem>
              <ListItemAvatar>
                <Avatar>
                  <HomeIcon />
                </Avatar>
              </ListItemAvatar>
              <FormControl fullWidth>
                <InputLabel id="address-label">Adresse</InputLabel>
                <Select
                  onChange={(e) => setFk_address(e.target.value)}
                  value={fk_address}
                  labelId="address-label"
                  label="Adresse"
                >
                  {addresses.map((a) => (
                    <MenuItem key={a.id} value={a.id}>
                      {a.rue} {a.numero}, {a.npa} {a.nomville}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </ListItem>
          </List>
          <Box display="flex" justifyContent="end">
            {idEmploye ? (
              <>
                <Button
                  variant="outlined"
                  sx={{ mt: 3, mb: 2, mr: 2 }}
                  onClick={() => navigate(`/employes/${idEmploye}`)}
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
