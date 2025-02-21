export interface User {
  id: number;
  name: string;
  email: string;
  password: string;
  avatar: string;
}

export interface Recipe {
  id: number;
  user_id: number;
  title: string;
  ingredients: string;
  steps: string;
  image: string;
  category: string;
  duration: number;
  difficulty: string;
  is_public: boolean;
  created_at: Date;
}

export interface Favorite {
  user_id: number;
  recipe_id: number;
}
