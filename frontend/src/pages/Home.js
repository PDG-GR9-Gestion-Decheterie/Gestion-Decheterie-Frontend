import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../components/Layout";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
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
          <Paper sx={{ p: 2, display: "flex", flexDirection: "column" }}>
            {infos.length > 0 ? (
              <>
                <Typography
                  component="h2"
                  variant="h6"
                  color="primary"
                  gutterBottom
                >
                  Informations
                </Typography>
                <Table size="small">
                  <TableHead>
                    <TableRow>
                      <TableCell>Décheterie</TableCell>
                      <TableCell>Contenants</TableCell>
                      <TableCell>Adresse</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {infos
                      .sort((a, b) => a.nom - b.nom)
                      .map((i) => (
                        <TableRow key={i.nom} hover={true}>
                          <TableCell>{i.nom}</TableCell>
                          <TableCell>{i.contenants.join(", ")}</TableCell>
                          <TableCell>
                            {i.adresse_street} {i.adresse_number},{" "}
                            {i.adresse_postcode} {i.adresse_city}
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
                Aucune information
              </Typography>
            )}
          </Paper>
        </Grid>
      }
    />
  );
}
