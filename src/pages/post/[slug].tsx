import { GetServerSideProps } from 'next'
import { getSession } from 'next-auth/client'
import Head from 'next/head'
import { RichText } from 'prismic-dom'
import Article from '../../components/Article'
import { getPrismiscClient } from '../../services/prismic'
import readingTime from '../../utils/readingTime'
import Comments from '../../components/Comments'

// import styles from '../posts/post.module.scss'

interface PostProps {
	post: {
		slug: string
		title: string
		content: string
		updatedAt: string
		author: string
		readingTime: string
	}
}

export default function Post({ post }: PostProps) {
	return (
		<>
			<Head>
				<title>{post.title} | Zen Texts</title>
			</Head>

			<main>
				<Article preview={false} post={post} priceId={''} />
				<Comments></Comments>
			</main>
		</>
	)
}

export const getServerSideProps: GetServerSideProps = async ({
	req,
	params,
}) => {
	const session = await getSession({ req })
	const slug = params?.slug

	if (!session?.activeSubscription) {
		return {
			redirect: {
				destination: '/post/preview/' + slug,
				permanent: false,
			},
		}
	}

	const prismic = getPrismiscClient(req)

	const response = await prismic.getByUID('post', String(slug), {})

	const allText = RichText.asText(response.data.content)

	const post = {
		slug,
		title: RichText.asText(response.data.title),
		content: RichText.asHtml(response.data.content),
		updatedAt: response.last_publication_date,
		author: response.data.author,
		readingTime: readingTime(allText) + ' minutes',
	}

	return {
		props: { post },
	}
}
