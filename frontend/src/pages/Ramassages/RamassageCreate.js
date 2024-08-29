import React from "react";
import Layout from "../../components/Layout";
import RamassageForm from "../../components/RamassageForm";

export default function RamassageCreate() {
  return <Layout title={`Nouveau ramassage`} content={<RamassageForm />} />;
}
