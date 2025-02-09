// "use client"

// import { useState } from "react"

// export default function TaskForm({ onCreateTask }) {
//   const [title, setTitle] = useState("")

//   const handleSubmit = (e) => {
//     e.preventDefault()
//     if (title.trim()) {
//       onCreateTask(title)
//       setTitle("")
//     }
//   }

//   return (
//     <form onSubmit={handleSubmit} className="mb-8">
//       <input
//         type="text"
//         value={title}
//         onChange={(e) => setTitle(e.target.value)}
//         placeholder="Enter a new task"
//         className="border p-2 mr-2 rounded"
//       />
//       <button type="submit" className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
//         Add Task
//       </button>
//     </form>
//   )
// }


"use client"

import { useState } from "react"
import { Button,Input } from "@mui/material"
import { Plus } from "lucide-react"

export default function TaskForm({ onCreateTask }) {
  const [title, setTitle] = useState("")

  const handleSubmit = (e) => {
    e.preventDefault()
    if (title.trim()) {
      onCreateTask(title)
      setTitle("")
    }
  }

  return (
    <form onSubmit={handleSubmit} className="mb-6 flex gap-2">
      <Input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Add a new task..."
        className="flex-1"
      />
      <Button type="submit" size="icon">
        <Plus className="h-4 w-4" />
      </Button>
    </form>
  )
}

