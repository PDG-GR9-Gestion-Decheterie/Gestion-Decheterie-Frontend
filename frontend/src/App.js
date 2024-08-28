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
import Vehicules from "./pages/Vehicules/Vehicules";
import Vehicule from "./pages/Vehicules/Vehicule";
import VehiculeCreate from "./pages/Vehicules/VehiculeCreate";
import VehiculeUpdate from "./pages/Vehicules/VehiculeUpdate";

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
          path="/vehicules"
          element={
            <ProtectedRoute>
              <Vehicules />
            </ProtectedRoute>
          }
        />
        <Route
          path="/vehicules/:id"
          element={
            <ProtectedRoute>
              <Vehicule />
            </ProtectedRoute>
          }
        />
        <Route
          path="/vehicules/create"
          element={
            <ProtectedRoute>
              <VehiculeCreate />
            </ProtectedRoute>
          }
        />
        <Route
          path="/vehicules/:id/update"
          element={
            <ProtectedRoute>
              <VehiculeUpdate />
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
