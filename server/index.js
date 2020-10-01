import "@babel/polyfill";
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import swaggerUi from "swagger-ui-express";
import routers from "./routes/router";
import { connectDB } from "./models/db";
import swaggerDocument from "../swagger.json";
import prodMiddleware from "./middlewares/prod";

dotenv.config();
const app = express();

// call connection db function
connectDB();
app.use(express.json());
app.use("/images", express.static("images"));
// production middleware
prodMiddleware(app);
// cors
app.use(cors());

app.use("/api", routers);
// swagger
app.use("/", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, console.log(`server running  on port ${PORT}`));
export default server;
