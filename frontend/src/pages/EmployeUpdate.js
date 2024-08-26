import React from "react";
import Layout from "../components/Layout";
import EmployeForm from "../components/EmployeForm";
import { useParams } from "react-router-dom";

export default function EmployeUpdate() {
  const { id } = useParams();

  return (
    <Layout
      title={`Utilisateur ${id}`}
      content={<EmployeForm idEmploye={id} />}
    />
  );
}
