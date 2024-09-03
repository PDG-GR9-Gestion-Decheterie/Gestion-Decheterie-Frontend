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
import { getDecheteries } from "../../Endpoints";

export default function Decheteries() {
  const navigate = useNavigate();
  const [decheteries, setDecheteries] = React.useState([]);

  useEffect(() => {
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
  }, [navigate]);

  return (
    <Layout
      title={"Déchèteries"}
      content={
        <Grid item xs={12}>
          <Paper sx={{ p: 2, display: "flex", flexDirection: "column" }}>
            {decheteries.length > 0 ? (
              <>
                <Typography
                  component="h2"
                  variant="h6"
                  color="primary"
                  gutterBottom
                >
                  Liste des déchèteries
                </Typography>
                <Table size="small">
                  <TableHead>
                    <TableRow>
                      <TableCell>ID</TableCell>
                      <TableCell>Nom</TableCell>
                      <TableCell>Adresse</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {decheteries.map((d) => (
                      <TableRow
                        key={d.id}
                        hover={true}
                        style={
                          localStorage.getItem("fonction") === '"Responsable"'
                            ? { cursor: "pointer" }
                            : null
                        }
                        onClick={
                          localStorage.getItem("fonction") === '"Responsable"'
                            ? () => navigate(`/decheteries/${d.id}`)
                            : null
                        }
                      >
                        <TableCell>{d.id}</TableCell>
                        <TableCell>{d.nom}</TableCell>
                        <TableCell>
                          {d.adresse_street} {d.adresse_number},{" "}
                          {d.adresse_postcode} {d.adresse_city}
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
                Aucune déchèterie
              </Typography>
            )}
            {localStorage.getItem("fonction") === '"Responsable"' ? (
              <Button
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                onClick={() => navigate("/decheteries/create")}
              >
                Nouvelle déchèterie
              </Button>
            ) : null}
          </Paper>
        </Grid>
      }
    />
  );
}
