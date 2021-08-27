import { SubscribeButton } from '../SubscribeButton'
import styles from './styles.module.scss'
import { format } from 'date-fns'
import ptBR from 'date-fns/locale/pt-BR'
import { FiCalendar, FiUser, FiClock } from 'react-icons/fi'

interface ArticleProps {
	post: {
		title: string
		updatedAt: string
		content: string
		author: string
	}
	preview: boolean
}

export default function Article({ post, preview }: ArticleProps) {
	return (
		<article className={styles.post}>
			<h1>{post.title}</h1>
			<div className={styles.metaData}>
				<i>
					<FiCalendar />
				</i>
				<p>
					{format(new Date(post.updatedAt), 'd MMM yyyy', {
						locale: ptBR,
					})}
				</p>
				<i>
					<FiUser />
				</i>
				<p>{post.author}</p>
				<i>
					<FiClock />
				</i>
				<p>4 min</p>
			</div>
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
