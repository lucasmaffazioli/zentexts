import { GetStaticProps } from 'next'
import { getPrismiscClient } from '../../services/prismic'
import PrismicDOM from 'prismic-dom'
import styles from './styles.module.scss'

interface PostsProps {
	documents: {
		page: number
		total_pages: number
		results: [
			{
				id: string
				uid: string
				last_publication_date: Date
				data: {
					title
					content
					body
				}
			}
		]
	}
}

export default function Posts({ documents }: PostsProps) {
	function truncate(input) {
		if (input.length > 5) {
			return input.substring(0, 500) + '...'
		}
		return input
	}

	return (
		<main className={styles.container}>
			<div className={styles.posts}>
				{documents.results.map((post) => {
					console.log(post)

					return (
						<a key={post.uid} href="">
							<time>
								{Intl.DateTimeFormat('pt-BR').format(
									new Date(post.last_publication_date)
								)}
							</time>
							<strong>{PrismicDOM.RichText.asText(post.data.title)}</strong>
							<p>{truncate(PrismicDOM.RichText.asText(post.data.content))}</p>
						</a>
					)
				})}

				{/* <a href="">
					<time>12 de março de 2021</time>
					<strong>How to meditate</strong>
					<p>
						Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum
						eget aliquam libero. Vestibulum tempus tincidunt ante, a mattis
						ante. Pellentesque vestibulum ac neque eu maximus. Donec accumsan
						dapibus tortor sed lobortis. Donec posuere hendrerit dignissim.
					</p>
				</a>
				<a href="">
					<time>12 de março de 2021</time>
					<strong>How to meditate</strong>
					<p>
						Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum
						eget aliquam libero. Vestibulum tempus tincidunt ante, a mattis
						ante. Pellentesque vestibulum ac neque eu maximus. Donec accumsan
						dapibus tortor sed lobortis. Donec posuere hendrerit dignissim.
					</p>
				</a>
				<a href="">
					<time>12 de março de 2021</time>
					<strong>How to meditate</strong>
					<p>
						Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum
						eget aliquam libero. Vestibulum tempus tincidunt ante, a mattis
						ante. Pellentesque vestibulum ac neque eu maximus. Donec accumsan
						dapibus tortor sed lobortis. Donec posuere hendrerit dignissim.
					</p>
				</a> */}
			</div>
			{/* <p>Pages: {documents.total_pages}</p> */}
		</main>
	)
}

export const getStaticProps: GetStaticProps = async () => {
	const PrismicClient = getPrismiscClient()
	const documents = await PrismicClient.query('', { pageSize: 5 })

	console.log(documents)

	return {
		props: {
			documents,
		},
		revalidate: 60 * 60 * 2, // 2 hours
	}
}
