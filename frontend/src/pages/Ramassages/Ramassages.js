import React, { useEffect } from "react";
import Layout from "../../components/Layout";
import { Grid, Paper, Button } from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router-dom";
import { getRamassages } from "../../Endpoints";

export default function Ramassages() {
  const navigate = useNavigate();
  const [ramassages, setRamassages] = React.useState([]);

  useEffect(() => {
    const fetchRamassages = async () => {
      const response = await getRamassages();
      if (response.ok) {
        const data = await response.json();
        setRamassages(data.ramassagesData);
      } else if (response.status === 403) {
        navigate("/login");
      } else {
        navigate("/error");
      }
    };
    fetchRamassages();
  }, []);

  return (
    <Layout
      title={"Ramassages"}
      content={
        <Grid item xs={12}>
          <Paper sx={{ p: 2, display: "flex", flexDirection: "column" }}>
            <Typography
              component="h2"
              variant="h6"
              color="primary"
              gutterBottom
            >
              Liste des ramassages
            </Typography>
            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell>ID</TableCell>
                  <TableCell>Date</TableCell>
                  <TableCell>Décheterie</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Poids ramassage</TableCell>
                  <TableCell>Contenant</TableCell>
                  <TableCell>Taille contenant</TableCell>
                  <TableCell>Nombre cadres contenant</TableCell>
                  <TableCell>Employé</TableCell>
                  <TableCell>Véhicule</TableCell>
                  <TableCell>Immatriculation véhicule</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {ramassages
                  .sort((a, b) => a.id - b.id)
                  .map((r) => (
                    <TableRow
                      key={r.id}
                      hover={true}
                      style={
                        localStorage.getItem("fonction") === '"Responsable"'
                          ? { cursor: "pointer" }
                          : null
                      }
                      onClick={
                        localStorage.getItem("fonction") === '"Responsable"'
                          ? () => navigate(`/ramassages/${r.id}`)
                          : null
                      }
                    >
                      <TableCell>{r.id}</TableCell>
                      <TableCell>{r.date ? r.date : "-"}</TableCell>
                      <TableCell>
                        {r.decheterie_nom ? r.decheterie_nom : "-"}
                      </TableCell>
                      <TableCell>{r.fk_status ? r.fk_status : "-"}</TableCell>
                      <TableCell>{r.poids ? r.poids : "-"}</TableCell>
                      <TableCell>
                        {r.contenant_nom ? r.contenant_nom : "-"}
                      </TableCell>
                      <TableCell>
                        {r.contenant_taille ? r.contenant_taille : "-"}
                      </TableCell>
                      <TableCell>
                        {r.contenant_nbcadre ? r.contenant_nbcadre : "-"}
                      </TableCell>
                      <TableCell>
                        {r.employe_nom} {r.employe_prenom}
                      </TableCell>
                      <TableCell>
                        {r.vehicule_type ? r.vehicule_type : "-"}
                      </TableCell>
                      <TableCell>
                        {r.vehicule_immatriculation
                          ? r.vehicule_immatriculation
                          : "-"}
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
            <Button
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              onClick={() => navigate("/ramassages/create")}
            >
              Nouveau ramassage
            </Button>
          </Paper>
        </Grid>
      }
    />
  );
}
