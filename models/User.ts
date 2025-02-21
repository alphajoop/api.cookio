import { model, Schema } from "npm:mongoose@8.10.1";

const UserSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  avatar: { type: String },
}, {
  timestamps: true,
});

export default model("User", UserSchema);
