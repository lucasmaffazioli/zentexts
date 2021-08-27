import { SubscribeButton } from '../SubscribeButton'
import styles from './styles.module.scss'

interface ArticleProps {
	post: {
		title: string
		updatedAt: string
		content: string
	}
	preview: boolean
}

export default function Article({ post, preview }: ArticleProps) {
	return (
		<article className={styles.post}>
			<h1>{post.title}</h1>

			<time>{post.updatedAt}</time>
			<div
				className={`${styles.postContent} ${styles.previewContent}`}
				dangerouslySetInnerHTML={{ __html: post.content }}
			/>

			<div className={styles.continueReading}>
				Want to continue reading?
				{/* <SubscribeButton priceId={product.priceId} type="preview" /> */}
				<a>Subscribe now 🤗</a>
			</div>
		</article>
	)
}
