import type { VercelRequest, VercelResponse } from "@vercel/node"
import { bot } from "../src/bot/bot.js"
import { startHandler } from "../src/bot/handlers/start.handler.js"

startHandler(bot)

export default async function handler(req: VercelRequest, res: VercelResponse) {
	if (req.method !== "POST") {
		return res.status(405).send("Method Not Allowed")
	}

	const secret = process.env.TELEGRAM_SECRET

	if (!secret || req.headers["x-telegram-bot-api-secret-token"] !== secret) {
		return res.status(403).send("Forbidden")
	}

	try {
		await bot.handleUpdate(req.body)
		return res.status(200).send("OK")
	} catch (error) {
		console.error("Telegram webhook error:", error)
		return res.status(500).send("Internal Server Error")
	}
}
