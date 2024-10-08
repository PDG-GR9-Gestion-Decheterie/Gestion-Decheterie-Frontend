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
import { getEmployes } from "../../Endpoints";

export default function Employes() {
  const navigate = useNavigate();
  const [employes, setEmployes] = React.useState([]);

  useEffect(() => {
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
  }, [navigate]);

  return (
    <Layout
      title={"Employés"}
      content={
        <Grid item xs={12}>
          <Paper sx={{ p: 2, display: "flex", flexDirection: "column" }}>
            {employes.length > 0 ? (
              <>
                <Typography
                  component="h2"
                  variant="h6"
                  color="primary"
                  gutterBottom
                >
                  Liste des employés
                </Typography>
                <Table size="small">
                  <TableHead>
                    <TableRow>
                      <TableCell>ID</TableCell>
                      <TableCell>Nom</TableCell>
                      <TableCell>Prénom</TableCell>
                      <TableCell>Déchèterie</TableCell>
                      <TableCell>Fonction</TableCell>
                      <TableCell>Date de naissance</TableCell>
                      <TableCell>Date de début du contrat</TableCell>
                      <TableCell>Numéro de téléphone</TableCell>
                      <TableCell>Type de permis</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {employes.map((e) => (
                      <TableRow
                        key={e.idlogin}
                        hover={true}
                        style={
                          localStorage.getItem("fonction") === '"Responsable"'
                            ? { cursor: "pointer" }
                            : null
                        }
                        onClick={
                          localStorage.getItem("fonction") === '"Responsable"'
                            ? () => navigate(`/employes/${e.idlogin}`)
                            : null
                        }
                      >
                        <TableCell>{e.idlogin}</TableCell>
                        <TableCell>{e.nom}</TableCell>
                        <TableCell>{e.prenom}</TableCell>
                        <TableCell>{e.decheterie_nom}</TableCell>
                        <TableCell>{e.fk_fonction}</TableCell>
                        <TableCell>{e.datenaissance}</TableCell>
                        <TableCell>{e.datedebutcontrat}</TableCell>
                        <TableCell>
                          {e.numtelephone == null ? "-" : e.numtelephone}
                        </TableCell>
                        <TableCell>
                          {e.typepermis == null ? "-" : e.typepermis}
                        </TableCell>
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
                Aucun employé
              </Typography>
            )}
            {localStorage.getItem("fonction") === '"Responsable"' ? (
              <Button
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                onClick={() => navigate("/employes/create")}
              >
                Nouvel employé
              </Button>
            ) : null}
          </Paper>
        </Grid>
      }
    />
  );
}
