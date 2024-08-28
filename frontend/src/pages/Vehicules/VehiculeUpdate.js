import React from "react";
import Layout from "../../components/Layout";
import VehiculeForm from "../../components/VehiculeForm";
import { useParams } from "react-router-dom";

export default function VehiculeUpdate() {
  const { id } = useParams();

  return (
    <Layout
      title={`Véhicule ${id}`}
      content={<VehiculeForm idVehicule={id} />}
    />
  );
}
