import { Recipe } from "../types/index.ts";

const recipes: Recipe[] = [
  {
    id: 1,
    user_id: 1,
    title: "Pâtes Carbonara",
    ingredients: "Pâtes, œufs, lardons, parmesan",
    steps: "1. Cuire les pâtes. 2. Préparer la sauce. 3. Mélanger.",
    image: "https://example.com/carbonara.jpg",
    category: "Italien",
    duration: 30,
    difficulty: "Facile",
    is_public: true,
    created_at: new Date(),
  },
  {
    id: 2,
    user_id: 2,
    title: "Salade César",
    ingredients: "Laitue, poulet, parmesan, croûtons",
    steps: "1. Couper les ingrédients. 2. Ajouter la sauce. 3. Mélanger.",
    image: "https://example.com/cesar.jpg",
    category: "Salade",
    duration: 20,
    difficulty: "Facile",
    is_public: true,
    created_at: new Date(),
  },
];

export default recipes;
