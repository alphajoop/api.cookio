import express, { NextFunction, Request, Response } from "npm:express@4.21.2";
import dotenv from "npm:dotenv@16.4.7";
import cors from "npm:cors@2.8.5";
import { connectDB } from "./config/database.ts";
import authRoutes from "./routes/authRoutes.ts";

dotenv.config();

const app = express();
const port = Number(Deno.env.get("PORT")) || 3000;

// Connexion à MongoDB Atlas
await connectDB();

// CORS configuration
app.use(cors({
  origin: Deno.env.get("CORS_ORIGINS")?.split(",") || ["http://localhost:3000"],
  methods: Deno.env.get("CORS_METHODS")?.split(",") ||
    ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: Deno.env.get("CORS_HEADERS")?.split(",") ||
    ["Content-Type", "Authorization"],
}));

app.use(express.json());

// Middleware de logging
const reqLogger = (req: Request, _res: Response, next: NextFunction) => {
  console.info(`${req.method} request to "${req.url}"`);
  next();
};
app.use(reqLogger);

app.use("/auth", authRoutes);

app.listen(port, () => {
  console.log(`Server running on port ${port}...`);
});
