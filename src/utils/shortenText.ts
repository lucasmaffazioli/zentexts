export default function shortenText(text: string, outputWords: number) {
	const listWords = text.trim().split(/\s+/)
	let shortText = ''
	listWords.slice(0, outputWords).forEach((word) => (shortText += word + ' '))
	shortText = shortText.trim()

	// console.log(text)
	// console.log(listWords)

	const regex = /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/
	while (true) {
		if (regex.test(shortText[shortText.length - 1])) {
			shortText = shortText.substr(0, shortText.length - 1)
		} else {
			shortText += '...'
			break
		}
	}

	return shortText
}

shortenText('Meu nome não é, Carlos', 3)
