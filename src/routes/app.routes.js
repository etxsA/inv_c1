import { Router } from "express";
import { logout, postSignIn, postSignUp, signIn, signUp } from "../controllers/app.auth.controller.js";
import { index, monitor, monitorIndv, profile } from "../controllers/app.controller.js";
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

router.get("/profile", isLoggedIn,profile);

router.get('/monitor/:action', isLoggedIn, monitor);    // Resumen general
router.get('/monitor/indv/:action', isLoggedIn, monitorIndv); // Grafico de cada Sensor




export default router;