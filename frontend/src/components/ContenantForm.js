import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import PortraitIcon from "@mui/icons-material/Portrait";
import AutoAwesomeMotionIcon from "@mui/icons-material/AutoAwesomeMotion";
import FilterNoneIcon from "@mui/icons-material/FilterNone";
import AspectRatioIcon from "@mui/icons-material/AspectRatio";
import ColorLensIcon from "@mui/icons-material/ColorLens";
import FactoryIcon from "@mui/icons-material/Factory";
import RecyclingIcon from "@mui/icons-material/Recycling";
import {
  getDecheteries,
  getContenant,
  updateContenant,
  createContenant,
  getDechets,
} from "../Endpoints";

export default function ContenantForm({ idContenant }) {
  const navigate = useNavigate();
  const [id, setId] = React.useState();
  const [name, setName] = React.useState();
  const [maxCapacity, setMaxCapacity] = React.useState();
  const [nbFrames, setNbFrames] = React.useState();
  const [size, setSize] = React.useState();
  const [color, setColor] = React.useState();
  const [fk_decheterie, setFk_decheterie] = React.useState();
  const [fk_dechet, setFk_dechet] = React.useState();
  const [decheteries, setDecheteries] = React.useState([]);
  const [dechets, setDechets] = React.useState([]);
  const [contenantFetched, setContenantFetched] = React.useState(false);
  const names = ["benne", "big bag", "grande caisse", "palette"];
  const sizes = ["petit", "moyen", "grand"];
  const [showError, setShowError] = React.useState(false);

  useEffect(() => {
    if (idContenant) {
      const fetchContenant = async () => {
        const response = await getContenant(idContenant);
        if (response.ok) {
          const data = await response.json();
          setContenantFetched(true);
          setId(data.contenantData.id);
          setName(data.contenantData.nom);
          setMaxCapacity(data.contenantData.capacitemax);
          setNbFrames(data.contenantData.nbcadre);
          setSize(data.contenantData.taille);
          setColor(data.contenantData.couleur);
          setFk_decheterie(data.contenantData.fk_decheterie);
          setFk_dechet(data.contenantData.fk_dechet);
        } else if (response.status === 401) {
          navigate("/login");
        } else {
          navigate("/error");
        }
      };
      fetchContenant();
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

    const fetchDechets = async () => {
      const response = await getDechets();
      if (response.ok) {
        const data = await response.json();
        setDechets(data.dechetsData);
      } else if (response.status === 401) {
        navigate("/login");
      } else {
        navigate("/error");
      }
    };
    fetchDechets();
  }, [idContenant, navigate]);

  const handleCreate = async (e) => {
    e.preventDefault();

    if (!name || !fk_decheterie || !fk_dechet) {
      setShowError(true);
      return;
    }

    const response = await createContenant({
      id,
      nom: name,
      capacitemax: maxCapacity,
      nbcadre: nbFrames,
      taille: size,
      couleur: color,
      fk_decheterie,
      fk_dechet,
    });
    if (response.ok) {
      navigate("/contenants");
    } else if (response.status === 401) {
      navigate("/login");
    } else {
      navigate("/error");
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();

    if (!name || !fk_decheterie || !fk_dechet) {
      setShowError(true);
      return;
    }

    const response = await updateContenant({
      id: idContenant,
      nom: name,
      capacitemax: maxCapacity,
      nbcadre: nbFrames,
      taille: size,
      couleur: color,
      fk_decheterie,
      fk_dechet,
    });
    if (response.ok) {
      navigate("/contenants");
    } else if (response.status === 401) {
      navigate("/login");
    } else {
      navigate("/error");
    }
  };

  // Wait for contenant to be fetched (Update case)
  if (idContenant && !contenantFetched) {
    return (
      <Box style={{ textAlign: "center", marginTop: "5rem" }}>
        <CircularProgress />
      </Box>
    );
  }

  // Wait for fields to be filled
  if (!decheteries.length || !dechets.length) {
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
          {idContenant ? "Modification" : "Création"}
        </Typography>
        <Box
          component="form"
          onSubmit={idContenant ? handleUpdate : handleCreate}
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
              <FormControl fullWidth>
                <InputLabel id="name-label">Nom</InputLabel>
                <Select
                  onChange={(e) => {
                    setName(e.target.value);
                    setNbFrames(null);
                    setSize(null);
                  }}
                  value={name}
                  labelId="name-label"
                  label="Nom"
                >
                  {names.map((n) => (
                    <MenuItem key={n} value={n}>
                      {n}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </ListItem>
            <ListItem>
              <ListItemAvatar>
                <Avatar>
                  <AutoAwesomeMotionIcon />
                </Avatar>
              </ListItemAvatar>
              <TextField
                value={maxCapacity}
                label="Capacité max"
                onChange={(e) => setMaxCapacity(e.target.value)}
                fullWidth
              />
            </ListItem>
            {name === "palette" && (
              <ListItem>
                <ListItemAvatar>
                  <Avatar>
                    <FilterNoneIcon />
                  </Avatar>
                </ListItemAvatar>
                <TextField
                  type="number"
                  InputProps={{ inputProps: { min: 0, max: 4 } }}
                  value={nbFrames}
                  label="Nombre de cadres"
                  onChange={(e) => setNbFrames(e.target.value)}
                  fullWidth
                />
              </ListItem>
            )}
            {name === "big bag" && (
              <ListItem>
                <ListItemAvatar>
                  <Avatar>
                    <AspectRatioIcon />
                  </Avatar>
                </ListItemAvatar>
                <FormControl fullWidth>
                  <InputLabel id="size-label">Taille</InputLabel>
                  <Select
                    onChange={(e) => setSize(e.target.value)}
                    value={size}
                    labelId="size-label"
                    label="Taille"
                  >
                    {sizes.map((s) => (
                      <MenuItem key={s} value={s}>
                        {s}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </ListItem>
            )}
            <ListItem>
              <ListItemAvatar>
                <Avatar>
                  <ColorLensIcon />
                </Avatar>
              </ListItemAvatar>
              <TextField
                value={color}
                label="Couleur"
                onChange={(e) => setColor(e.target.value)}
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
                  <RecyclingIcon />
                </Avatar>
              </ListItemAvatar>
              <FormControl fullWidth>
                <InputLabel id="dechet-label">Déchet</InputLabel>
                <Select
                  onChange={(e) => setFk_dechet(e.target.value)}
                  value={fk_dechet}
                  labelId="dechet-label"
                  label="Déchet"
                >
                  {dechets.map((d) => (
                    <MenuItem key={d.type} value={d.type}>
                      {d.type}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </ListItem>
          </List>
          <Box display="flex" justifyContent="end">
            {idContenant ? (
              <>
                <Button
                  variant="outlined"
                  sx={{ mt: 3, mb: 2, mr: 2 }}
                  onClick={() => navigate(`/contenants/${idContenant}`)}
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
                  onClick={() => navigate("/contenants")}
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
