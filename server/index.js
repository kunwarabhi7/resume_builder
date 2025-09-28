import express from "express";
import connectToDB from "./utills/connectToDB.js";
import dotenv from "dotenv";
import { authRouter } from "./routes/auth.route.js";
import cors from "cors";
import cookieParser from "cookie-parser";
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

//middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({ origin: "http://localhost:3000", credentials: true }));
app.use(cookieParser());

//health check route
app.get("/", (req, res) => {
  res.send("Hello World!");
});

//user route
app.use("/api/users", authRouter);

app.listen(PORT, () => {
  connectToDB();
  console.log(`Server is running on http://localhost:${PORT}`);
});
