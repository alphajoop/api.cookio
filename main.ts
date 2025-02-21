import express, { NextFunction, Request, Response } from "npm:express@4.21.2";
import dotenv from "npm:dotenv@16.4.7";
import cors from "npm:cors@2.8.5";
import users from "./data/users.ts";
import recipes from "./data/recipes.ts";
import favorites from "./data/favorites.ts";

dotenv.config();

const app = express();
const port = Number(Deno.env.get("PORT")) || 3000;

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

// Auth routes
app.post("/auth/register", (req: Request, res: Response) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    return res.status(400).json({ message: "Missing required fields" });
  }
  const newUser = {
    id: users.length + 1,
    name,
    email,
    password,
    avatar: "default-avatar.png",
  };
  users.push(newUser);
  res.status(201).json({ message: "User registered successfully" });
});

app.post("/auth/login", (req: Request, res: Response) => {
  const { email, password } = req.body;
  const user = users.find((u) => u.email === email && u.password === password);
  if (!user) {
    return res.status(401).json({ message: "Invalid credentials" });
  }
  res.status(200).json({ message: "Login successful" });
});

// Recipe routes
app.get("/recipes", (_req: Request, res: Response) => {
  res.json(recipes);
});

app.post("/recipes", (req: Request, res: Response) => {
  const { title, ingredients, steps, image, category, duration, difficulty } =
    req.body;
  const newRecipe = {
    id: recipes.length + 1,
    user_id: 1,
    title,
    ingredients,
    steps,
    image,
    category,
    duration,
    difficulty,
    is_public: true,
    created_at: new Date(),
  };
  recipes.push(newRecipe);
  res.status(201).json(newRecipe);
});

app.put("/recipes/:id", (req: Request, res: Response) => {
  const recipe = recipes.find((r) => r.id === Number(req.params.id));
  if (!recipe) return res.status(404).json({ message: "Recipe not found" });
  Object.assign(recipe, req.body);
  res.json(recipe);
});

app.delete("/recipes/:id", (req: Request, res: Response) => {
  const index = recipes.findIndex((r) => r.id === Number(req.params.id));
  if (index === -1) {
    return res.status(404).json({ message: "Recipe not found" });
  }
  recipes.splice(index, 1);
  res.status(204).send();
});

// Favorites routes
app.post("/favorites", (req: Request, res: Response) => {
  const { user_id, recipe_id } = req.body;
  if (
    !users.find((u) => u.id === user_id) ||
    !recipes.find((r) => r.id === recipe_id)
  ) {
    return res.status(400).json({ message: "Invalid user or recipe" });
  }
  const newFavorite = { user_id, recipe_id };
  favorites.push(newFavorite);
  res.status(201).json({ message: "Recipe added to favorites" });
});

app.get("/favorites", (_req: Request, res: Response) => {
  res.json(favorites);
});

app.listen(port, () => {
  console.log(`Server running on port ${port}...`);
});
