import { Router } from "express";
import userRouter from "./users"; 
import taskRouter from "./tasks";


const router = Router();

router.use(userRouter);
router.use(taskRouter);


export default router;