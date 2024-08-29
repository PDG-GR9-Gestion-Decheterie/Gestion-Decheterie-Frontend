import React from "react";
import Layout from "../../components/Layout";
import RamassageForm from "../../components/RamassageForm";
import { useParams } from "react-router-dom";

export default function RamassageUpdate() {
  const { id } = useParams();

  return (
    <Layout
      title={`Ramassage n°${id}`}
      content={<RamassageForm idRamassage={id} />}
    />
  );
}
