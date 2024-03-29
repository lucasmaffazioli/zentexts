import { GetStaticPaths, GetStaticProps } from 'next'
import { useSession } from 'next-auth/client'
import { useRouter } from 'next/dist/client/router'
import Head from 'next/head'
import { RichText } from 'prismic-dom'
import { useEffect } from 'react'
import Article from '../../../components/Article'
import { SubscribeButton } from '../../../components/SubscribeButton'
import shortenText from '../../../utils/shortenText'
import { getPrismiscClient } from '../../../services/prismic'
import getStripeProduct from '../../../services/stripe-product'
import readingTime from '../../../utils/readingTime'

interface PosPreviewProps {
	product: {
		priceId: string
	}
	post: {
		slug: string
		title: string
		content: string
		updatedAt: string
		author: string
		readingTime: string
	}
}

export default function PostPreview({ product, post }: PosPreviewProps) {
	const [session] = useSession()
	const router = useRouter()

	useEffect(() => {
		if (session?.activeSubscription) {
			router.push('/post/' + post.slug)
		}
	}, [session])

	return (
		<>
			<Head>
				<title>{post.title} | Zen Texts</title>
			</Head>

			<main>
				<Article preview={true} post={post} priceId={product.priceId} />
			</main>
		</>
	)
}

export const getStaticPaths: GetStaticPaths = async () => {
	return {
		paths: [],
		fallback: 'blocking',
	}
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
	const { slug } = params

	const prismic = getPrismiscClient()

	const response = await prismic.getByUID('post', String(slug), {})

	const allText = RichText.asText(response.data.content)

	if (response) {
		const post = {
			slug,
			title: RichText.asText(response.data.title),
			content: shortenText(RichText.asText(response.data.content), 50),
			updatedAt: response.last_publication_date,
			author: response.data.author,
			readingTime: readingTime(allText) + ' minutes',
		}

		const product = await getStripeProduct()

		return {
			props: { product, post },

			revalidate: 60 * 30, // 30 minutes
		}
	} else {
		return {
			notFound: true,
		}
	}
}
