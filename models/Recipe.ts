import { model, Schema } from "npm:mongoose@8.10.1";

const RecipeSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: "User", required: true },
  title: { type: String, required: true },
  ingredients: { type: String, required: true },
  steps: { type: String, required: true },
  image: { type: String },
  category: { type: String },
  duration: { type: Number },
  difficulty: { type: String },
  isPublic: { type: Boolean, default: true },
}, {
  timestamps: true,
});

export default model("Recipe", RecipeSchema);
