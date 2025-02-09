# TaskChain - Decentralized Task Management

TaskChain is a decentralized task management application that allows users to create, update, and track tasks with blockchain verification. It integrates Web3 authentication, task analytics, and AI-powered task prioritization.

## 📷 Demo Video Link

```
https://drive.google.com/file/d/1zOfiHKvUZcpA7BIiGEQ-UTaEdCF8mxE7/view?usp=sharing
```

## 🚀 Features

- Web3 Authentication (MetaMask)
- Task Management (Create, Update, Delete, View)
- AI-powered Task Prioritization
- Blockchain Verification of Tasks
- Task Completion Analytics

## 🛠 Technology Stack

- **Frontend**: React.js, Next.js, TailwindCSS, Material UI, Lucide Icons
- **Backend**: Node.js, Express.js
- **Database**: In-memory (for now, can be extended to MongoDB/PostgreSQL)
- **Blockchain**: Ethereum (Sepolia Testnet)
- **Smart Contract**: Solidity (Deployed on Sepolia)
- **AI Integration**: OpenAI API

## 🔧 Setup Instructions

### Prerequisites

- Node.js (>=16.x)
- MetaMask installed in your browser
- Infura API Key (for Web3 connection)

### 1️⃣ Clone the Repository

```
$ git clone https://github.com/your-repo/taskchain.git
$ cd taskchain
```

### 2️⃣ Install Dependencies for both frontend and backend seperately

```
$ npm install
```
### 3️⃣ Configure Environment Variables

Create a .env file in the backend folder and add:
```.env
JWT_SECRET=your_secret_key
INFURA_API_KEY=your_infura_key
OPENAI_API_KEY=your_openai_key
```
### 4️⃣ Start the Backend Server
```
$ npm start
```
### 5️⃣ Start the Frontend
```
$ npm run dev
```
## 📡 API Endpoints

### Authentication

POST /api/authenticate - Authenticate with a wallet signature

### Tasks

- GET /api/tasks - Fetch all tasks
- POST /api/tasks - Create a new task
- PUT /api/tasks/:id - Update a task
- DELETE /api/tasks/:id - Delete a task
- GET /api/tasks/stats - Fetch task statistics

## 🔗 Smart Contract

**Network:** Sepolia Testnet

**Contract Address:** 
```
0x14934056Ddfcf3B7041B833e09D6e21d1F52Ca5D
```

**ABI: (Located in server.js)**

```json
[
  {
    "inputs": [
      { "internalType": "uint256", "name": "taskId", "type": "uint256" },
      { "internalType": "bytes32", "name": "taskHash", "type": "bytes32" }
    ],
    "name": "storeTaskHash",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      { "internalType": "uint256", "name": "taskId", "type": "uint256" },
      { "internalType": "bytes32", "name": "taskHash", "type": "bytes32" }
    ],
    "name": "verifyTaskHash",
    "outputs": [ { "internalType": "bool", "name": "", "type": "bool" } ],
    "stateMutability": "view",
    "type": "function"
  }
]
```

## 🎯 Future Enhancements

- Persistent Database (MongoDB/PostgreSQL)
- Multi-Chain Support
- Notifications & Reminders
- Task Delegation & Sharing

## 🤝 Contributing

Pull requests are welcome! For major changes, open an issue first to discuss what you want to improve.
