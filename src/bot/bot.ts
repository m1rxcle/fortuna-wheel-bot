import "dotenv/config"
import { SocksProxyAgent } from "socks-proxy-agent"
import { Telegraf } from "telegraf"

const agent = new SocksProxyAgent("socks5h://127.0.0.1:10808")

const token = process.env.BOT_TOKEN

if (!token) {
	throw new Error("BOT_TOKEN is missing in .env")
}

export const bot = new Telegraf(token, {
	telegram: {
		agent,
	},
})
