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
import AutoAwesomeMotionIcon from "@mui/icons-material/AutoAwesomeMotion";
import AspectRatioIcon from "@mui/icons-material/AspectRatio";
import FilterNoneIcon from "@mui/icons-material/FilterNone";
import ColorLensIcon from "@mui/icons-material/ColorLens";
import FactoryIcon from "@mui/icons-material/Factory";
import RecyclingIcon from "@mui/icons-material/Recycling";
import Layout from "../../components/Layout";
import { getContenant, deleteContenant, getDecheteries } from "../../Endpoints";

export default function Contenant() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [contenant, setContenant] = React.useState({});
  const [decheteries, setDecheteries] = React.useState([]);
  const [openDialog, setOpenDialog] = React.useState(false);

  const handleCloseDelete = () => {
    setOpenDialog(false);
  };

  const handleConfirmDelete = async () => {
    const response = await deleteContenant(id);
    if (response.ok) {
      navigate("/contenants");
    } else if (response.status === 401) {
      navigate("/login");
    } else {
      navigate("/error");
    }
    setOpenDialog(false);
  };

  useEffect(() => {
    const fetchContenant = async () => {
      const response = await getContenant(id);
      if (response.ok) {
        const data = await response.json();
        setContenant(data.contenantData);
      } else if (response.status === 401) {
        navigate("/login");
      } else {
        navigate("/error");
      }
    };
    fetchContenant();

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
      title={`Contenant n°${id}`}
      content={
        <Grid item xs={12}>
          <Paper sx={{ p: 2, display: "flex", flexDirection: "column" }}>
            <Typography
              component="h2"
              variant="h6"
              color="primary"
              gutterBottom
            >
              {contenant.nom}
            </Typography>
            <List
              sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
            >
              <ListItem>
                <ListItemAvatar>
                  <Avatar>
                    <AutoAwesomeMotionIcon />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary="Capacité max"
                  secondary={
                    contenant.capacitemax == null ? "-" : contenant.capacitemax
                  }
                />
              </ListItem>
              <ListItem>
                <ListItemAvatar>
                  <Avatar>
                    <FilterNoneIcon />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary="Nombre de cadres"
                  secondary={
                    contenant.nbcadre == null ? "-" : contenant.nbcadre
                  }
                />
              </ListItem>
              <ListItem>
                <ListItemAvatar>
                  <Avatar>
                    <AspectRatioIcon />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary="Taille"
                  secondary={contenant.taille == null ? "-" : contenant.taille}
                />
              </ListItem>
              <ListItem>
                <ListItemAvatar>
                  <Avatar>
                    <ColorLensIcon />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary="Couleur"
                  secondary={
                    contenant.couleur == null ? "-" : contenant.couleur
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
                  primary="Déchèterie"
                  secondary={(() => {
                    const decheterie = decheteries.find(
                      (d) => d.id === contenant.fk_decheterie
                    );
                    return decheterie ? decheterie.nom : "-";
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
                  secondary={contenant.fk_dechet}
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
                    Êtes-vous sûr de vouloir supprimer le contenant n°{id}?
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
                onClick={() => navigate(`/contenants/${id}/update`)}
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
