import React, { useEffect } from "react";
import Layout from "../../components/Layout";
import { Grid, Paper } from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
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
      } else if (response.status === 403) {
        navigate("/login");
      } else {
        navigate("/error");
      }
    };
    fetchDecheteries();
  }, []);

  return (
    <Layout
      title={"Décheteries"}
      content={
        <Grid item xs={12}>
          <Paper sx={{ p: 2, display: "flex", flexDirection: "column" }}>
            <Typography
              component="h2"
              variant="h6"
              color="primary"
              gutterBottom
            >
              Liste des décheteries
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
                    style={{ cursor: "pointer" }}
                    onClick={() => navigate(`/decheteries/${d.id}`)}
                  >
                    <TableCell>{d.id}</TableCell>
                    <TableCell>{d.nom}</TableCell>
                    <TableCell>{d.adresse}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            {localStorage.getItem("fonction") === '"Responsable"' ? (
              <Button
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                onClick={() => navigate("/decheteries/create")}
              >
                Nouvelle décheterie
              </Button>
            ) : null}
          </Paper>
        </Grid>
      }
    />
  );
}
