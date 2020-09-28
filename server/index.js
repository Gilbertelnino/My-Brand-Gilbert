import "@babel/polyfill";
import express from "express";
import dotenv from "dotenv";
import swaggerUi from "swagger-ui-express";
import routers from "./routes/router";
import { connectDB } from "./models/db";
import swaggerDocument from "../swagger.json";

dotenv.config();

// call connection db function
connectDB();
const app = express();
app.use(express.json());
app.use("/images", express.static("images"));

app.use("/api", routers);
// swagger
app.use("/", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, console.log(`server running  on port ${PORT}`));
export default server;
