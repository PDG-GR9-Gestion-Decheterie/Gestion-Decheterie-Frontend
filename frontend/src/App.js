import React from "react";
import { Routes, Route } from "react-router-dom";

export default function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Ramassages />
            </ProtectedRoute>
          }
        />
      </Routes>
    </AuthProvider>
  );
}
