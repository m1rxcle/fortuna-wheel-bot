export const meals = [
	{
		id: "breakfast",
		title: "Завтрак",
		subtitle: "С чего начнём этот день?",
		emoji: "🌅",
		dishes: ["Омлет", "Сырники", "Блины", "Овсянка", "Тосты с авокадо"],
	},
	{
		id: "lunch",
		title: "Обед",
		subtitle: "Время подкрепиться!",
		emoji: "☀️",
		dishes: ["Борщ", "Паста карбонара", "Плов", "Курица с рисом", "Том Ям"],
	},
	{
		id: "dinner",
		title: "Ужин",
		subtitle: "Что приготовим вечером?",
		emoji: "🌙",
		dishes: ["Пицца", "Суши", "Стейк", "Цезарь", "Паста"],
	},
]

export type TMealType = (typeof meals)[number]
