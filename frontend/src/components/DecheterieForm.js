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
import NumbersIcon from "@mui/icons-material/Numbers";
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
  const [fk_address, setFk_address] = React.useState();
  const [addresses, setAddresses] = React.useState([]);
  const [decheterieFetched, setDecheterieFetched] = React.useState(false);

  useEffect(() => {
    if (idDecheterie) {
      const fetchDecheterie = async () => {
        const response = await getDecheterie(idDecheterie);
        if (response.ok) {
          const data = await response.json();
          setDecheterieFetched(true);
          setId(data.decheterieData.id);
          setName(data.decheterieData.nom);
          setFk_address(data.decheterieData.fk_adresse);
        } else if (response.status === 401) {
          navigate("/login");
        } else {
          navigate("/error");
        }
      };
      fetchDecheterie();
    }
  }, [idDecheterie, navigate]);

  useEffect(() => {
    if (fk_address) {
      const fetchAdresse = async () => {
        const response = await getAdresse(fk_address);
        if (response.ok) {
          const data = await response.json();
          setAddresses([data.adresseData]);
        } else if (response.status === 401) {
          navigate("/login");
        } else {
          navigate("/error");
        }
      };
      fetchAdresse();
    }
  }, [fk_address, navigate]);

  const searchAddresses = async (address) => {
    const response = await getAdresses(address);
    if (response.ok) {
      const data = await response.json();
      setAddresses(data.adressesData);
      setFk_address(data.adressesData[0].id);
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
