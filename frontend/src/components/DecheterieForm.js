import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import HomeIcon from "@mui/icons-material/Home";
import PortraitIcon from "@mui/icons-material/Portrait";
import SearchIcon from "@mui/icons-material/Search";
import {
  getDecheterie,
  getAdresse,
  getAdresses,
  updateDecheterie,
  createDecheterie,
} from "../Endpoints";

export default function DecheterieForm({ idDecheterie }) {
  const navigate = useNavigate();
  const [id, setId] = React.useState();
  const [name, setName] = React.useState();
  const [fk_address, setFk_address] = React.useState("");
  const [addresses, setAddresses] = React.useState([]);
  const [decheterieFetched, setDecheterieFetched] = React.useState(false);
  const [showError, setShowError] = React.useState(false);

  useEffect(() => {
    if (idDecheterie) {
      const fetchData = async () => {
        const response = await getDecheterie(idDecheterie);
        if (response.ok) {
          const data = await response.json();
          setDecheterieFetched(true);
          setId(data.decheterieData.id);
          setName(data.decheterieData.nom);
          setFk_address(data.decheterieData.fk_adresse);

          // Fetch address
          const addressResponse = await getAdresse(
            data.decheterieData.fk_adresse
          );
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
      fetchData();
    }
  }, [idDecheterie, navigate]);

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

    if (!name || !fk_address) {
      setShowError(true);
      return;
    }

    const response = await createDecheterie({
      id,
      nom: name,
      fk_adresse: fk_address,
    });
    if (response.ok) {
      navigate("/decheteries");
    } else if (response.status === 401) {
      navigate("/login");
    } else {
      navigate("/error");
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();

    if (!name || !fk_address) {
      setShowError(true);
      return;
    }

    const response = await updateDecheterie({
      id,
      nom: name,
      fk_adresse: fk_address,
    });
    if (response.ok) {
      navigate("/decheteries");
    } else if (response.status === 401) {
      navigate("/login");
    } else {
      navigate("/error");
    }
  };

  // Wait for employee to be fetched (Update case)
  if (idDecheterie && !decheterieFetched) {
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
          {idDecheterie ? "Modification" : "Création"}
        </Typography>
        <Box
          component="form"
          onSubmit={idDecheterie ? handleUpdate : handleCreate}
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
            <ListItem>
              <ListItemAvatar>
                <Avatar>
                  <PortraitIcon />
                </Avatar>
              </ListItemAvatar>
              <TextField
                value={name}
                label="Nom"
                onChange={(e) => setName(e.target.value)}
                fullWidth
              />
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
            {idDecheterie ? (
              <>
                <Button
                  variant="outlined"
                  sx={{ mt: 3, mb: 2, mr: 2 }}
                  onClick={() => navigate(`/decheteries/${idDecheterie}`)}
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
                  onClick={() => navigate("/decheteries")}
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
