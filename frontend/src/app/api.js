// const API_URL = "http://localhost:3001/api"


// // Function to get the token from localStorage
// function getAuthHeaders() {
//   const token = localStorage.getItem("token");
//   return token
//     ? { Authorization: `Bearer ${token}`, "Content-Type": "application/json" }
//     : { "Content-Type": "application/json" };
// }
// export async function getTasks() {
//   try {
//     const response = await fetch(`${API_URL}/tasks`, { headers: getAuthHeaders() });
//     if (!response.ok) throw new Error("Failed to fetch tasks");
//     return await response.json();
//   } catch (error) {
//     console.error("Error fetching tasks:", error);
//     return [];
//   }
// }

// export async function createTask(title) {
//   try {
//     const response = await fetch(`${API_URL}/tasks`, {
//       method: "POST",
//       headers: getAuthHeaders(),
//       body: JSON.stringify({ title }),
//     });
//     if (!response.ok) throw new Error("Failed to create task");
//     return await response.json();
//   } catch (error) {
//     console.error("Error creating task:", error);
//     return null;
//   }
// }


// export async function updateTask(id, completed) {
//   try {
//     const response = await fetch(`${API_URL}/tasks/${id}`, {
//       method: "PUT",
//       headers: getAuthHeaders(),
//       body: JSON.stringify({ completed }),
//     });
//     if (!response.ok) throw new Error("Failed to update task");
//     return await response.json();
//   } catch (error) {
//     console.error("Error updating task:", error);
//     return null;
//   }
// }

// export async function deleteTask(id) {
//   try {
//     const response = await fetch(`${API_URL}/tasks/${id}`, {
//       method: "DELETE",
//       headers: getAuthHeaders(),
//     });
//     if (!response.ok) throw new Error("Failed to delete task");
//   } catch (error) {
//     console.error("Error deleting task:", error);
//   }
// }


const API_URL = "http://localhost:3001/api"

function getAuthHeaders() {
  const token = localStorage.getItem("token")
  return token
    ? { Authorization: `Bearer ${token}`, "Content-Type": "application/json" }
    : { "Content-Type": "application/json" }
}

export async function authenticateWallet(address, signature) {
  try {
    const response = await fetch(`${API_URL}/authenticate`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ address, signature }),
    })
    if (!response.ok) throw new Error("Authentication failed")
    const data = await response.json()
    return data.token
  } catch (error) {
    console.error("Error authenticating wallet:", error)
    throw error
  }
}

export async function getTasks(){
  try {
    const response = await fetch(`${API_URL}/tasks`, { headers: getAuthHeaders() })
    if (!response.ok) throw new Error("Failed to fetch tasks")
    return await response.json()
  } catch (error) {
    console.error("Error fetching tasks:", error)
    return []
  }
}

export async function createTask(title, description = "", dueDate) {
  try {
    const response = await fetch(`${API_URL}/tasks`, {
      method: "POST",
      headers: getAuthHeaders(),
      body: JSON.stringify({ title, description, dueDate }),
    })
    if (!response.ok) throw new Error("Failed to create task")
    return await response.json()
  } catch (error) {
    console.error("Error creating task:", error)
    return null
  }
}

export async function updateTask(id, updates) {
  try {
    const response = await fetch(`${API_URL}/tasks/${id}`, {
      method: "PUT",
      headers: getAuthHeaders(),
      body: JSON.stringify(updates),
    })
    if (!response.ok) throw new Error("Failed to update task")
    return await response.json()
  } catch (error) {
    console.error("Error updating task:", error)
    return null
  }
}

export async function deleteTask(id) {
  try {
    const response = await fetch(`${API_URL}/tasks/${id}`, {
      method: "DELETE",
      headers: getAuthHeaders(),
    })
    if (!response.ok) throw new Error("Failed to delete task")
    return true
  } catch (error) {
    console.error("Error deleting task:", error)
    return false
  }
}

export async function getTaskStats() {
  try {
    const response = await fetch(`${API_URL}/tasks/stats`, { headers: getAuthHeaders() })
    if (!response.ok) throw new Error("Failed to fetch task statistics")
    return await response.json()
  } catch (error) {
    console.error("Error fetching task statistics:", error)
    return null
  }
}

