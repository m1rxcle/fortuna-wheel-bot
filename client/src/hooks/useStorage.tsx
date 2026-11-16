import { useEffect } from "react"
import type { MealCategory } from "../App"
import type { TMealType } from "../constants/app.constant"
import { formatTime } from "../utils/format-date"

interface Props {
	initialMeals: TMealType[]
	setTimeLeft: (timeLeft: string) => void
	setResult: (result: Record<string, string | null>) => void
	setIsUsed: (isUsed: Record<string, boolean>) => void
}

const categories: MealCategory[] = ["breakfast", "lunch", "dinner"]

export default function useStorage({ initialMeals, setTimeLeft, setResult, setIsUsed }: Props) {
	const saveToLocalStorageResult = (category: MealCategory, dish: string) => {
		if (!category || !dish) return

		localStorage.setItem(`${category}Result`, dish)
	}

	useEffect(() => {
		localStorage.setItem("meals", JSON.stringify(initialMeals))
	}, [initialMeals])

	const resetDailyResults = () => {
		categories.forEach((category) => {
			localStorage.removeItem(`${category}Result`)
		})

		setResult({
			breakfast: null,
			lunch: null,
			dinner: null,
		})

		setIsUsed({
			breakfast: false,
			lunch: false,
			dinner: false,
		})
	}

	useEffect(() => {
		const updateTimeLeft = () => {
			const now = new Date()

			const today = now.toLocaleDateString("ru-RU")
			const lastResetDate = localStorage.getItem("lastResetDate")

			if (lastResetDate !== today) {
				resetDailyResults()

				localStorage.setItem("lastResetDate", today)
			}

			const nextDay = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1)

			setTimeLeft(formatTime(nextDay.getTime() - now.getTime()))
		}

		updateTimeLeft()

		const intervalId = setInterval(updateTimeLeft, 1000)

		return () => clearInterval(intervalId)
	}, [setIsUsed, setResult, setTimeLeft])

	return {
		saveToLocalStorageResult,
	}
}
