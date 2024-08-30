const apiUrl = process.env.REACT_APP_API_URL;

async function loginUser(credentials) {
  return fetch(`${apiUrl}/api/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(credentials),
  });
}

async function logoutUser() {
  return fetch(`${apiUrl}/api/logout`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  });
}

async function getProfil() {
  return fetch(`${apiUrl}/api/profile`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
}

async function getDecheteries() {
  return fetch(`${apiUrl}/api/decheteries`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
}

async function getDecheterie(id) {
  return fetch(`${apiUrl}/api/decheteries/${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
}

async function createDecheterie(decheterie) {
  return fetch(`${apiUrl}/api/decheteries`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(decheterie),
  });
}

async function updateDecheterie(decheterie) {
  return fetch(`${apiUrl}/api/decheteries/${decheterie.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(decheterie),
  });
}

async function deleteDecheterie(id) {
  return fetch(`${apiUrl}/api/decheteries/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });
}

async function getEmployes() {
  return fetch(`${apiUrl}/api/employes`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
}

async function getEmploye(id) {
  return fetch(`${apiUrl}/api/employes/${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
}

async function createEmploye(employe) {
  return fetch(`${apiUrl}/api/employes`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(employe),
  });
}

async function updateEmploye(employe) {
  return fetch(`${apiUrl}/api/employes/${employe.idlogin}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(employe),
  });
}

async function deleteEmploye(id) {
  return fetch(`${apiUrl}/api/employes/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });
}

async function getAdresses(string) {
  return fetch(`${apiUrl}/api/adressessearch/${string}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
}

async function getAdresse(id) {
  return fetch(`${apiUrl}/api/adresses/${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
}

async function getVehicules() {
  return fetch(`${apiUrl}/api/vehicules`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
}

async function getVehicule(id) {
  return fetch(`${apiUrl}/api/vehicules/${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
}

async function createVehicule(vehicule) {
  return fetch(`${apiUrl}/api/vehicules`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(vehicule),
  });
}

async function updateVehicule(vehicule) {
  return fetch(`${apiUrl}/api/vehicules/${vehicule.immatriculation}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(vehicule),
  });
}

async function deleteVehicule(id) {
  return fetch(`${apiUrl}/api/vehicules/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });
}

async function getContenants() {
  return fetch(`${apiUrl}/api/contenants`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
}

async function getContenant(id) {
  return fetch(`${apiUrl}/api/contenants/${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
}

async function createContenant(contenant) {
  return fetch(`${apiUrl}/api/contenants`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(contenant),
  });
}

async function updateContenant(contenant) {
  return fetch(`${apiUrl}/api/contenants/${contenant.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(contenant),
  });
}

async function deleteContenant(id) {
  return fetch(`${apiUrl}/api/contenants/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });
}

async function getRamassages() {
  return fetch(`${apiUrl}/api/ramassages`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
}

async function getRamassage(id) {
  return fetch(`${apiUrl}/api/ramassages/${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
}

async function createRamassage(ramassage) {
  return fetch(`${apiUrl}/api/ramassages`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(ramassage),
  });
}

async function updateRamassage(ramassage) {
  return fetch(`${apiUrl}/api/ramassages/${ramassage.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(ramassage),
  });
}

async function deleteRamassage(id) {
  return fetch(`${apiUrl}/api/ramassages/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });
}

async function getFonctions() {
  return fetch(`${apiUrl}/api/fonctions`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
}

async function getDechets() {
  return fetch(`${apiUrl}/api/dechets`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
}

async function getStatus() {
  return fetch(`${apiUrl}/api/status`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
}

async function getApiKey() {
  return fetch(`${apiUrl}/api/apikey`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
}

async function getInfos() {
  return fetch(`${apiUrl}/api/infos`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
}

export {
  loginUser,
  logoutUser,
  getProfil,
  getDecheteries,
  getDecheterie,
  createDecheterie,
  updateDecheterie,
  deleteDecheterie,
  getEmployes,
  getEmploye,
  createEmploye,
  updateEmploye,
  deleteEmploye,
  getAdresses,
  getAdresse,
  getVehicules,
  getVehicule,
  createVehicule,
  updateVehicule,
  deleteVehicule,
  getContenants,
  getContenant,
  createContenant,
  updateContenant,
  deleteContenant,
  getRamassages,
  getRamassage,
  createRamassage,
  updateRamassage,
  deleteRamassage,
  getFonctions,
  getDechets,
  getStatus,
  getApiKey,
  getInfos,
};
