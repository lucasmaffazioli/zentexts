import { GetStaticPaths, GetStaticProps } from 'next'
import Link from 'next/link'
import { getPrismiscClient } from '../../services/prismic'
import { RichText } from 'prismic-dom'
import Prismic from '@prismicio/client'
import styles from './styles.module.scss'
import Head from 'next/head'
import { useSession } from 'next-auth/client'
import shortenText from '../../utils/shortenText'
import { FiCalendar, FiClock, FiUser } from 'react-icons/fi'
import { format } from 'date-fns'
import ptBR from 'date-fns/locale/pt-BR'
import readingTime from '../../utils/readingTime'

interface PostsProps {
	paginas: [
		{
			page: number
			isActive: boolean
		}
	]
	posts: [
		{
			slug: string
			title: string
			excerp: string
			updatedAt: string
			author: string
			readingTime: string
		}
	]
}

export default function Posts({ paginas, posts }: PostsProps) {
	const [session] = useSession()
	// const [currentPage, setCurrentPage] = useState(0);

	return (
		<>
			<Head>
				<title>Posts | Zen Texts</title>
			</Head>
			<main className={styles.container}>
				<div className={styles.posts}>
					{posts.map((post) => (
						<Link
							key={post.slug}
							href={
								session?.activeSubscription
									? `/post/${post.slug}`
									: `/post/preview/${post.slug}`
							}
						>
							<a>
								<strong>{post.title}</strong>
								<p>{post.excerp}</p>
								<div className={styles.metaData}>
									<i>
										<FiCalendar />
									</i>
									<p>{post.updatedAt}</p>
									<i>
										<FiUser />
									</i>
									<p>{post.author}</p>
									<i>
										<FiClock />
									</i>
									<p>{post.readingTime}</p>
								</div>
							</a>
						</Link>
					))}
				</div>
				<div className={styles.paginationBar}>
					{paginas.map((pagina) => (
						<Link key={pagina.page} href={'/posts/' + pagina.page.toString()}>
							<a className={pagina.isActive && styles.activePage}>
								{pagina.page}
							</a>
						</Link>
					))}
				</div>
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
	const PrismicClient = getPrismiscClient()

	const documents = await PrismicClient.query(
		Prismic.predicates.at('document.type', 'post'),
		{
			fetch: ['publication.title', 'publication.content'],
			pageSize: 5,
			page: params?.page,
			orderings: '[document.last_publication_date desc]',
		}
	)

	const posts = documents.results.map((post) => {
		console.log(post)
		// console.log(RichText.asText(post.data.content))
		// console.log(RichText.asHtml(post.data.content))

		// const allText = post.data.content
		// 	.map((item) => {
		// 		return RichText.asText(item.content)
		// 	})
		// 	.join()

		return {
			slug: post.uid,
			title: RichText.asText(post.data.title),
			excerp: shortenText(RichText.asText(post.data.content), 50),
			updatedAt: format(new Date(post.last_publication_date), 'd MMM yyyy', {
				locale: ptBR,
			}),
			author: post.data.author,
			readingTime: readingTime(RichText.asText(post.data.content)) + ' minutes',
		}
	})

	let paginas = []

	for (let step = 1; step <= documents.total_pages; step++) {
		paginas.push({
			page: step,
			isActive: step === documents.page,
		})
	}

	if (+params?.page > 0 && +params?.page <= documents.total_pages) {
		return {
			props: {
				posts,
				paginas,
			},
			revalidate: 60 * 60 * 2, // 2 hours
		}
	} else {
		return {
			notFound: true,
		}
	}
}
