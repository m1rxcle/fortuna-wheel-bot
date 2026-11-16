export const formatNumberOfDish = (numberOfDish: number) => {
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
