const loading = document.getElementById("loading");
const errorDiv = document.getElementById("error");
const container = document.getElementById("users-container");
const searchInput = document.getElementById("search");
const sortSelect = document.getElementById("sort");
const cityFilter = document.getElementById("city-filter");

let allUsers = [];

async function fetchUsers() {
  const response = await fetch(
    "https://jsonplaceholder.typicode.com/users"
  );

  if (!response.ok) {
    throw new Error("Failed to fetch users");
  }

  return response.json();
}

async function init() {
  try {
    showLoading();

    allUsers = await fetchUsers();
    populateCityOptions();
    displayUsers(allUsers);
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

function populateCityOptions() {
  const cities = [...new Set(allUsers.map(user => user.address.city))]
    .sort((a, b) => a.localeCompare(b));

  cities.forEach(city => {
    const option = document.createElement("option");
    option.value = city;
    option.textContent = city;
    cityFilter.appendChild(option);
  });
}

function updateDirectory() {
  const query = searchInput.value.trim().toLowerCase();
  const selectedCity = cityFilter.value;

  const filteredUsers = allUsers.filter(user => {
    const matchesSearch =
      user.name.toLowerCase().includes(query) ||
      user.email.toLowerCase().includes(query);

    const matchesCity =
      selectedCity === "" || user.address.city === selectedCity;

    return matchesSearch && matchesCity;
  });

  filteredUsers.sort((userA, userB) => {
    const comparison = userA.name.localeCompare(userB.name);

    if (sortSelect.value === "za") {
      return -comparison;
    }

    return comparison;
  });

  displayUsers(filteredUsers);
}

function displayUsers(users) {
  // Clear the old cards before drawing the updated results.
  container.replaceChildren();

  if (users.length === 0) {
    const message = document.createElement("p");
    message.textContent = "No users match your search.";
    container.appendChild(message);
    return;
  }

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

searchInput.addEventListener("input", updateDirectory);
sortSelect.addEventListener("change", updateDirectory);
cityFilter.addEventListener("change", updateDirectory);

init();