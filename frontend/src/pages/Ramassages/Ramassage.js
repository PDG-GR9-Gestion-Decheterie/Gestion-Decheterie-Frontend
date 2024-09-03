import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import FactoryIcon from "@mui/icons-material/Factory";
import QuestionMarkIcon from "@mui/icons-material/QuestionMark";
import BreakfastDiningIcon from "@mui/icons-material/BreakfastDining";
import ScaleIcon from "@mui/icons-material/Scale";
import AspectRatioIcon from "@mui/icons-material/AspectRatio";
import FilterNoneIcon from "@mui/icons-material/FilterNone";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import FingerprintIcon from "@mui/icons-material/Fingerprint";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import RecyclingIcon from "@mui/icons-material/Recycling";
import Layout from "../../components/Layout";
import { useParams } from "react-router-dom";
import {
  Grid,
  Paper,
  Typography,
  Button,
  CircularProgress,
  Box,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import {
  getRamassage,
  deleteRamassage,
  getDecheteries,
  getStatus,
  getVehicules,
  getContenants,
  getEmployes,
} from "../../Endpoints";

export default function Ramassage() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [ramassage, setRamassage] = React.useState({});
  const [decheteries, setDecheteries] = React.useState([]);
  const [status, setStatus] = React.useState([]);
  const [contenants, setContenants] = React.useState([]);
  const [vehicules, setVehicules] = React.useState([]);
  const [employes, setEmployes] = React.useState([]);
  const [openDialog, setOpenDialog] = React.useState(false);

  const handleCloseDelete = () => {
    setOpenDialog(false);
  };

  const handleConfirmDelete = async () => {
    const response = await deleteRamassage(ramassage.id);
    if (response.ok) {
      navigate("/ramassages");
    } else if (response.status === 401) {
      navigate("/login");
    } else {
      navigate("/error");
    }
    setOpenDialog(false);
  };

  useEffect(() => {
    const fetchRamassage = async () => {
      const response = await getRamassage(id);
      if (response.ok) {
        const data = await response.json();
        setRamassage(data.ramassageData);
      } else if (response.status === 401) {
        navigate("/login");
      } else {
        navigate("/error");
      }
    };
    fetchRamassage();

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
      if (!ramassage.fk_decheterie) return;

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
  }, [ramassage.fk_decheterie, id, navigate]);

  // Fetch contenants separately because it depends on ramassage
  useEffect(() => {
    const fetchContenants = async () => {
      if (!ramassage.fk_decheterie) return;

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
  }, [ramassage.fk_decheterie, navigate]);

  if (!ramassage.fk_decheterie) {
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

  return (
    <Layout
      title={`Ramassage n°${id}`}
      content={
        <Grid item xs={12}>
          <Paper sx={{ p: 2, display: "flex", flexDirection: "column" }}>
            <Typography
              component="h2"
              variant="h6"
              color="primary"
              gutterBottom
            >
              Date du ramassage {ramassage.date}
            </Typography>
            <List sx={{ width: "100%", bgcolor: "background.paper" }}>
              <ListItem>
                <ListItemAvatar>
                  <Avatar>
                    <FactoryIcon />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary="Déchèterie"
                  secondary={(() => {
                    const decheterie = decheteries.find(
                      (d) => d.id === ramassage.fk_decheterie
                    );
                    return decheterie ? decheterie.nom : "-";
                  })()}
                />
              </ListItem>
              <ListItem>
                <ListItemAvatar>
                  <Avatar>
                    <QuestionMarkIcon />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary="Status"
                  secondary={(() => {
                    const s = status.find((s) => s.nom === ramassage.fk_status);
                    return s ? s.nom : "-";
                  })()}
                />
              </ListItem>
              <ListItem>
                <ListItemAvatar>
                  <Avatar>
                    <ScaleIcon />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary="Poids ramassage"
                  secondary={ramassage.poids ? ramassage.poids : "-"}
                />
              </ListItem>
              <ListItem>
                <ListItemAvatar>
                  <Avatar>
                    <BreakfastDiningIcon />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary="Contenant"
                  secondary={(() => {
                    const c = contenants.find(
                      (c) => c.id === ramassage.fk_contenant
                    );
                    return c ? c.nom : "-";
                  })()}
                />
              </ListItem>
              <ListItem>
                <ListItemAvatar>
                  <Avatar>
                    <RecyclingIcon />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary="Déchet"
                  secondary={(() => {
                    const c = contenants.find(
                      (c) => c.id === ramassage.fk_contenant
                    );
                    return c ? c.fk_dechet : "-";
                  })()}
                />
              </ListItem>
              <ListItem>
                <ListItemAvatar>
                  <Avatar>
                    <AspectRatioIcon />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary="Taille contenant"
                  secondary={(() => {
                    const c = contenants.find(
                      (c) => c.id === ramassage.fk_contenant
                    );
                    return c && c.taille != null ? c.taille : "-";
                  })()}
                />
              </ListItem>
              <ListItem>
                <ListItemAvatar>
                  <Avatar>
                    <FilterNoneIcon />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary="Nombre cadres contenant"
                  secondary={(() => {
                    const c = contenants.find(
                      (c) => c.id === ramassage.fk_contenant
                    );
                    return c && c.nbcadre != null ? c.nbcadre : "-";
                  })()}
                />
              </ListItem>
              <ListItem>
                <ListItemAvatar>
                  <Avatar>
                    <AccountCircleIcon />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary="Employé"
                  secondary={(() => {
                    const e = employes.find(
                      (e) => e.idlogin === ramassage.fk_employee
                    );
                    return e
                      ? `${e.prenom} ${e.nom}, ${e.fk_fonction}, ${
                          e.typepermis
                            ? "permis " + e.typepermis
                            : "pas de permis"
                        }`
                      : "-";
                  })()}
                />
              </ListItem>
              <ListItem>
                <ListItemAvatar>
                  <Avatar>
                    <LocalShippingIcon />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary="Véhicule"
                  secondary={(() => {
                    const v = vehicules.find(
                      (v) => v.immatriculation === ramassage.fk_vehicule
                    );
                    return v ? v.type : "-";
                  })()}
                />
              </ListItem>
              <ListItem>
                <ListItemAvatar>
                  <Avatar>
                    <FingerprintIcon />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary="Immatriculation véhicule"
                  secondary={(() => {
                    const v = vehicules.find(
                      (v) => v.immatriculation === ramassage.fk_vehicule
                    );
                    return v ? v.immatriculation : "-";
                  })()}
                />
              </ListItem>
            </List>
            <Box display="flex" justifyContent="end">
              <Button
                variant="contained"
                color="error"
                sx={{ mt: 3, mb: 2, mr: 2 }}
                onClick={() => setOpenDialog(true)}
              >
                Supprimer
              </Button>
              <Dialog
                open={openDialog}
                onClose={handleCloseDelete}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
              >
                <DialogTitle id="alert-dialog-title">
                  {"Confirmation de suppression"}
                </DialogTitle>
                <DialogContent>
                  <DialogContentText id="alert-dialog-description">
                    Êtes-vous sûr de vouloir supprimer le ramassage n°
                    {id}?
                  </DialogContentText>
                </DialogContent>
                <DialogActions>
                  <Button onClick={handleCloseDelete} color="primary">
                    Annuler
                  </Button>
                  <Button
                    onClick={handleConfirmDelete}
                    color="primary"
                    autoFocus
                  >
                    Confirmer
                  </Button>
                </DialogActions>
              </Dialog>
              <Button
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                onClick={() => navigate(`/ramassages/${id}/update`)}
              >
                Modifier
              </Button>
            </Box>
          </Paper>
        </Grid>
      }
    />
  );
}
