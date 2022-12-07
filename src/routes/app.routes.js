import { Router } from "express";
import { logout, postSignIn, postSignUp, signIn, signUp } from "../controllers/app.auth.controller.js";
import { index, monitor, profile } from "../controllers/app.controller.js";
import { isLoggedIn, isNotLoggedIn } from "../libs/auth.js";

const router = Router();

// INDEX
router.get('/', index);

// Auth Routes 
router.get('/logout', isLoggedIn, logout);

router.get('/signup', isNotLoggedIn, signUp);
router.post('/signup', isNotLoggedIn, postSignUp);

router.get('/signin', isNotLoggedIn, signIn);
router.post('/signin', isNotLoggedIn, postSignIn);

router.get("/profile", profile);

router.get('/monitor/:action', isLoggedIn, monitor);





export default router;