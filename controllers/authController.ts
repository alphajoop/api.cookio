import { Request, Response } from "npm:express@4.21.2";
import { comparePassword, generateToken, hashPassword } from "../utils/auth.ts";
import User from "../models/User.ts";
import { uploadToCloudinary } from "../utils/cloudinaryUpload.ts";
import { join } from "https://deno.land/std@0.224.0/path/mod.ts";

export const register = async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already registered" });
    }

    const hashedPassword = await hashPassword(password);

    // Upload de l'avatar par défaut sur Cloudinary
    const defaultAvatarPath = join(Deno.cwd(), "public", "default-avatar.png");
    const defaultAvatarContent = await Deno.readFile(defaultAvatarPath);
    const uploadResult = await uploadToCloudinary(
      defaultAvatarContent,
      "avatars",
    );

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      avatar: uploadResult.secure_url,
      avatar_public_id: uploadResult.public_id,
    });

    const token = await generateToken({ id: user._id.toString() });

    res.status(201).json({
      message: "User registered successfully",
      token,
      user: {
        id: user._id.toString(),
        name: user.name,
        email: user.email,
        avatar: user.avatar,
      },
    });
  } catch (error: unknown) {
    const errorMessage = error instanceof Error
      ? error.message
      : "An unexpected error occurred";
    res.status(500).json({ message: errorMessage });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const isPasswordValid = await comparePassword(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = await generateToken({ id: user._id.toString() });

    res.status(200).json({
      message: "Login successful",
      token,
      user: {
        id: user._id.toString(),
        name: user.name,
        email: user.email,
        avatar: user.avatar,
      },
    });
  } catch (error: unknown) {
    const errorMessage = error instanceof Error
      ? error.message
      : "An unexpected error occurred";
    res.status(500).json({ message: errorMessage });
  }
};
