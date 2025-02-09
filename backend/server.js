// const express = require('express');
// const cors = require('cors');
// const jwt = require('jsonwebtoken');
// const Web3 = require('web3');
// const dotenv = require('dotenv');
// const { OpenAI } = require('openai');

// dotenv.config();
// const app = express();
// const port = 3001;

// app.use(cors());
// app.use(express.json());

// // Mock database
// let tasks = [];
// let taskIdCounter = 1;

// // Middleware for JWT authentication
// const authenticateJWT = (req, res, next) => {
//   const authHeader = req.headers.authorization;
//   if (!authHeader) return res.status(401).json({ error: "No token provided" });

//   const token = authHeader.split(" ")[1];
//   jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
//     if (err) return res.status(403).json({ error: "Invalid token" });

//     req.user = user;
//     next();
//   });
// };
// const authenticateWallet = async (req, res) => {
//   const { address, signature } = req.body;

//   if (!address || !signature) return res.status(400).json({ error: "Invalid request" });

//   const message = `Login to Decentralized Todo App - ${new Date().toISOString()}`;
//   const signer = web3.eth.accounts.recover(message, signature);

//   if (signer.toLowerCase() !== address.toLowerCase()) {
//     return res.status(401).json({ error: "Signature verification failed" });
//   }

//   const token = jwt.sign({ address }, process.env.JWT_SECRET, { expiresIn: "1h" });
//   res.json({ token });
// };

// // app.post("/api/authenticate", authenticateWallet);

// app.post("/api/authenticate", async (req, res) => {
//   const { address, signature } = req.body;

//   if (!address || !signature) {
//     return res.status(400).json({ error: "Missing address or signature" });
//   }

//   try {
//     // 🔹 Ensure the same message format as the frontend
//     const message = `Login to Decentralized Todo App\nAddress: ${address}`;

//     // Recover the address from the signed message
//     const recoveredAddress = web3.eth.accounts.recover(message, signature);

//     console.log(`🔍 Expected Address: ${address}`);
//     console.log(`🔍 Recovered Address: ${recoveredAddress}`);

//     if (recoveredAddress.toLowerCase() !== address.toLowerCase()) {
//       return res.status(401).json({ error: "Signature verification failed" });
//     }

//     // If the signature is valid, generate a JWT token
//     const token = jwt.sign({ address }, process.env.JWT_SECRET, { expiresIn: "1h" });

//     res.json({ token });
//   } catch (error) {
//     console.error("Authentication error:", error);
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// });


// // Initialize Web3 and contract
// const web3 = new Web3('https://sepolia.infura.io/v3/3904947378dd4f3683c21e481c8180f2'); // Polygon Mumbai testnet
// // const web3 = new Web3('https://rpc-mumbai.maticvigil.com/'); // Polygon Mumbai testnet
// const contractABI = [
//     {
// 		"inputs": [
// 			{
// 				"internalType": "uint256",
// 				"name": "taskId",
// 				"type": "uint256"
// 			},
// 			{
// 				"internalType": "bytes32",
// 				"name": "taskHash",
// 				"type": "bytes32"
// 			}
// 		],
// 		"name": "storeTaskHash",
// 		"outputs": [],
// 		"stateMutability": "nonpayable",
// 		"type": "function"
// 	},
// 	{
// 		"inputs": [
// 			{
// 				"internalType": "uint256",
// 				"name": "taskId",
// 				"type": "uint256"
// 			},
// 			{
// 				"internalType": "bytes32",
// 				"name": "taskHash",
// 				"type": "bytes32"
// 			}
// 		],
// 		"name": "verifyTaskHash",
// 		"outputs": [
// 			{
// 				"internalType": "bool",
// 				"name": "",
// 				"type": "bool"
// 			}
// 		],
// 		"stateMutability": "view",
// 		"type": "function"
//     }
// ]; // Add your contract ABI here
// const contractAddress = '0x14934056Ddfcf3B7041B833e09D6e21d1F52Ca5D'; // Add your deployed contract address here
// const contract = new web3.eth.Contract(contractABI, contractAddress);

// // Initialize OpenAI
// const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

// // API routes
// app.post('/api/login', (req, res) => {
//   // Mock login - in a real app, validate credentials
//   const token = jwt.sign({ username: req.body.username }, process.env.JWT_SECRET, { expiresIn: '1h' });
//   res.json({ token });
// });

// app.get('/api/tasks', (req, res) => {
//   res.json(tasks);
// });

// // app.post('/api/tasks', async (req, res) => {
// //   const newTask = {
// //     id: taskIdCounter++,
// //     title: req.body.title,
// //     completed: false
// //   };
// //   console.log("New Task created: ", newTask);
// //   tasks.push(newTask);

// //   // Store task hash on blockchain
// //   const taskHash = web3.utils.sha3(JSON.stringify(newTask));
// //   await contract.methods.storeTaskHash(newTask.id, taskHash).send({ from: req.user.address });

// //   // Get AI suggestion for task priority
// //   const completion = await openai.chat.completions.create({
// //     model: "gpt-3.5-turbo",
// //     messages: [{ role: "system", content: "You are a helpful assistant that suggests task priorities." },
// //                { role: "user", content: `Suggest a priority for this task: ${newTask.title}` }],
// //   });
// //   const priority = completion.choices[0].message.content;
// //   console.log("Priority suggestion: ", priority);
// //   res.json({ ...newTask, priority });
// // });

// app.post("/api/tasks", authenticateJWT, async (req, res) => {
//   const newTask = {
//     id: taskIdCounter++,
//     title: req.body.title,
//     completed: false
//   };
  
//   // Only allow tasks from authenticated users
//   if (!req.user) return res.status(403).json({ error: "Unauthorized" });

//   tasks.push(newTask);
//   res.json(newTask);
// });

// app.put('/api/tasks/:id', authenticateJWT, async (req, res) => {
//   const task = tasks.find(t => t.id === parseInt(req.params.id));
//   if (task) {
//     task.completed = req.body.completed;

//     // Verify task completion on blockchain
//     const taskHash = web3.utils.sha3(JSON.stringify(task));
//     const isVerified = await contract.methods.verifyTaskHash(task.id, taskHash).call();

//     if (isVerified) {
//       res.json(task);
//     } else {
//       res.status(400).json({ error: 'Task verification failed' });
//     }
//   } else {
//     res.status(404).json({ error: 'Task not found' });
//   }
// });

// app.delete('/api/tasks/:id', authenticateJWT, (req, res) => {
//   tasks = tasks.filter(t => t.id !== parseInt(req.params.id));
//   res.sendStatus(204);
// });

// app.listen(port, () => {
//   console.log(`Server running on port ${port}`);
// });


const express = require("express")
const cors = require("cors")
const jwt = require("jsonwebtoken")
const Web3 = require("web3")
const dotenv = require("dotenv")
const { OpenAI } = require("openai")

dotenv.config()
const app = express()
const port = 3001

// Improved CORS configuration
app.use(
  cors({
    origin: "http://localhost:3000",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  }),
)

app.use(express.json())

// Enhanced task structure
const tasks = []
let taskIdCounter = 1

// Middleware for JWT authentication
const authenticateJWT = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization
    if (!authHeader) {
      return res.status(401).json({ error: "Authentication required" })
    }

    const token = authHeader.split(" ")[1]
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
      if (err) {
        return res.status(403).json({ error: "Invalid or expired token" })
      }

      req.user = user
      next()
    })
  } catch (error) {
    console.error("Authentication error:", error)
    res.status(500).json({ error: "Internal server error" })
  }
}

// Improved wallet authentication
const authenticateWallet = async (req, res) => {
  try {
    const { address, signature } = req.body

    if (!address || !signature) {
      return res.status(400).json({ error: "Missing address or signature" })
    }

    const message = `Login to Decentralized Todo App\nAddress: ${address}`
    const recoveredAddress = web3.eth.accounts.recover(message, signature)

    if (recoveredAddress.toLowerCase() !== address.toLowerCase()) {
      return res.status(401).json({ error: "Invalid signature" })
    }

    const token = jwt.sign({ address }, process.env.JWT_SECRET, { expiresIn: "24h" })
    res.json({ token })
  } catch (error) {
    console.error("Wallet authentication error:", error)
    res.status(500).json({ error: "Authentication failed" })
  }
}

// Initialize Web3 and contract
const web3 = new Web3("https://sepolia.infura.io/v3/3904947378dd4f3683c21e481c8180f2")
const contractABI = [
  {
    inputs: [
      {
        internalType: "uint256",
        name: "taskId",
        type: "uint256",
      },
      {
        internalType: "bytes32",
        name: "taskHash",
        type: "bytes32",
      },
    ],
    name: "storeTaskHash",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "taskId",
        type: "uint256",
      },
      {
        internalType: "bytes32",
        name: "taskHash",
        type: "bytes32",
      },
    ],
    name: "verifyTaskHash",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
]
const contractAddress = "0x14934056Ddfcf3B7041B833e09D6e21d1F52Ca5D"
const contract = new web3.eth.Contract(contractABI, contractAddress)

// Initialize OpenAI
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY })

// Authentication route
app.post("/api/authenticate", authenticateWallet)

// Get all tasks
app.get("/api/tasks", authenticateJWT, (req, res) => {
  try {
    const userTasks = tasks.filter((task) => task.userAddress === req.user.address)
    res.json(userTasks)
  } catch (error) {
    console.error("Error fetching tasks:", error)
    res.status(500).json({ error: "Failed to fetch tasks" })
  }
})

// Create new task
app.post("/api/tasks", authenticateJWT, async (req, res) => {
  try {
    const { title, description, dueDate } = req.body

    if (!title) {
      return res.status(400).json({ error: "Title is required" })
    }

    const newTask = {
      id: taskIdCounter++,
      title,
      description,
      dueDate,
      completed: false,
      createdAt: new Date().toISOString(),
      userAddress: req.user.address,
    }

    // Store task hash on blockchain
    const taskHash = web3.utils.sha3(JSON.stringify(newTask))
    try {
      await contract.methods.storeTaskHash(newTask.id, taskHash).send({
        from: req.user.address,
        gas: 200000,
      })
    } catch (error) {
      console.error("Blockchain storage error:", error)
      // Continue even if blockchain storage fails
    }

    // Get AI suggestion for task priority
    try {
      const completion = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [
          { role: "system", content: "You are a helpful assistant that suggests task priorities." },
          { role: "user", content: `Suggest a priority (High/Medium/Low) for this task: ${title}` },
        ],
      })
      newTask.priority = completion.choices[0].message.content.toLowerCase().includes("high")
        ? "high"
        : completion.choices[0].message.content.toLowerCase().includes("medium")
          ? "medium"
          : "low"
    } catch (error) {
      console.error("AI suggestion error:", error)
      newTask.priority = "medium" // Default priority
    }
    console.log("New Task created:", newTask)
    tasks.push(newTask)
    res.status(201).json(newTask)
  } catch (error) {
    console.error("Error creating task:", error)
    res.status(500).json({ error: "Failed to create task" })
  }
})

// Update task
app.put("/api/tasks/:id", authenticateJWT, async (req, res) => {
  try {
    const taskId = Number.parseInt(req.params.id)
    if (isNaN(taskId)) return res.status(400).json({ error: "Invalid task ID" });
    const task = tasks.find((t) => t.id === taskId && t.userAddress === req.user.address)

    if (!task) {
      return res.status(404).json({ error: "Task not found" })
    }

    const updates = req.body
    Object.assign(task, updates)
    task.updatedAt = new Date().toISOString()

    // Verify task hash on blockchain
    const taskHash = web3.utils.sha3(JSON.stringify(task))
    try {
      const isVerified = await contract.methods.verifyTaskHash(task.id, taskHash).call()
      if (!isVerified) {
        console.warn("Task verification failed on blockchain")
      }
    } catch (error) {
      console.error("Blockchain verification error:", error)
    }

    res.json(task)
  } catch (error) {
    console.error("Error updating task:", error)
    res.status(500).json({ error: "Failed to update task" })
  }
})

// Delete task
app.delete("/api/tasks/:id", authenticateJWT, (req, res) => {
  try {
    const taskId = Number.parseInt(req.params.id)
    const taskIndex = tasks.findIndex((t) => t.id === taskId && t.userAddress === req.user.address)

    if (taskIndex === -1) {
      return res.status(404).json({ error: "Task not found" })
    }

    tasks.splice(taskIndex, 1)
    res.sendStatus(204)
  } catch (error) {
    console.error("Error deleting task:", error)
    res.status(500).json({ error: "Failed to delete task" })
  }
})

// Get task statistics
app.get("/api/tasks/stats", authenticateJWT, (req, res) => {
  try {
    const userTasks = tasks.filter((task) => task.userAddress === req.user.address)
    const stats = {
      total: userTasks.length,
      completed: userTasks.filter((t) => t.completed).length,
      pending: userTasks.filter((t) => !t.completed).length,
      byPriority: {
        high: userTasks.filter((t) => t.priority === "high").length,
        medium: userTasks.filter((t) => t.priority === "medium").length,
        low: userTasks.filter((t) => t.priority === "low").length,
      },
    }
    res.json(stats)
  } catch (error) {
    console.error("Error fetching stats:", error)
    res.status(500).json({ error: "Failed to fetch statistics" })
  }
})

app.listen(port, () => {
  console.log(`Server running on port ${port}`)
})

