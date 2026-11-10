// ============================================
// Day 1: Delayed Promise
// ============================================

function delay(ms) {
  return new Promise(resolve => {
    setTimeout(resolve, ms);
  });
}

document.getElementById("run-delay").addEventListener("click", async function () {
  const output = document.getElementById("delay-output");
  output.textContent = "Waiting for 2 seconds...";

  await delay(2000);

  output.textContent = "This prints after 2 seconds.";
});


// ============================================
// Day 2: Promise Chain
// ============================================

function randomDelay() {
  return Math.floor(Math.random() * 1200) + 300;
}

function firstTask() {
  return new Promise(resolve => {
    setTimeout(() => resolve("First task finished"), randomDelay());
  });
}

function secondTask() {
  return new Promise(resolve => {
    setTimeout(() => resolve("Second task finished"), randomDelay());
  });
}

function thirdTask() {
  return new Promise(resolve => {
    setTimeout(() => resolve("Third task finished"), randomDelay());
  });
}

document.getElementById("run-chain").addEventListener("click", function () {
  const output = document.getElementById("chain-output");
  const startTime = performance.now();

  output.textContent = "Starting the chain...";

  firstTask()
    .then(message => {
      output.textContent += `\n${message}`;
      return secondTask();
    })
    .then(message => {
      output.textContent += `\n${message}`;
      return thirdTask();
    })
    .then(message => {
      const elapsedSeconds = ((performance.now() - startTime) / 1000).toFixed(2);
      output.textContent += `\n${message}`;
      output.textContent += `\nAll tasks took ${elapsedSeconds} seconds.`;
    })
    .catch(error => {
      output.textContent = `A task failed: ${error}`;
    });
});


// ============================================
// Day 3: Use a default user when the server returns 404
// ============================================

async function fetchUserOrDefault(userId) {
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/users/${userId}`
  );

  if (response.status === 404) {
    return {
      id: userId,
      name: "Guest User",
      email: "No account found"
    };
  }

  if (!response.ok) {
    throw new Error("Could not fetch the user.");
  }

  return response.json();
}

document.getElementById("fetch-user").addEventListener("click", async function () {
  const output = document.getElementById("user-output");
  const userId = Number(document.getElementById("user-id").value);

  output.textContent = "Loading...";

  try {
    const user = await fetchUserOrDefault(userId);
    output.textContent = JSON.stringify(user, null, 2);
  } catch (error) {
    output.textContent = `Error: ${error.message}`;
  }
});


// ============================================
// Day 4: Rewrite callback code using async/await
// ============================================

// This is the callback-based version from the earlier lesson.
function loadUserWithCallback(userId, callback) {
  setTimeout(() => {
    const user = { id: userId, name: "Alex" };
    callback(user);
  }, 1000);
}

// This wrapper turns the callback result into a Promise.
function loadUserAsPromise(userId) {
  return new Promise(resolve => {
    loadUserWithCallback(userId, resolve);
  });
}

// Now async/await can wait for that Promise.
async function loadUserWithAsyncAwait(userId) {
  const user = await loadUserAsPromise(userId);
  return user;
}

document.getElementById("run-async-rewrite").addEventListener("click", async function () {
  const output = document.getElementById("async-output");
  output.textContent = "Loading user...";

  try {
    const user = await loadUserWithAsyncAwait(7);
    output.textContent = `Loaded user ${user.name} (ID: ${user.id}).`;
  } catch (error) {
    output.textContent = `Error: ${error.message}`;
  }
});


// ============================================
// Day 5: Fetch three endpoints in parallel
// ============================================

async function fetchJSON(url) {
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`Request failed: ${url}`);
  }

  return response.json();
}

function showParallelResult(label, data) {
  const output = document.getElementById("parallel-output");
  const item = document.createElement("p");
  item.textContent = `${label}: ${JSON.stringify(data)}`;
  output.appendChild(item);
}

async function runParallelFetches() {
  const output = document.getElementById("parallel-output");
  output.replaceChildren();
  output.textContent = "Fetching three endpoints...";

  const requests = [
    { label: "User", url: "https://jsonplaceholder.typicode.com/users/1" },
    { label: "Post", url: "https://jsonplaceholder.typicode.com/posts/1" },
    { label: "Todo", url: "https://jsonplaceholder.typicode.com/todos/1" }
  ];

  // Start every request now. Each one displays its result as soon as it finishes.
  const trackedRequests = requests.map(request => {
    return fetchJSON(request.url)
      .then(data => {
        showParallelResult(request.label, data);
        return data;
      })
      .catch(error => {
        showParallelResult(request.label, `Error: ${error.message}`);
        throw error;
      });
  });

  // Wait until all requests have either succeeded or failed.
  const results = await Promise.allSettled(trackedRequests);

  const successful = results.filter(result => result.status === "fulfilled").length;
  const summary = document.createElement("p");
  summary.textContent = `Finished: ${successful} succeeded, ${results.length - successful} failed.`;
  output.appendChild(summary);
}

document.getElementById("run-parallel").addEventListener("click", runParallelFetches);