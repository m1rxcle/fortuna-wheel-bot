import "dotenv/config"
import { SocksProxyAgent } from "socks-proxy-agent"
import { Telegraf } from "telegraf"

const token = process.env.BOT_TOKEN
const proxy = process.env.TELEGRAM_PROXY

if (!token) {
	throw new Error("BOT_TOKEN is missing in .env")
}

export const bot = new Telegraf(token, {
	telegram: proxy ? { agent: new SocksProxyAgent(proxy) } : {},
})
