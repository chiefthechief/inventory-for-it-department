const express = require("express") 
const dotenv = require("dotenv") 
const connectDB = require("./config/db") 
const deviceRoutes = require("./routes/device")
const issueRecordRoutes = require("./routes/issueRecord")
const cors = require("cors")

// Load environment variables
dotenv.config() 

// Connect to database
connectDB() 

// Initialize app
const app = express() 

// Middleware to parse JSON
app.use(express.json()) 

app.use(cors()) // Enable CORS for all routes

// Sample route
app.get("/", (req, res) => {
    res.send("Inventory System API is running...") 
}) 
app.use("/devices", deviceRoutes)
app.use("/issue", issueRecordRoutes)


// Start server
const PORT = process.env.PORT || 5000 
app.listen(PORT, () => console.log(`Server running on port ${PORT}`)) 
