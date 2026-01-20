import express from "express"
import dotenv from "dotenv"
dotenv.config()
import connectDB from "./db/connectDB.js"
import cookieParser from "cookie-parser"
import authRoutes from "./routes/auth.route.js"
import applicationRoutes from "./routes/application.route.js"
import reminderRoutes from "./routes/reminder.route.js"
import aiEmailRoutes from "./routes/aiEmail.route.js"
import cors from "cors"
import { startReminder } from "./utils/reminder.job.js"

const app = express()
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}))

app.use(express.json())
app.use(cookieParser())

app.use("/api/auth",authRoutes)
app.use("/api/application",applicationRoutes)
app.use("/api/reminder",reminderRoutes)
app.use("/api/ai",aiEmailRoutes)

const PORT=process.env.PORT || 5000

app.listen(PORT,()=>{
    connectDB()
    startReminder()
    console.log(`Running On ${PORT}`)
})