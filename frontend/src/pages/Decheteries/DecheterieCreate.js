import React from "react";
import Layout from "../../components/Layout";
import DecheterieForm from "../../components/DecheterieForm";

export default function DecheterieCreate() {
  return <Layout title={`Nouvelle déchèterie`} content={<DecheterieForm />} />;
}
