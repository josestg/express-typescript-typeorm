import "reflect-metadata"
import express from "express"

import routers from "./routers"
import errorHandler from "./middlewares/errorHandler"

const app = express()

app.use(express.json())
app.use(routers)
app.use(errorHandler)

export default app
