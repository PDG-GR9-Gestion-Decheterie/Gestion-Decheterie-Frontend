import React from "react";
import Layout from "../../components/Layout";
import VehiculeForm from "../../components/VehiculeForm";

export default function VehiculeCreate() {
  return <Layout title={`Nouveau véhicule`} content={<VehiculeForm />} />;
}
