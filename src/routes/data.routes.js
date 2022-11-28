import { Router } from "express";
import { ping, getInvernaderos, postInvernaderos, getDataByUserId, getDataByIdAndinv, getDataByMins } from "../controllers/data.controller.js";

const router = Router();

router.get('/', ping);

router.get('/invernaderos', getInvernaderos);
router.post('/invernaderos', postInvernaderos);

router.get('/invernaderos/:user_id', getDataByUserId);
router.get('/invernaderos/:user_id/:inv', getDataByIdAndinv);
router.get('/invernaderos/:user_id/:inv/:mins', getDataByMins);


export default router;