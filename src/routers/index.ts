import { Router } from "express"
import todosRouter from "./todos"
import userRouter from "./user"

const router = Router()

router.use(userRouter)
router.use("/todos", todosRouter)

export default router
