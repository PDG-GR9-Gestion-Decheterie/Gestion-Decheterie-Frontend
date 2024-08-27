import React from "react";
import Layout from "../../components/Layout";
import EmployeForm from "../../components/EmployeForm";

export default function EmployeCreate() {
  return <Layout title={`Nouvel employé`} content={<EmployeForm />} />;
}
