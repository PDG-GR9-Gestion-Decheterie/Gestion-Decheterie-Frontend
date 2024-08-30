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
import CircularProgress from "@mui/material/CircularProgress";
import BusinessCenterIcon from "@mui/icons-material/BusinessCenter";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import AssignmentIcon from "@mui/icons-material/Assignment";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import BadgeIcon from "@mui/icons-material/Badge";
import FactoryIcon from "@mui/icons-material/Factory";
import HomeIcon from "@mui/icons-material/Home";
import Layout from "../../components/Layout";
import {
  getEmploye,
  deleteEmploye,
  getDecheteries,
  getAdresse,
} from "../../Endpoints";

export default function Employe() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [employe, setEmploye] = React.useState({});
  const [address, setAddress] = React.useState({});
  const [decheteries, setDecheteries] = React.useState([]);
  const [openDialog, setOpenDialog] = React.useState(false);

  const handleCloseDelete = () => {
    setOpenDialog(false);
  };

  const handleConfirmDelete = async () => {
    const response = await deleteEmploye(id);
    if (response.ok) {
      navigate("/employes");
    } else if (response.status === 401) {
      navigate("/login");
    } else {
      navigate("/error");
    }
    setOpenDialog(false);
  };

  useEffect(() => {
    const fetchEmploye = async () => {
      const response = await getEmploye(id);
      if (response.ok) {
        const data = await response.json();
        setEmploye(data.employeData);
      } else if (response.status === 401) {
        navigate("/login");
      } else {
        navigate("/error");
      }
    };
    fetchEmploye();

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

  useEffect(() => {
    const fetchAdress = async () => {
      if (!employe.fk_adresse) return;

      const response = await getAdresse(employe.fk_adresse);
      if (response.ok) {
        const data = await response.json();
        setAddress(data.adresseData);
      } else if (response.status === 401) {
        navigate("/login");
      } else {
        navigate("/error");
      }
    };
    fetchAdress();
  }, [employe.fk_adresse, navigate]);

  if (!employe.fk_adresse) {
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
      title={`Utilisateur ${id}`}
      content={
        <Grid item xs={12}>
          <Paper sx={{ p: 2, display: "flex", flexDirection: "column" }}>
            <Typography
              component="h2"
              variant="h6"
              color="primary"
              gutterBottom
            >
              {employe.prenom} {employe.nom}
            </Typography>
            <List sx={{ width: "100%", bgcolor: "background.paper" }}>
              <ListItem>
                <ListItemAvatar>
                  <Avatar>
                    <BusinessCenterIcon />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary="Fonction"
                  secondary={employe.fk_fonction}
                />
              </ListItem>
              <ListItem>
                <ListItemAvatar>
                  <Avatar>
                    <CalendarMonthIcon />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary="Date de naissance"
                  secondary={employe.datenaissance}
                />
              </ListItem>
              <ListItem>
                <ListItemAvatar>
                  <Avatar>
                    <AssignmentIcon />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary="Date de début du contrat"
                  secondary={employe.datedebutcontrat}
                />
              </ListItem>
              <ListItem>
                <ListItemAvatar>
                  <Avatar>
                    <LocalPhoneIcon />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary="Numéro de téléphone"
                  secondary={
                    employe.numtelephone == null ? "-" : employe.numtelephone
                  }
                />
              </ListItem>
              <ListItem>
                <ListItemAvatar>
                  <Avatar>
                    <BadgeIcon />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary="Type de permis"
                  secondary={
                    employe.typepermis == null ? "-" : employe.typepermis
                  }
                />
              </ListItem>
              <ListItem>
                <ListItemAvatar>
                  <Avatar>
                    <FactoryIcon />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary="Décheterie"
                  secondary={(() => {
                    const decheterie = decheteries.find(
                      (d) => d.id === employe.fk_decheterie
                    );
                    return decheterie ? decheterie.nom : "-";
                  })()}
                />
              </ListItem>
              <ListItem>
                <ListItemAvatar>
                  <Avatar>
                    <HomeIcon />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary="Adresse"
                  secondary={`${address.street} ${address.number}, ${address.postcode} ${address.city}`}
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
                    Êtes-vous sûr de vouloir supprimer l'employé {id}?
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
                onClick={() => navigate(`/employes/${id}/update`)}
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
