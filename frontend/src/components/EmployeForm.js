import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import CircularProgress from "@mui/material/CircularProgress";
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
import SearchIcon from "@mui/icons-material/Search";
import {
  getDecheteries,
  getFonctions,
  getEmploye,
  updateEmploye,
  createEmploye,
  getAdresses,
  getAdresse,
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
  const [fk_address, setFk_address] = React.useState("");
  const [fk_decheterie, setFk_decheterie] = React.useState();
  const [fk_fonction, setFk_fonction] = React.useState();
  const [decheteries, setDecheteries] = React.useState([]);
  const [fonctions, setFonctions] = React.useState([]);
  const [addresses, setAddresses] = React.useState([]);
  const [employeFetched, setEmployeFetched] = React.useState(false);
  const typesPermis = ["B", "C"];
  const [showError, setShowError] = React.useState(false);

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

          // Fetch address
          const addressResponse = await getAdresse(data.employeData.fk_adresse);
          if (addressResponse.ok) {
            const addressJson = await addressResponse.json();
            setAddresses([addressJson.adresseData]);
          }
        } else if (response.status === 401) {
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
      } else if (response.status === 401) {
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
      } else if (response.status === 401) {
        navigate("/login");
      } else {
        navigate("/error");
      }
    };
    fetchFonctions();
  }, [idEmploye, navigate]);

  const searchAddresses = async (address) => {
    const response = await getAdresses(address);
    if (response.ok) {
      const data = await response.json();
      const sortedAdresse = data.adressesData.sort((a, b) => {
        // Comparer par ville
        if (a.city < b.city) return -1;
        if (a.city > b.city) return 1;

        // Si les villes sont identiques, comparer par rue
        if (a.street < b.street) return -1;
        if (a.street > b.street) return 1;

        // Si les villes et les rues sont identiques, comparer par numéro (numérique)
        const numA = parseInt(a.number, 10);
        const numB = parseInt(b.number, 10);

        return numA - numB;
      });
      setAddresses(sortedAdresse);
      setFk_address(sortedAdresse[0].id);
    } else if (response.status === 404) {
      return;
    } else if (response.status === 401) {
      navigate("/login");
    } else {
      navigate("/error");
    }
  };

  const handleCreate = async (e) => {
    e.preventDefault();

    if (
      !id ||
      !lastName ||
      !firstName ||
      !birthDate ||
      !startDate ||
      !fk_fonction ||
      !fk_address ||
      !fk_decheterie
    ) {
      setShowError(true);
      return;
    }

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
    } else if (response.status === 401) {
      navigate("/login");
    } else {
      navigate("/error");
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();

    if (
      !id ||
      !lastName ||
      !firstName ||
      !birthDate ||
      !startDate ||
      !fk_fonction ||
      !fk_address ||
      !fk_decheterie
    ) {
      setShowError(true);
      return;
    }

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
    } else if (response.status === 401) {
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
          {showError && (
            <Typography color="error">
              Veuillez remplir tous les champs
            </Typography>
          )}
          <List
            sx={{
              width: "100%",
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
              <FormControl fullWidth>
                <InputLabel id="typepermis-label">Type de permis</InputLabel>
                <Select
                  onChange={(e) => setTypePermis(e.target.value)}
                  value={typePermis}
                  labelId="typepermis-label"
                  label="Type de permis"
                >
                  {typesPermis.map((t) => (
                    <MenuItem key={t} value={t}>
                      {t}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </ListItem>
            <ListItem>
              <ListItemAvatar>
                <Avatar>
                  <FactoryIcon />
                </Avatar>
              </ListItemAvatar>
              <FormControl fullWidth>
                <InputLabel id="decheterie-label">Déchèterie</InputLabel>
                <Select
                  onChange={(e) => setFk_decheterie(e.target.value)}
                  value={fk_decheterie}
                  labelId="decheterie-label"
                  label="Déchèterie"
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
                  <SearchIcon />
                </Avatar>
              </ListItemAvatar>
              <TextField
                label="Rechercher une adresse"
                onChange={(e) => searchAddresses(e.target.value)}
                fullWidth
              />
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
                      {a.street} {a.number}, {a.postcode} {a.city}
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
                  onClick={() => navigate("/employes")}
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
