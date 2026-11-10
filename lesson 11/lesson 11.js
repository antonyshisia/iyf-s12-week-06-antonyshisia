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