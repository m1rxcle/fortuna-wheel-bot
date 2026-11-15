import "dotenv/config"
import { Markup, type Telegraf } from "telegraf"

export function startHandler(bot: Telegraf) {
	bot.start(async (ctx) => {
		await ctx.reply(
			"🎡 Добро пожаловать в наш телеграм бот 'Колесо Фортуны' !\n\nНе знаешь, что сегодня приготовить? Доверь выбор удаче!",
			Markup.inlineKeyboard([Markup.button.webApp("Открыть Fortuna Wheel 🎡", process.env.WEB_APP_URL!)]),
		)
	})
}
