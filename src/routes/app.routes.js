import { Router } from "express";
import { postSignUp, signIn, signUp } from "../controllers/app.auth.controller.js";
import { index, monitor } from "../controllers/app.controller.js";

const router = Router();

// INDEX
router.get('/', index);

// Auth Routes 
router.get('/signup', signUp);
router.post('/signup', postSignUp);

router.get('/signin', signIn);
router.get('/monitor/:action', monitor);





export default router;