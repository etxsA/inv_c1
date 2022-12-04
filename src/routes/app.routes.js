import { Router } from "express";
import { signIn, signUp } from "../controllers/app.auth.controller.js";
import { index, monitor } from "../controllers/app.controller.js";

const router = Router();

// INDEX
router.get('/', index);

// Auth Routes 
router.get('/signup', signUp);
router.get('/signin', signIn);
router.get('/monitor/:action', monitor);





export default router;