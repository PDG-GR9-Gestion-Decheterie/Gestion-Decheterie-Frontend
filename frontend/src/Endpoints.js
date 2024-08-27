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
  return fetch(`${apiUrl}/api/profile/`, {
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

async function getAdresses() {
  return fetch(`${apiUrl}/api/adresses`, {
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

async function getFonctions() {
  return fetch(`${apiUrl}/api/fonctions`, {
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
  getContenants,
  getContenant,
  createContenant,
  updateContenant,
  deleteContenant,
  getAdresses,
  getAdresse,
  getFonctions,
};
