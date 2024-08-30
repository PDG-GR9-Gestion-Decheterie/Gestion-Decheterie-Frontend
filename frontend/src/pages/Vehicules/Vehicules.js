import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Layout from "../../components/Layout";
import { getVehicules } from "../../Endpoints";

export default function Employes() {
  const navigate = useNavigate();
  const [vehicules, setVehicules] = React.useState([]);

  useEffect(() => {
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
  }, [navigate]);

  return (
    <Layout
      title={"Véhicules"}
      content={
        <Grid item xs={12}>
          <Paper sx={{ p: 2, display: "flex", flexDirection: "column" }}>
            {vehicules.length > 0 ? (
              <>
                <Typography
                  component="h2"
                  variant="h6"
                  color="primary"
                  gutterBottom
                >
                  Liste des véhicules
                </Typography>
                <Table size="small">
                  <TableHead>
                    <TableRow>
                      <TableCell>Immatriculation</TableCell>
                      <TableCell>Type</TableCell>
                      <TableCell>Remorque</TableCell>
                      <TableCell>Année de fabrication</TableCell>
                      <TableCell>Date d'expertise</TableCell>
                      <TableCell>Consommation de carburant</TableCell>
                      <TableCell>Décheterie</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {vehicules.map((v) => (
                      <TableRow
                        key={v.immatriculation}
                        hover={true}
                        style={
                          localStorage.getItem("fonction") ===
                            '"Responsable"' ||
                          localStorage.getItem("fonction") === '"Secrétaire"'
                            ? { cursor: "pointer" }
                            : null
                        }
                        onClick={
                          localStorage.getItem("fonction") ===
                            '"Responsable"' ||
                          localStorage.getItem("fonction") === '"Secrétaire"'
                            ? () => navigate(`/vehicules/${v.immatriculation}`)
                            : null
                        }
                      >
                        <TableCell>{v.immatriculation}</TableCell>
                        <TableCell>{v.type}</TableCell>
                        <TableCell>{v.remorque ? "Oui" : "Non"}</TableCell>
                        <TableCell>{v.anneefabrication}</TableCell>
                        <TableCell>{v.dateexpertise}</TableCell>
                        <TableCell>{v.consocarburant}</TableCell>
                        <TableCell>{v.decheterie_nom}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </>
            ) : (
              <Typography
                component="h2"
                variant="h6"
                color="primary"
                gutterBottom
              >
                Aucun véhicule
              </Typography>
            )}

            {localStorage.getItem("fonction") === '"Responsable"' ||
            localStorage.getItem("fonction") === '"Secrétaire"' ? (
              <Button
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                onClick={() => navigate("/vehicules/create")}
              >
                Nouveau véhicule
              </Button>
            ) : null}
          </Paper>
        </Grid>
      }
    />
  );
}
