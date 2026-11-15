export const spinWheel = (dishes: string[]): string => {
	const randomIndex = Math.floor(Math.random() * dishes.length)

	return dishes[randomIndex]
}

export const getRandomOffset = (segmentAngle: number): number => {
	return segmentAngle * (0.15 + Math.random() * 0.7)
}
