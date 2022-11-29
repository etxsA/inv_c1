import { Router } from "express";

const router = Router();

// INDEX
router.get('/', (req, res) => {
    res.render('index');
});



export default router;