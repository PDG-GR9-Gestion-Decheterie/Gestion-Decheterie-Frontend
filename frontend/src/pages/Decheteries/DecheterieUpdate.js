import React from "react";
import Layout from "../../components/Layout";
import DecheterieForm from "../../components/DecheterieForm";
import { useParams } from "react-router-dom";

export default function DecheterieUpdate() {
  const { id } = useParams();

  return (
    <Layout
      title={`Déchèterie ${id}`}
      content={<DecheterieForm idDecheterie={id} />}
    />
  );
}
