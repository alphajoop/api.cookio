import { model, Schema } from "npm:mongoose@8.10.1";

const FavoriteSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: "User", required: true },
  recipe: { type: Schema.Types.ObjectId, ref: "Recipe", required: true },
}, {
  timestamps: true,
});

FavoriteSchema.index({ user: 1, recipe: 1 }, { unique: true });

export default model("Favorite", FavoriteSchema);
