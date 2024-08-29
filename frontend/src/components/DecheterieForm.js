import React, { useEffect } from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import HomeIcon from "@mui/icons-material/Home";
import NumbersIcon from "@mui/icons-material/Numbers";
import PortraitIcon from "@mui/icons-material/Portrait";
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
  getDecheterie,
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
        } else if (response.status === 403) {
          navigate("/login");
        } else {
          navigate("/error");
        }
      };
      fetchDecheterie();
    }

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

  const handleAddressChange = (e) => {
    setFk_address(e.target.value);
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
    } else if (response.status === 403) {
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
    } else if (response.status === 403) {
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

  // Wait for fields to be filled
  if (!addresses.length) {
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
              maxWidth: 360,
              bgcolor: "background.paper",
            }}
          >
            {!idDecheterie && (
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
                  <HomeIcon />
                </Avatar>
              </ListItemAvatar>
              <FormControl fullWidth>
                <InputLabel id="address-label">Adresse</InputLabel>
                <Select
                  onChange={handleAddressChange}
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
