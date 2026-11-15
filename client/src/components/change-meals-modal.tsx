import React, { useState } from "react"
import type { TMealType } from "../constants/app.constant"

interface Props {
	selectedMeal: TMealType
	setOpenModal: React.Dispatch<React.SetStateAction<boolean>>
	onSave: (meal: TMealType) => void
}

export const ChangeMealsModal: React.FC<Props> = ({ selectedMeal, setOpenModal, onSave }) => {
	const [newDish, setNewDish] = useState<string[]>(selectedMeal.dishes)

	const formatNumberOfDish = (numberOfDish: number) => {
		switch (numberOfDish) {
			case 1:
				return "Первое"
			case 2:
				return "Второе"
			case 3:
				return "Третье"
			case 4:
				return "Четвертое"
			case 5:
				return "Пятое"
			default:
				return `${numberOfDish}-e`
		}
	}

	const handleChangeDish = (index: number, value: string) => {
		setNewDish((prev) => prev.map((dish, i) => (i === index ? value : dish)))
	}

	const handleSave = () => {
		onSave({
			...selectedMeal,
			dishes: newDish,
		})

		setOpenModal(false)
	}

	return (
		<div className="modal-container">
			<div className="modal-header-container">
				<span className="modal-close-button" onClick={() => setOpenModal(false)}>
					X
				</span>
			</div>
			<div className="modal-body-container">
				<p className="modal-header-title">
					Изменить блюда для выбранной категории: <span className="modal-category-span">{selectedMeal.title}</span>
				</p>
				{selectedMeal.dishes.map((dish, index) => (
					<div key={index} className="modal-body-item">
						<p>{formatNumberOfDish(index + 1)} блюдо: </p>
						<input maxLength={18} type="text" value={newDish[index]} onChange={(e) => handleChangeDish(index, e.target.value)} placeholder={dish} />
					</div>
				))}
			</div>
			<div className="modal-footer-container">
				<button onClick={handleSave} className="modal-save-button">
					Сохранить результат
				</button>
			</div>
		</div>
	)
}
