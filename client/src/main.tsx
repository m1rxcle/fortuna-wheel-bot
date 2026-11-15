import { init, miniApp, mockTelegramEnv } from "@tma.js/sdk"
import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import App from "./App.tsx"
import "./index.css"

const isTelegram = new URLSearchParams(window.location.hash.slice(1)).has("tgWebAppPlatform")

if (!isTelegram) {
	mockTelegramEnv({
		launchParams: {
			tgWebAppPlatform: "tdesktop",
			tgWebAppVersion: "9.0",
			tgWebAppThemeParams: {
				bg_color: "#ffffff",
				text_color: "#000000",
				button_color: "#3390ec",
				button_text_color: "#ffffff",
				secondary_bg_color: "#f0f0f0",
			},
		},
	})
}

init()

miniApp.mount()
miniApp.bindCssVars()
miniApp.ready()

console.log("Fortuna Wheel: Telegram environment ready")

createRoot(document.getElementById("root")!).render(
	<StrictMode>
		<App />
	</StrictMode>,
)
