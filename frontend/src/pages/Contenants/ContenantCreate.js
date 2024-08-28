import React from "react";
import Layout from "../../components/Layout";
import ContenantForm from "../../components/ContenantForm";

export default function ContenantCreate() {
  return <Layout title={`Nouveau contenant`} content={<ContenantForm />} />;
}
