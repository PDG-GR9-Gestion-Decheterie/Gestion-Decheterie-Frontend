import React from "react";
import Layout from "../../components/Layout";
import ContenantForm from "../../components/ContenantForm";
import { useParams } from "react-router-dom";

export default function ContenantUpdate() {
  const { id } = useParams();

  return (
    <Layout
      title={`Contenant ${id}`}
      content={<ContenantForm idContenant={id} />}
    />
  );
}
