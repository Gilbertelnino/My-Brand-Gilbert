import express from "express";
import dotenv from "dotenv";
import routers from "./routes/router";
import connectDB from "./models/db";

dotenv.config();

// call connection db function
connectDB();
const app = express();
app.use(express.json());
app.use("/images", express.static("images"));

app.use("/api", routers);

const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`server running  on port ${PORT}`));
