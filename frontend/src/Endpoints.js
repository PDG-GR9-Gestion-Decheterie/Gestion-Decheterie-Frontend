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
  return fetch(
    `https://localhost/api/employes/${localStorage
      .getItem("userId")
      .replace('"', "")
      .replace('"', "")}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
}

async function getDecheteries() {
  return fetch(`https://localhost/api/decheteries`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
}

async function getEmployes() {
  return fetch("https://localhost/api/employes", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
}

async function getEmploye(id) {
  return fetch(`https://localhost/api/employes/${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
}

async function createEmploye(employe) {
  return fetch("https://localhost/api/employes", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(employe),
  });
}

async function updateEmploye(employe) {
  return fetch(`https://localhost/api/employes/${employe.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(employe),
  });
}

async function deleteEmploye(id) {
  return fetch(`https://localhost/api/employes/${id}`, {
    method: "DELETE",
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
  getEmployes,
  getEmploye,
  createEmploye,
  updateEmploye,
  deleteEmploye,
};
