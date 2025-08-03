import { logUserIn, registerUser } from "@controllers/auth.controller.js";
import { Router } from "express";

const router = Router();

router.post('/register', registerUser);
router.post('/login', logUserIn);

router.get('/profile', () => {});

export default router;