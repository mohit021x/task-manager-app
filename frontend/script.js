const API_URL = "http://localhost:5000/api/tasks";

async function fetchTasks() {
  const res = await fetch(API_URL);
  const tasks = await res.json();
  const list = document.getElementById("taskList");
  list.innerHTML = "";
  tasks.forEach(t => {
    const li = document.createElement("li");
    li.innerHTML = `
      <span style="text-decoration:${t.completed ? 'line-through' : 'none'}">${t.title}</span>
      <div>
        <button onclick="toggleTask('${t._id}')">✅</button>
        <button onclick="deleteTask('${t._id}')">🗑️</button>
      </div>
    `;
    list.appendChild(li);
  });
}

async function addTask() {
  const input = document.getElementById("taskInput");
  if (!input.value.trim()) return;
  await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ title: input.value })
  });
  input.value = "";
  fetchTasks();
}

async function toggleTask(id) {
  await fetch(`${API_URL}/${id}`, { method: "PUT" });
  fetchTasks();
}

async function deleteTask(id) {
  await fetch(`${API_URL}/${id}`, { method: "DELETE" });
  fetchTasks();
}

document.getElementById("addBtn").addEventListener("click", addTask);
fetchTasks();
