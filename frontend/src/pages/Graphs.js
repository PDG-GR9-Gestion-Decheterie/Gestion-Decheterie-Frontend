import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getRamassages } from "../Endpoints";
import Layout from "../components/Layout";
import { BarChart } from "@mui/x-charts/BarChart";
import { Box, Select, MenuItem, FormControl, InputLabel } from "@mui/material";

export default function Itineraire() {
  const navigate = useNavigate();
  const [ramassages, setRamassages] = React.useState([]);
  const [selectedYear, setSelectedYear] = React.useState(
    new Date().getFullYear()
  );
  const [selectedMonth, setSelectedMonth] = React.useState("Tous");
  const [selectedDecheterie, setSelectedDecheterie] = React.useState("Tous");

  useEffect(() => {
    const fetchRamassages = async () => {
      const response = await getRamassages();
      if (response.ok) {
        const data = await response.json();
        setRamassages(data.ramassagesData);
      } else if (response.status === 401) {
        navigate("/login");
      } else {
        navigate("/error");
      }
    };
    fetchRamassages();
  }, [navigate]);

  const allMonths = [
    "Janvier",
    "Février",
    "Mars",
    "Avril",
    "Mai",
    "Juin",
    "Juillet",
    "Août",
    "Septembre",
    "Octobre",
    "Novembre",
    "Décembre",
  ];

  const years = [
    ...new Set(ramassages.map((r) => new Date(r.date).getFullYear())),
  ];
  const months = ["Tous", ...allMonths];
  const decheteries = [
    ...new Set(ramassages.map((r) => r.decheterie_nom)),
    "Tous",
  ];

  const handleYearChange = (event) => {
    setSelectedYear(event.target.value);
  };

  const handleMonthChange = (event) => {
    setSelectedMonth(event.target.value);
  };

  const handleDecheterieChange = (event) => {
    setSelectedDecheterie(event.target.value);
  };

  const getAllLabels = () => {
    if (selectedMonth === "Tous") {
      return allMonths;
    } else {
      const monthIndex = allMonths.indexOf(selectedMonth) + 1;
      const daysInMonth = new Date(selectedYear, monthIndex, 0).getDate();
      return Array.from({ length: daysInMonth }, (_, i) => (i + 1).toString());
    }
  };

  const labels = getAllLabels();

  // Initialiser ramassagesByPeriod avec tous les labels et comptages à 0
  const ramassagesByPeriod = ramassages.reduce((acc, ramassage) => {
    const ramassageDate = new Date(ramassage.date);
    const ramassageYear = ramassageDate.getFullYear();
    const ramassageMonth = ramassageDate.getMonth() + 1;
    const ramassageDay = ramassageDate.getDate();

    if (
      ramassageYear === selectedYear &&
      (selectedMonth === "Tous" ||
        ramassageMonth === allMonths.indexOf(selectedMonth) + 1) &&
      (selectedDecheterie === "Tous" ||
        ramassage.decheterie_nom === selectedDecheterie)
    ) {
      let dateLabel;
      if (selectedMonth === "Tous") {
        dateLabel = allMonths[ramassageMonth - 1];
      } else {
        dateLabel = ramassageDay.toString();
      }

      const decheterie = ramassage.decheterie_nom;

      if (!acc[decheterie]) {
        acc[decheterie] = {};
      }

      if (!acc[decheterie][dateLabel]) {
        acc[decheterie][dateLabel] = 0;
      }

      acc[decheterie][dateLabel] += 1;
    }

    return acc;
  }, {});

  // Assurer que tous les labels sont présents avec un compte de 0 si pas de données
  Object.keys(ramassagesByPeriod).forEach((decheterie) => {
    labels.forEach((label) => {
      if (!ramassagesByPeriod[decheterie][label]) {
        ramassagesByPeriod[decheterie][label] = 0;
      }
    });
  });

  const seriesData = Object.keys(ramassagesByPeriod).map((decheterie) => {
    const periodData = labels.map(
      (label) => ramassagesByPeriod[decheterie][label] || 0
    );
    return {
      label: decheterie,
      data: periodData,
    };
  });

  return (
    <Layout
      title={"Graphs"}
      content={
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 3,
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "row", // Les sélecteurs seront alignés en ligne
              justifyContent: "center", // Centrer les sélecteurs horizontalement
              gap: 3,
            }}
          >
            <FormControl sx={{ minWidth: 120 }}>
              <InputLabel id="year-select-label">Année</InputLabel>
              <Select
                labelId="year-select-label"
                value={selectedYear}
                onChange={handleYearChange}
                label="Année"
              >
                {years.map((year) => (
                  <MenuItem key={year} value={year}>
                    {year}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <FormControl sx={{ minWidth: 120 }}>
              <InputLabel id="month-select-label">Mois</InputLabel>
              <Select
                labelId="month-select-label"
                value={selectedMonth}
                onChange={handleMonthChange}
                label="Mois"
              >
                {months.map((month, index) => (
                  <MenuItem key={index} value={month}>
                    {month}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <FormControl sx={{ minWidth: 120 }}>
              <InputLabel id="decheterie-select-label">Decheterie</InputLabel>
              <Select
                labelId="decheterie-select-label"
                value={selectedDecheterie}
                onChange={handleDecheterieChange}
                label="Déchèterie"
              >
                {decheteries.map((decheterie) => (
                  <MenuItem key={decheterie} value={decheterie}>
                    {decheterie}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>

          <BarChart
            xAxis={[
              {
                data: labels,
                label: selectedMonth === "Tous" ? "Mois" : "Jours",
                scaleType: "band",
              },
            ]}
            series={seriesData}
            width={1000}
            height={500}
          />
        </Box>
      }
    />
  );
}
