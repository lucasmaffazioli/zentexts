export default function readingTime(text: string) {
	const totalWords = text.trim().split(/\s+/).length
	const wpm = 225
	return Math.ceil(totalWords / wpm)
}
