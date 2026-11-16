import { useState } from "react"
import { meals, type TMealType } from "./constants/app.constant"
import { getRandomOffset, spinWheel } from "./utils/spin-wheel"

import "./App.css"
import { ChangeMealsModal } from "./components/change-meals-modal"
import useStorage from "./hooks/useStorage"

export type MealCategory = TMealType["id"]

function App() {
	const [category, setCategory] = useState<MealCategory>("breakfast")
	const [result, setResult] = useState<Record<MealCategory, string | null>>({
		breakfast: localStorage.getItem("breakfastResult") || null,
		lunch: localStorage.getItem("lunchResult") || null,
		dinner: localStorage.getItem("dinnerResult") || null,
	})

	const [isUsed, setIsUsed] = useState<Record<MealCategory, boolean>>({
		breakfast: !!localStorage.getItem("breakfastResult"),
		lunch: !!localStorage.getItem("lunchResult"),
		dinner: !!localStorage.getItem("dinnerResult"),
	})

	const [rotation, setRotation] = useState(0)
	const [isSpinning, setIsSpinning] = useState(false)
	const [pendingResult, setPendingResult] = useState<string | null>(null)

	const [openModal, setOpenModal] = useState(false)

	const [timeLeft, setTimeLeft] = useState<string>("")

	const [initialMeals, setInitialMeals] = useState<TMealType[]>(() => {
		if (typeof window === "undefined") return meals

		try {
			const savedMeals = localStorage.getItem("meals")
			return savedMeals ? JSON.parse(savedMeals) : meals
		} catch {
			return meals
		}
	})

	const { saveToLocalStorageResult } = useStorage({ initialMeals, setTimeLeft, setResult, setIsUsed })

	const selectedMeal = initialMeals.find((meal) => meal.id === category) ?? meals[0]

	const handleUpdateMeal = (updatedMeal: TMealType) => {
		setInitialMeals((prev) => prev.map((meal) => (meal.id === updatedMeal.id ? updatedMeal : meal)))
	}

	const handleSpinWheel = () => {
		if (isSpinning) return

		const selectedDish = spinWheel(selectedMeal.dishes)
		const selectedIndex = selectedMeal.dishes.indexOf(selectedDish)

		const segmentAngle = 360 / selectedMeal.dishes.length
		const randomOffset = getRandomOffset(segmentAngle)

		const selectedAngle = selectedIndex * segmentAngle + randomOffset

		const currentAngle = rotation % 360
		const correction = (360 - ((selectedAngle + currentAngle) % 360)) % 360

		const nextRotation = rotation + 360 * 5 + correction

		saveToLocalStorageResult(category, selectedDish)

		setResult((prev) => ({
			...prev,
			[category]: null,
		}))
		setIsUsed((prev) => ({
			...prev,
			[category]: true,
		}))
		setPendingResult(selectedDish)
		setIsSpinning(true)
		setRotation(nextRotation)
	}

	return (
		<main className="app">
			<section style={{ opacity: openModal ? 0.3 : 1 }}>
				<header className="header">
					<div className="brand">
						<span className="brand-icon">🎡</span>
						<span>Fortuna Wheel</span>
					</div>
					<span className="header-label">КОЛЕСО УДАЧИ</span>
				</header>

				<section className="hero">
					<span className="eyebrow">ВАШ ЕЖЕДНЕВНЫЙ АССИСТЕНТ ПО ПИЩЕ</span>
					<h1>
						Не знаешь,
						<span> что поесть?</span>
					</h1>
					<p>Доверь выбор удаче. Колесо уже готово!</p>
				</section>

				<section className="category-section">
					<div className="section-heading">
						<h2>Выбери категорию</h2>
						<span>01 / 02</span>
					</div>

					<div className="categories">
						{initialMeals.map((meal) => (
							<button
								key={meal.id}
								className={`category-card ${category === meal.id ? "active" : ""}`}
								onClick={() => {
									setCategory(meal.id)
								}}
							>
								<span className="category-emoji">{meal.emoji}</span>
								<span className="category-title">{meal.title}</span>
								<span className="category-check">{category === meal.id ? "✓" : "+"}</span>
							</button>
						))}
					</div>
				</section>

				<section className="wheel-section">
					<div className="section-heading">
						<h2>
							{selectedMeal.emoji} {selectedMeal.title}
						</h2>
						<span>02 / 02</span>
					</div>

					<div className="wheel-description-container">
						<p className="wheel-description">{selectedMeal.subtitle}</p>
						<button onClick={() => setOpenModal(true)} className="wheel-change-dish-button">
							⚙ Изменить
						</button>
					</div>

					<div className="wheel-placeholder">
						<div
							className={`wheel-circle ${isSpinning ? "spinning" : ""}`}
							style={{ transform: `rotate(${rotation}deg)` }}
							onTransitionEnd={() => {
								if (isSpinning) {
									setResult((prev) => ({
										...prev,
										[category]: pendingResult,
									}))

									setPendingResult(null)
									setIsSpinning(false)
								}
							}}
						>
							{selectedMeal.dishes.map((dish, index) => (
								<div
									key={index}
									className="wheel-segment"
									style={
										{
											"--index": index,
											"--angle": `${index * 72 + 36}deg`,
										} as React.CSSProperties
									}
								>
									<span>{dish}</span>
								</div>
							))}

							<span className="wheel-center">🎡</span>
						</div>

						<span className="wheel-pointer">▼</span>
						<span className="wheel-hint">КОЛЕСО ФОРТУНЫ</span>
					</div>

					{result[category] && (
						<div className="dish-preview">
							<span className="dish-preview-label">Сегодня вам выпало: </span>
							<div className="dish-list">
								✨<h3>{result[category]}</h3>✨
							</div>
						</div>
					)}

					<button onClick={handleSpinWheel} className="spin-button" disabled={isUsed[category] || isSpinning}>
						<span>✦</span>
						{!result[category] && isSpinning && "Колесо вращается..."}
						{!result[category] && !isSpinning && "Крутить колесо"}
						{result[category] && (
							<span>
								Сегодня вы уже крутили колесо,
								<br /> осталось время - {timeLeft}
							</span>
						)}
						<span>✦</span>
					</button>
				</section>

				<footer className="footer">
					MADE BY{" "}
					<a className="footer-link" href="https://github.com/m1rxcle" target="_blank" rel="noopener noreferrer">
						{"M1RXCLE".split("").map((letter, index) => (
							<span key={index} style={{ "--index": index } as React.CSSProperties}>
								{letter}
							</span>
						))}
					</a>
					WITH <span style={{ fontSize: "16px" }}>♥</span>
				</footer>
			</section>
			{openModal && <ChangeMealsModal setOpenModal={setOpenModal} selectedMeal={selectedMeal} onSave={handleUpdateMeal} />}
		</main>
	)
}

export default App
