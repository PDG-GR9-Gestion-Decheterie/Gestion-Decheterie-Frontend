import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../components/Layout";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import HomeIcon from "@mui/icons-material/Home";
import { getInfos } from "../Endpoints";

export default function Home() {
  const navigate = useNavigate();
  const [infos, setInfos] = React.useState([]);

  useEffect(() => {
    const fetchInfos = async () => {
      const response = await getInfos();
      if (response.ok) {
        const data = await response.json();
        setInfos(data.infosData);
      } else {
        navigate("/error");
      }
    };
    fetchInfos();
  }, [navigate]);

  return (
    <Layout
      title={"Home"}
      content={
        <Grid item xs={12}>
          {infos.length > 0 ? (
            infos.map((i) => (
              <Paper
                key={i.nom}
                sx={{
                  p: 2,
                  marginBottom: 2,
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <Typography
                  component="h2"
                  variant="h6"
                  color="primary"
                  gutterBottom
                >
                  {i.nom}
                </Typography>
                <List>
                  <ListItem>
                    <ListItemAvatar>
                      <Avatar>
                        <HomeIcon />
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                      primary="Adresse"
                      secondary={`${i.adresse_street} ${i.adresse_number}, ${i.adresse_postcode} ${i.adresse_city}`}
                    />
                  </ListItem>
                </List>
                <Box
                  sx={{
                    display: "flex",
                    flexWrap: "wrap",
                  }}
                >
                  {i.contenants.map((c) => (
                    <Box
                      key={c}
                      sx={{
                        height: 120,
                        width: 120,
                        p: 1,
                        m: 1,
                        border: 1,
                        borderRadius: 1,
                        borderColor: "primary.main",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",
                        "&:hover": {
                          bgcolor: "rgba(0, 0, 0, 0.04)",
                        },
                      }}
                    >
                      <img
                        src={`/dechets/${c}.png`}
                        alt={c}
                        width="50"
                        height="50"
                      />
                      <Typography
                        variant="body2"
                        color="primary"
                        sx={{ textAlign: "center" }}
                      >
                        {c}
                      </Typography>
                    </Box>
                  ))}
                </Box>
              </Paper>
            ))
          ) : (
            <Typography
              component="h2"
              variant="h6"
              color="primary"
              gutterBottom
            >
              Aucune information
            </Typography>
          )}
        </Grid>
      }
    />
  );
}
