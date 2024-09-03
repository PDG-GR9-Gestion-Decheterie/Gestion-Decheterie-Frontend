import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import BadgeIcon from "@mui/icons-material/Badge";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import FactoryIcon from "@mui/icons-material/Factory";
import AssignmentIcon from "@mui/icons-material/Assignment";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import BusinessCenterIcon from "@mui/icons-material/BusinessCenter";
import HomeIcon from "@mui/icons-material/Home";
import Layout from "../components/Layout";
import { getProfil } from "../Endpoints";

export default function Profil() {
  const navigate = useNavigate();
  const [profil, setProfil] = React.useState({});

  useEffect(() => {
    const fetchProfil = async () => {
      const response = await getProfil();
      if (response.ok) {
        const data = await response.json();
        setProfil(data.employeData);
      } else if (response.status === 401) {
        navigate("/login");
      } else {
        navigate("/error");
      }
    };
    fetchProfil();
  }, [navigate]);

  return (
    <Layout
      title={"Profil"}
      content={
        <Grid item xs={12}>
          <Paper sx={{ p: 2, display: "flex", flexDirection: "column" }}>
            <Typography
              component="h2"
              variant="h6"
              color="primary"
              gutterBottom
            >
              {profil.prenom} {profil.nom}
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
                  secondary={profil.fk_fonction}
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
                  secondary={profil.datenaissance}
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
                  secondary={profil.datedebutcontrat}
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
                  secondary={profil.numtelephone ? profil.numtelephone : "-"}
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
                  secondary={profil.typepermis ? profil.typepermis : "-"}
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
                  secondary={profil.decheterie_nom}
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
                  secondary={`${profil.adresse_street} ${profil.adresse_number}, ${profil.adresse_postcode} ${profil.adresse_city}`}
                />
              </ListItem>
            </List>
          </Paper>
        </Grid>
      }
    />
  );
}
