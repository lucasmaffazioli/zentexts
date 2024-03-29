import Prismic from '@prismicio/client'

export function getPrismiscClient(req?: unknown) {
	const prismic = Prismic.client(process.env.PRISMIC_API_ENDPOINT, {
		req,
		accessToken: process.env.PRISMIC_ACCESS_TOKEN,
	})

	return prismic
}
