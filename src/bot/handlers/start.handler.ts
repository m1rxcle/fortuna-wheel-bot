import type { Telegraf } from "telegraf"

export function startHandler(bot: Telegraf) {
	bot.start(async (ctx) => {
		await ctx.reply("Привет! Добро пожаловать в Fortuna Wheel! 🎡")
	})
}
