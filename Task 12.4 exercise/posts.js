const postForm = document.getElementById("post-form");
const titleInput = document.getElementById("title");
const bodyInput = document.getElementById("post-body");
const userIdInput = document.getElementById("user-id");
const submitButton = document.getElementById("submit-button");
const statusMessage = document.getElementById("status");
const result = document.getElementById("result");

async function createPost(title, body, userId) {
  const response = await fetch("https://jsonplaceholder.typicode.com/posts", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      title: title,
      body: body,
      userId: userId
    })
  });

  if (!response.ok) {
    throw new Error("Failed to create post");
  }

  return response.json();
}

postForm.addEventListener("submit", async function (event) {
  event.preventDefault();

  const title = titleInput.value.trim();
  const body = bodyInput.value.trim();
  const userId = Number(userIdInput.value);

  if (!title || !body || userId < 1) {
    statusMessage.textContent = "Please fill in all fields with valid values.";
    return;
  }

  submitButton.disabled = true;
  statusMessage.textContent = "Creating post...";
  result.replaceChildren();

  try {
    const newPost = await createPost(title, body, userId);
    displayPost(newPost);
    statusMessage.textContent = "Post created successfully.";
    postForm.reset();
    userIdInput.value = "1";
  } catch (error) {
    statusMessage.textContent = `Error: ${error.message}`;
  } finally {
    submitButton.disabled = false;
  }
});

function displayPost(post) {
  const card = document.createElement("article");
  card.className = "post-result";

  const heading = document.createElement("h2");
  heading.textContent = post.title;

  const postText = document.createElement("p");
  postText.textContent = post.body;

  const details = document.createElement("p");
  details.textContent = `Post ID: ${post.id} · User ID: ${post.userId}`;

  card.append(heading, postText, details);
  result.appendChild(card);
}