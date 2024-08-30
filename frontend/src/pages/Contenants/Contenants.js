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
import { getContenants } from "../../Endpoints";

export default function Contenants() {
  const navigate = useNavigate();
  const [contenants, setContenants] = React.useState([]);

  useEffect(() => {
    const fetchContenants = async () => {
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
  }, [navigate]);

  return (
    <Layout
      title={"Contenants"}
      content={
        <Grid item xs={12}>
          <Paper sx={{ p: 2, display: "flex", flexDirection: "column" }}>
            {contenants.length > 0 ? (
              <>
                <Typography
                  component="h2"
                  variant="h6"
                  color="primary"
                  gutterBottom
                >
                  Liste des contenants
                </Typography>
                <Table size="small">
                  <TableHead>
                    <TableRow>
                      <TableCell>ID</TableCell>
                      <TableCell>Nom</TableCell>
                      <TableCell>Capacité max</TableCell>
                      <TableCell>Nombre de cadres</TableCell>
                      <TableCell>Taille</TableCell>
                      <TableCell>Couleur</TableCell>
                      <TableCell>Déchèterie associée</TableCell>
                      <TableCell>Déchet</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {contenants.map((c) => (
                      <TableRow
                        key={c.id}
                        hover={true}
                        style={{ cursor: "pointer" }}
                        onClick={() => navigate(`/contenants/${c.id}`)}
                      >
                        <TableCell>{c.id}</TableCell>
                        <TableCell>{c.nom}</TableCell>
                        <TableCell>
                          {c.capacitemax == null ? "-" : c.capacitemax}
                        </TableCell>
                        <TableCell>
                          {c.nbcadre == null ? "-" : c.nbcadre}
                        </TableCell>
                        <TableCell>
                          {c.taille == null ? "-" : c.taille}
                        </TableCell>
                        <TableCell>
                          {c.couleur == null ? "-" : c.couleur}
                        </TableCell>
                        <TableCell>{c.decheterie_nom}</TableCell>
                        <TableCell>{c.fk_dechet}</TableCell>
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
                Aucun contenant
              </Typography>
            )}
            {localStorage.getItem("fonction") === '"Responsable"' ? (
              <Button
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                onClick={() => navigate("/contenants/create")}
              >
                Nouveau contenant
              </Button>
            ) : null}
          </Paper>
        </Grid>
      }
    />
  );
}
