import React from "react";
import { Routes, Route } from "react-router-dom";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { AuthProvider } from "./hooks/useAuth";
import Login from "./pages/Login";
import Error from "./pages/Error";
import Home from "./pages/Home";
import Profil from "./pages/Profil";
import Employes from "./pages/Employes/Employes";
import Employe from "./pages/Employes/Employe";
import EmployeCreate from "./pages/Employes/EmployeCreate";
import EmployeUpdate from "./pages/Employes/EmployeUpdate";
import Decheteries from "./pages/Decheteries/Decheteries";
import Decheterie from "./pages/Decheteries/Decheterie";
import DecheterieCreate from "./pages/Decheteries/DecheterieCreate";
import DecheterieUpdate from "./pages/Decheteries/DecheterieUpdate";
import Contenants from "./pages/Contenants/Contenants";
import Contenant from "./pages/Contenants/Contenant";
import ContenantCreate from "./pages/Contenants/ContenantCreate";
import ContenantUpdate from "./pages/Contenants/ContenantUpdate";

export default function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />
        <Route
          path="/profil"
          element={
            <ProtectedRoute>
              <Profil />
            </ProtectedRoute>
          }
        />
        <Route
          path="/employes"
          element={
            <ProtectedRoute>
              <Employes />
            </ProtectedRoute>
          }
        />
        <Route
          path="/employes/:id"
          element={
            <ProtectedRoute>
              <Employe />
            </ProtectedRoute>
          }
        />
        <Route
          path="/employes/create"
          element={
            <ProtectedRoute>
              <EmployeCreate />
            </ProtectedRoute>
          }
        />
        <Route
          path="/employes/:id/update"
          element={
            <ProtectedRoute>
              <EmployeUpdate />
            </ProtectedRoute>
          }
        />
        <Route
          path="/decheteries"
          element={
            <ProtectedRoute>
              <Decheteries />
            </ProtectedRoute>
          }
        />
        <Route
          path="/decheteries/:id"
          element={
            <ProtectedRoute>
              <Decheterie />
            </ProtectedRoute>
          }
        />
        <Route
          path="/decheteries/create"
          element={
            <ProtectedRoute>
              <DecheterieCreate />
            </ProtectedRoute>
          }
        />
        <Route
          path="/decheteries/:id/update"
          element={
            <ProtectedRoute>
              <DecheterieUpdate />
            </ProtectedRoute>
          }
        />
        <Route
          path="/contenants"
          element={
            <ProtectedRoute>
              <Contenants />
            </ProtectedRoute>
          }
        />
        <Route
          path="/contenants/:id"
          element={
            <ProtectedRoute>
              <Contenant />
            </ProtectedRoute>
          }
        />
        <Route
          path="/contenants/create"
          element={
            <ProtectedRoute>
              <ContenantCreate />
            </ProtectedRoute>
          }
        />
        <Route
          path="/contenants/:id/update"
          element={
            <ProtectedRoute>
              <ContenantUpdate />
            </ProtectedRoute>
          }
        />
        <Route path="/login" element={<Login />} />
        <Route path="/error" element={<Error />} />
        <Route path="*" element={<Error />} />
      </Routes>
    </AuthProvider>
  );
}
