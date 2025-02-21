import { Router } from "npm:express@4.21.2";
import { login, register } from "../controllers/authController.ts";

const router = Router();

router.post("/register", register);
router.post("/login", login);

export default router;
