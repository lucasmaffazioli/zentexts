import Image from 'next/image'

import styles from './styles.module.scss'

export function HomePage() {
	return (
		<div className={styles.homeContainer}>
			<div className={styles.homeContent}>
				<div>
					<h2>Hey, welcome 👋</h2>
					<br />
					<br />
					<h1>
						Articles about the <span>Zen</span> world
					</h1>
					<br />
					<h2>
						Get acess to all the publications for <span>$9,90 month</span>
					</h2>
				</div>
				<div>
					<Image src="/imgHome.svg" alt="picture" width={400} height={600} />
				</div>
			</div>
		</div>
	)
}
