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