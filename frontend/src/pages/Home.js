import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../components/Layout";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
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
                <Typography sx={{ fontStyle: "italic" }}>
                  {i.adresse_street} {i.adresse_number}, {i.adresse_postcode}{" "}
                  {i.adresse_city}
                </Typography>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
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
