import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import Layout from "../../components/Layout";
import { useParams } from "react-router-dom";
import HomeIcon from "@mui/icons-material/Home";
import {
  Grid,
  Paper,
  Typography,
  Button,
  Box,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import { getDecheterie, deleteDecheterie, getAdresses } from "../../Endpoints";

export default function Employe() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [decheterie, setDecheterie] = React.useState({});
  const [adresses, setAdresses] = React.useState([]);
  const [openDialog, setOpenDialog] = React.useState(false);

  const handleCloseDelete = () => {
    setOpenDialog(false);
  };

  const handleConfirmDelete = async () => {
    const response = await deleteDecheterie(id);
    if (response.ok) {
      navigate("/");
    } else if (response.status === 403) {
      navigate("/login");
    } else {
      navigate("/error");
    }
    setOpenDialog(false);
  };

  useEffect(() => {
    const fetchDecheterie = async () => {
      const response = await getDecheterie(id);
      if (response.ok) {
        const data = await response.json();
        setDecheterie(data.decheterieData);
      } else if (response.status === 403) {
        navigate("/login");
      } else {
        navigate("/error");
      }
    };
    fetchDecheterie();

    const fetchAdresses = async () => {
      const response = await getAdresses();
      if (response.ok) {
        const data = await response.json();
        setAdresses(data.adressesData);
      } else if (response.status === 403) {
        navigate("/login");
      } else {
        navigate("/error");
      }
    };
    fetchAdresses();
  }, []);

  return (
    <Layout
      title={`Décheterie n°${id}`}
      content={
        <Grid item xs={12}>
          <Paper sx={{ p: 2, display: "flex", flexDirection: "column" }}>
            <Typography
              component="h2"
              variant="h6"
              color="primary"
              gutterBottom
            >
              {decheterie.nom}
            </Typography>
            <List
              sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
            >
              <ListItem>
                <ListItemAvatar>
                  <Avatar>
                    <HomeIcon />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary="Adresse"
                  secondary={(() => {
                    const adresse = adresses.find(
                      (a) => a.id === decheterie.fk_adresse
                    );
                    return adresse
                      ? `${adresse.rue} ${adresse.numero}, ${adresse.npa} ${adresse.nomville}`
                      : "-";
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
                    Êtes-vous sûr de vouloir supprimer la décheterie n°{id}?
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
                onClick={() => navigate(`/decheteries/${id}/update`)}
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
