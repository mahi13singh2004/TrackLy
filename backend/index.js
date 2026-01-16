import express from "express"
import dotenv from "dotenv"
import connectDB from "./db/connectDB.js"
import cookieParser from "cookie-parser"
import authRoutes from "./routes/auth.route.js"
import applicationRoutes from "./routes/application.route.js"
import cors from "cors"

const app = express()
dotenv.config()

app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}))

app.use(express.json())
app.use(cookieParser())

app.use("/api/auth",authRoutes)
app.use("/api/application",applicationRoutes)

const PORT=process.env.PORT || 5000

app.listen(PORT,()=>{
    connectDB()
    console.log(`Running On ${PORT}`)
})