import { Router } from "express"
import TodoController from "../controllers/TodoController"
import { IsAuthenticated } from "../middlewares/IsAuthenticated"
const router = Router()

router.use(IsAuthenticated)
router.get("/", TodoController.findAll)
router.post("/", TodoController.create)

export default router
