async function loginUser(credentials) {
  return fetch("https://localhost/api/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(credentials),
  });
}

async function logoutUser() {
  return fetch("https://localhost/api/logout", {
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

export { loginUser, logoutUser, getProfil, getDecheteries };
