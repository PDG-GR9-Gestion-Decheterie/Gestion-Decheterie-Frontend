import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import HandymanIcon from "@mui/icons-material/Handyman";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import FactoryIcon from "@mui/icons-material/Factory";
import RvHookupIcon from "@mui/icons-material/RvHookup";
import LocalGasStationIcon from "@mui/icons-material/LocalGasStation";
import Layout from "../../components/Layout";
import { getVehicule, deleteVehicule, getDecheteries } from "../../Endpoints";

export default function Vehicule() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [vehicule, setVehicule] = React.useState({});
  const [decheteries, setDecheteries] = React.useState([]);
  const [openDialog, setOpenDialog] = React.useState(false);

  const handleCloseDelete = () => {
    setOpenDialog(false);
  };

  const handleConfirmDelete = async () => {
    const response = await deleteVehicule(id);
    if (response.ok) {
      navigate("/vehicules");
    } else if (response.status === 401) {
      navigate("/login");
    } else {
      navigate("/error");
    }
    setOpenDialog(false);
  };

  useEffect(() => {
    const fetchVehicule = async () => {
      const response = await getVehicule(id);
      if (response.ok) {
        const data = await response.json();
        setVehicule(data.vehiculeData);
      } else if (response.status === 401) {
        navigate("/login");
      } else {
        navigate("/error");
      }
    };
    fetchVehicule();

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
  }, [id, navigate]);

  return (
    <Layout
      title={`Véhicule ${id}`}
      content={
        <Grid item xs={12}>
          <Paper sx={{ p: 2, display: "flex", flexDirection: "column" }}>
            <Typography
              component="h2"
              variant="h6"
              color="primary"
              gutterBottom
            >
              {vehicule.type}
            </Typography>
            <List sx={{ width: "100%", bgcolor: "background.paper" }}>
              <ListItem>
                <ListItemAvatar>
                  <Avatar>
                    <RvHookupIcon />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary="Remorque"
                  secondary={vehicule.remorque ? "Oui" : "Non"}
                />
              </ListItem>
              <ListItem>
                <ListItemAvatar>
                  <Avatar>
                    <HandymanIcon />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary="Année de fabrication"
                  secondary={vehicule.anneefabrication}
                />
              </ListItem>
              <ListItem>
                <ListItemAvatar>
                  <Avatar>
                    <CalendarMonthIcon />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary="Date d'expertise"
                  secondary={vehicule.dateexpertise}
                />
              </ListItem>
              <ListItem>
                <ListItemAvatar>
                  <Avatar>
                    <LocalGasStationIcon />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary="Consommation de carburant"
                  secondary={vehicule.consocarburant}
                />
              </ListItem>
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
                      (d) => d.id === vehicule.fk_decheterie
                    );
                    return decheterie ? decheterie.nom : "-";
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
                    Êtes-vous sûr de vouloir supprimer le véhicule {id}?
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
                onClick={() => navigate(`/vehicules/${id}/update`)}
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
