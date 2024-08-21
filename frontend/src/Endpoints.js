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
export {
  loginUser,
  logoutUser,
};
