export const formatTime = (milliseconds: number): string => {
	const totalMinutes = Math.floor(milliseconds / 60000)

	const hours = Math.floor(totalMinutes / 60)

	const minutes = totalMinutes % 60

	const seconds = Math.floor((milliseconds % 60000) / 1000)

	return `${hours}ч ${minutes}м ${seconds}с`
}
