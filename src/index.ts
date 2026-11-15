import dotenv from "dotenv"
import express from "express"
import { bot } from "./bot/bot.js"
import { startHandler } from "./bot/handlers/start.handler.js"

dotenv.config()

const app = express()

const port = process.env.PORT

startHandler(bot)

bot
	.launch()
	.then(() => {
		console.log("Telegram bot is running")
	})
	.catch((error) => {
		console.error("Telegram startup error:", error)
	})

process.once("SIGINT", () => bot.stop("SIGINT"))
process.once("SIGTERM", () => bot.stop("SIGTERM"))

app.listen(port, () => {
	console.log(`Server is running on port ${port}`)
})
