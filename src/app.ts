import express, { Application, Response, Request } from "express";
import { PrismaClient } from "@prisma/client";
import index from "./routes/index";
import * as dotenv from "dotenv";
import cors from "cors";
const app: Application = express();
const port = process.env.PORT || 3309;

dotenv.config();
app.use(express.json());
app.use(cors());
app.use("/", index);

app.listen(port, () => {
  console.log(`Express connected to ${port}`);
});
