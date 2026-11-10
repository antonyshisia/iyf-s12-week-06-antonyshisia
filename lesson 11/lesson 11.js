// Task 11.1 — Exercise 1: Synchronous code

console.log("1 - Start");
console.log("2 - Middle");
console.log("3 - End");

//Task 11.1 — Exercise 1: Asynchronous code

console.log("1 - Start");

setTimeout(() => {
  console.log("2 - This is delayed");
}, 2000);

console.log("3 - End");

// Task 11.1 — Predict the output

console.log("A");

setTimeout(() => console.log("B"), 0);

console.log("C");

setTimeout(() => console.log("D"), 100);

console.log("E");

// Task 11.1 — Exercise 2: Callback example

function fetchData(callback) {
  setTimeout(() => {
    const data = { name: "john", age: 30 };
    callback(data);
  }, 1000);
}

fetchData((data) => {
  console.log("Data received:", data);
});

// Task 11.1 — Build loadUser

function loadUser(userId, callback) {
  setTimeout(() => {
    const user = { 
        id: userId,
        name: "Alex",
    };
    callback(user);
  }, 1500);
} 

loadUser(42, function(user) {
  console.log("User loaded:", user);
});

// Task 11.2 — Exercise 1: Callback Hell

function getUserData(userId, callback) {
  setTimeout(() => {
    callback({ id: userId, name: "John" });
  }, 1000);
}

function getUserPosts(userId, callback) {
  setTimeout(() => {
    callback([
      { id: 1, title: "Post 1" },
      { id: 2, title: "Post 2" }
    ]);
  }, 1000);
}

function getPostComments(postId, callback) {
  setTimeout(() => {
    callback([
      { id: 1, text: "Great post!" },
      { id: 2, text: "Thanks for sharing" }
    ]);
  }, 1000);
}

// The nested callbacks create the "pyramid of doom"
getUserData(1, function (user) {
  console.log("User:", user);

  getUserPosts(user.id, function (posts) {
    console.log("Posts:", posts);

    getPostComments(posts[0].id, function (comments) {
      console.log("Comments:", comments);
    });
  });
});

// A Promise that succeeds after about 1 second
const myPromise = new Promise((resolve, reject) => {
  const success = true;

  setTimeout(() => {
    if (success) {
      resolve("It worked!");
    } else {
      reject("Something went wrong");
    }
  }, 1000);
});

// .then() runs if the Promise succeeds.
// .catch() runs if the Promise fails.

myPromise
  .then(result => {
    console.log("Success:", result);
  })
  .catch(error => {
    console.log("Error:", error);
  });

function getUserData(userId) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (userId > 0) {
        resolve({ id: userId, name: "John" });
      } else {
        reject("Invalid user ID");
      }
    }, 1000);
});
}

function getUserPosts(userId) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (userId > 0) {
        resolve([
          { id: 1, title: "Post 1" },
          { id: 2, title: "Post 2" }
        ]);
      } else {
        reject("Invalid user ID for posts");
      }
    }, 1000);
  });
}

function getPostComments(postId) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (postId > 0) {
        resolve([
          { id: 1, text: "Great post!" },
          { id: 2, text: "Thanks for sharing" }
        ]);
      } else {
        reject("Invalid post ID");
      }
    }, 1000);
  });
}

getUserData(1)
  .then(user => {
    console.log("User:", user);
  })
  .catch(error => {
    console.log("Error:", error);
  });

  // Task 11.3 — Exercise 1: Chain Promises

getUserData(1)
  .then(user => {
    console.log("User:", user);
    return getUserPosts(user.id);
  })
  .then(posts => {
    console.log("Posts:", posts);
    return getPostComments(posts[0].id);
  })
  .then(comments => {
    console.log("Comments:", comments);
  })
  .catch(error => {
    console.error("Error:", error);
  });

  // Task 11.3 — Exercise 2: Promise.all

const promise1 = getUserData(1);
const promise2 = getUserData(2);
const promise3 = getUserData(3);

Promise.all([promise1, promise2, promise3])
  .then(results => {
    console.log("All users:", results);
  })
  .catch(error => {
    console.error("One failed:", error);
  });

  // Task 11.3 — Exercise 3: Promise.race

const fast = new Promise(resolve => {
  setTimeout(() => resolve("Fast!"), 100);
});

const slow = new Promise(resolve => {
  setTimeout(() => resolve("Slow!"), 500);
});

Promise.race([fast, slow])
  .then(result => {
    console.log("Winner:", result);
  });

  // Task 11.3 — Build: Fetch three users simultaneously

Promise.all([
  getUserData(1),
  getUserData(2),
  getUserData(3)
])
  .then(users => {
    console.log("All three users are ready:");
    console.log(users);
  })
  .catch(error => {
    console.error("Could not load all users:", error);
  });