// "use client";

// import { useState, useEffect } from "react";
// import { BrowserProvider } from "ethers";
// import Web3Modal from "web3modal";
// import TaskList from "./components/TaskList";
// import TaskForm from "./components/TaskForm";
// import Analytics from "./components/Analytics";
// import { getTasks, createTask, updateTask, deleteTask } from "./api";

// export default function Home() {
//   const [tasks, setTasks] = useState([]);
//   const [account, setAccount] = useState(null);
//   const [provider, setProvider] = useState(null);
//   const [token, setToken] = useState(null);
//   const [isClient, setIsClient] = useState(false); // New state to detect client-side

//   // Ensure the component only runs on the client
//   useEffect(() => {
//     setIsClient(true);
//   }, []);

//   useEffect(() => {
//     if (isClient) {
//       const storedToken = localStorage.getItem("token");
//       if (storedToken) {
//         setToken(storedToken);
//       }
//     }
//   }, [isClient]);

//   useEffect(() => {
//     if (token) {
//       fetchTasks();
//     }
//   }, [token]);

//   async function fetchTasks() {
//     if (!token) return;
//     const fetchedTasks = await getTasks();
//     setTasks(fetchedTasks);
//   }

//   // async function connectWallet() {
//   //   try {
//   //     if (!isClient || !window.ethereum) {
//   //       alert("MetaMask not detected. Please install MetaMask.");
//   //       return;
//   //     }
//   //     const web3Modal = new Web3Modal();
//   //     const connection = await web3Modal.connect();
//   //     const provider = new BrowserProvider(connection);
//   //     const signer = await provider.getSigner();
//   //     const accounts = await provider.listAccounts();
//   //     const address = accounts[0].address;

//   //     // Sign a message to authenticate
//   //     const message = `Login to Decentralized Todo App - ${new Date().toISOString()}`;
//   //     const signature = await signer.signMessage(message);

//   //     // Send signature and address to backend
//   //     const response = await fetch("http://localhost:3001/api/authenticate", {
//   //       method: "POST",
//   //       headers: { "Content-Type": "application/json" },
//   //       body: JSON.stringify({ address, signature }),
//   //     });

//   //     const data = await response.json();
//   //     if (data.token) {
//   //       if (isClient) {
//   //         localStorage.setItem("token", data.token);
//   //       }
//   //       setToken(data.token);
//   //       setAccount(address);
//   //     } else {
//   //       alert("Authentication failed!");
//   //     }
//   //   } catch (error) {
//   //     console.error("Error connecting wallet:", error);
//   //   }
//   // }

//   async function connectWallet() {
//   try {
//     if (typeof window === "undefined" || !window.ethereum) {
//       alert("MetaMask not detected. Please install MetaMask.");
//       return;
//     }
    
//     const web3Modal = new Web3Modal();
//     const connection = await web3Modal.connect();
//     const provider = new BrowserProvider(connection);
//     const signer = await provider.getSigner();
//     const accounts = await provider.listAccounts();
//     const address = accounts[0].address;

//     // 🔹 Ensure the same message format as the backend
//     const message = `Login to Decentralized Todo App\nAddress: ${address}`;
//     const signature = await signer.signMessage(message);

//     // Send signature and address to backend
//     const response = await fetch("http://localhost:3001/api/authenticate", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ address, signature }),
//     });

//     const data = await response.json();
//     if (data.token) {
//       localStorage.setItem("token", data.token);
//       setToken(data.token);
//       setAccount(address);
//     } else {
//       alert("Authentication failed!");
//     }
//   } catch (error) {
//     console.error("Error connecting wallet:", error);
//   }
// }

//  async function handleCreateTask(title) {
//     if (!token) {
//       alert("You must be logged in!");
//       return;
//     }
//     const newTask = await createTask(title);
//     if (newTask) {
//       setTasks([...tasks, newTask]);
//     }
//   }

//   async function handleUpdateTask(id, completed) {
//     if (!token) return;
//     const updatedTask = await updateTask(id, completed);
//     if (updatedTask) {
//       setTasks(tasks.map((task) => (task.id === id ? updatedTask : task)));
//     }
//   }

//   async function handleDeleteTask(id) {
//     if (!token) return;
//     await deleteTask(id);
//     setTasks(tasks.filter((task) => task.id !== id));
//   }

//   function handleLogout() {
//     if (isClient) {
//       localStorage.removeItem("token");
//     }
//     setToken(null);
//     setAccount(null);
//     setTasks([]);
//   }

//   return (
//     <div className="container mx-auto px-4 py-8">
//       <h1 className="text-4xl font-bold mb-8">Decentralized Todo App</h1>
//       {account ? (
//         <>
//           <p className="mb-4">Connected: {account}</p>
//           <button
//             onClick={handleLogout}
//             className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
//           >
//             Logout
//           </button>
//           <TaskForm onCreateTask={handleCreateTask} />
//           <TaskList tasks={tasks} onUpdateTask={handleUpdateTask} onDeleteTask={handleDeleteTask} />
//           <Analytics tasks={tasks} />
//         </>
//       ) : (
//         <button
//           onClick={connectWallet}
//           className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
//         >
//           Connect Wallet
//         </button>
//       )}
//     </div>
//   );
// }


"use client"

import { useState, useEffect } from "react"
import './globals.css'
import { BrowserProvider } from "ethers"
import Web3Modal from "web3modal"
import { Avatar,AvatarImage , Card, CardContent, CardHeader, Typography, IconButton, Button} from "@mui/material"
import { Search, Notifications } from "@mui/icons-material"
import { DayPicker } from "react-day-picker"
import "react-day-picker/dist/style.css"
import TaskList from "./components/TaskList"
import TaskForm from "./components/TaskForm"
import Analytics from "./components/Analytics"
import { getTasks, createTask, updateTask, deleteTask } from "./api"
import { Bell } from "lucide-react"


export default function Home() {
  const [tasks, setTasks] = useState([])
  const [account, setAccount] = useState(null)
  const [token, setToken] = useState(null)
  const [date, setDate] = useState(new Date())
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  useEffect(() => {
    if (isClient) {
      const storedToken = localStorage.getItem("token")
      if (storedToken) {
        setToken(storedToken)
      }
    }
  }, [isClient])

  useEffect(() => {
    if (token) {
      fetchTasks()
    }
  }, [token])

  async function fetchTasks() {
    if (!token) return
    const fetchedTasks = await getTasks()
    setTasks(fetchedTasks)
  }

  async function connectWallet() {
    try {
      if (typeof window === "undefined" || !window.ethereum) {
        alert("MetaMask not detected. Please install MetaMask.")
        return
      }

      const web3Modal = new Web3Modal()
      const connection = await web3Modal.connect()
      const provider = new BrowserProvider(connection)
      const signer = await provider.getSigner()
      const accounts = await provider.listAccounts()
      const address = accounts[0].address

      const message = `Login to Decentralized Todo App\nAddress: ${address}`
      const signature = await signer.signMessage(message)

      const response = await fetch("http://localhost:3001/api/authenticate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ address, signature }),
      })

      const data = await response.json()
      if (data.token) {
        localStorage.setItem("token", data.token)
        setToken(data.token)
        setAccount(address)
      } else {
        alert("Authentication failed!")
      }
    } catch (error) {
      console.error("Error connecting wallet:", error)
    }
  }

  async function handleCreateTask(title) {
    if (!token) {
      alert("You must be logged in!")
      return
    }
    const newTask = await createTask(title)
    if (newTask) {
      setTasks([...tasks, newTask])
    }
  }
//   async function handleCreateTask({ title, description, dueDate }) {
//   if (!token) {
//     alert("You must be logged in!");
//     return;
//   }
//   const newTask = await createTask(title, description, dueDate);
//   if (newTask) {
//     setTasks([...tasks, newTask]);
//   }
// }

  async function handleUpdateTask(id, completed) {
    if (!token) return
    const updatedTask = await updateTask(id, { completed })
    console.log("Updated Tasks",updatedTask)
    if (updatedTask) {
      setTasks(tasks.map((task) => (task.id === id ? updatedTask : task)))
    }
  }

  async function handleDeleteTask(id) {
    if (!token) return
    await deleteTask(id)
    setTasks(tasks.filter((task) => task.id !== id))
  }

  function handleLogout() {
    if (isClient) {
      localStorage.removeItem("token")
    }
    setToken(null)
    setAccount(null)
    setTasks([])
  }

  if (!account) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-indigo-50 to-purple-50 p-4">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <h1 className="text-2xl font-bold">Welcome to TaskChain</h1>
          </CardHeader>
          <CardContent>
            <p className="mb-6 text-center text-muted-foreground">
              Connect your wallet to manage your decentralized tasks
            </p>
            <Button onClick={connectWallet} className="w-full" size="lg">
              Connect Wallet
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
   <div className="min-h-screen bg-[#F5F3FF] px-4 py-6">
      <div className="container mx-auto px-4 py-6">
        <header className="mb-8 flex items-center justify-between">
          <div className="flex items-center gap-4">
            {/* <Avatar className="h-12 w-12">
              <AvatarImage src="/placeholder.svg" />
              <AvatarFallback>TC</AvatarFallback>
            </Avatar> */}
            <div>
              <h1 className="text-2xl font-bold">Dashboard</h1>
              <p className="text-sm text-muted-foreground">{account}</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <Button variant="outline" size="icon">
              <Search className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="icon">
              <Bell className="h-4 w-4" />
            </Button>
            <Button variant="destructive" onClick={handleLogout}>
              Disconnect
            </Button>
          </div>
        </header>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <Card className="col-span-2">
            <CardHeader>
              <h1>Your Tasks</h1>
            </CardHeader>
            <CardContent>
              <TaskForm onCreateTask={handleCreateTask} />
              <TaskList tasks={tasks} onUpdateTask={handleUpdateTask} onDeleteTask={handleDeleteTask} />
            </CardContent>
          </Card>

          <div className="space-y-6">
            <Analytics tasks={tasks} />
            <Card>
              <CardHeader>
                <h1>Calendar</h1>
              </CardHeader>
              <CardContent>
                <DayPicker mode="single" selected={date} onSelect={setDate} className="rounded-md border" />
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}

