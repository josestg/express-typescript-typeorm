import http from "http"
import { createConnection } from "typeorm"

import app from "./app"

const startServer = () => {
  const PORT = process.env.PORT || 8080
  const server = http.createServer(app)
  return server
    .listen(PORT)
    .on("listening", () => console.log("Server is listening on port", PORT))
    .on("error", (err) => {
      console.log("Failed start sever. Err: ", err)
    })
}

// Mencoba menghubukan ke database sebanyak nTries kali
// dimana satu kali percobaan akan dilakukan setiap sleepDuration detik.
const tryConnectToDatabase = async (nTries: number, sleepDuration: number) => {
  const sleep = (ms: number) => new Promise((res) => setTimeout(res, ms))

  for (let i = 1; i <= nTries; i++) {
    try {
      const conn = await createConnection()
      console.log("Database connection:", conn.isConnected)
      return conn.isConnected
    } catch (e) {
      await sleep(sleepDuration).then(() =>
        console.log("Tries left: ", nTries - i)
      )
    }
  }

  return false
}

tryConnectToDatabase(5, 5 * 1000)
  .then((isConnected) => {
    if (isConnected) startServer()
    else process.exit(2)
  })
  .catch(console.error)
