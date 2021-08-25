import { GetStaticProps } from 'next'
import { useSession } from 'next-auth/client'
import { useRouter } from 'next/dist/client/router'
import Head from 'next/head'
import Link from 'next/link'
import { RichText } from 'prismic-dom'
import { useEffect } from 'react'
import { getPrismiscClient } from '../../../services/prismic'

import styles from './../post.module.scss'

interface PosPreviewProps {
	post: {
		slug: string
		title: string
		content: string
		updatedAt: string
	}
}

export default function PostPreview({ post }: PosPreviewProps) {
	const [session] = useSession()
	const router = useRouter()

	useEffect(() => {
		if (session?.activeSubscription) {
			router.push('/posts/' + post.slug)
		}
	}, [session])

	return (
		<>
			<Head>
				<title>{post.title} | Zen Texts</title>
			</Head>

			<main className={styles.container}>
				<article className={styles.post}>
					<h1>{post.title}</h1>

					<time>{post.updatedAt}</time>
					<div
						className={`${styles.postContent} ${styles.previewContent}`}
						dangerouslySetInnerHTML={{ __html: post.content }}
					/>

					<div className={styles.continueReading}>
						Want to continue reading?
						<Link href="">
							<a>Subscribe now 🤗</a>
						</Link>
					</div>
				</article>
			</main>
		</>
	)
}

export const getStaticPaths = () => {
	return { paths: [], fallback: 'blocking' }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
	const { slug } = params

	const prismic = getPrismiscClient()

	const response = await prismic.getByUID('post', String(slug), {})

	console.log('response!!!')
	// console.log(response)

	const post = {
		slug,
		title: RichText.asText(response.data.title),
		content: RichText.asHtml(response.data.content.splice(0, 2)),
		updatedAt: new Date(response.last_publication_date).toLocaleDateString(
			'pt-BR',
			{
				day: '2-digit',
				month: 'long',
				year: 'numeric',
			}
		),
	}

	return {
		props: { post },

		revalidate: 60 * 60 * 12, // 24 hours
	}
}