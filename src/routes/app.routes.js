import { Router } from "express";
import { signIn, signUp } from "../controllers/app.auth.controller.js";
import { index } from "../controllers/app.controller.js";

const router = Router();

// INDEX
router.get('/', index);

// Auth Routes 
router.get('/signup', signUp);
router.get('/signin', signIn);





export default router;