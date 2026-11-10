const loading = document.getElementById("loading");
const errorDiv = document.getElementById("error");
const container = document.getElementById("users-container");

async function loadUsers() {
  try {
    showLoading();

    const response = await fetch(
      "https://jsonplaceholder.typicode.com/users"
    );

    if (!response.ok) {
      throw new Error("Failed to fetch users");
    }

    const users = await response.json();
    displayUsers(users);
  } catch (error) {
    showError(error.message);
  } finally {
    hideLoading();
  }
}

function showLoading() {
  loading.classList.remove("hidden");
  errorDiv.classList.add("hidden");
  container.replaceChildren();
}

function hideLoading() {
  loading.classList.add("hidden");
}

function showError(message) {
  errorDiv.textContent = `Error: ${message}`;
  errorDiv.classList.remove("hidden");
}

function displayUsers(users) {
  users.forEach(user => {
    const card = document.createElement("article");
    card.className = "user-card";

    const name = document.createElement("h2");
    name.textContent = user.name;

    const email = document.createElement("p");
    email.textContent = `📧 ${user.email}`;

    const company = document.createElement("p");
    company.textContent = `🏢 ${user.company.name}`;

    const city = document.createElement("p");
    city.textContent = `📍 ${user.address.city}`;

    card.append(name, email, company, city);
    container.appendChild(card);
  });
}

// Start loading users when this script runs.
loadUsers();