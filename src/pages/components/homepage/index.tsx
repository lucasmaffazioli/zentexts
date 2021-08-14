import Head from 'next/head'
import Image from 'next/image'
import { SubscribeButton } from '../SubscribeButton'

import styles from './styles.module.scss'

export function HomePage() {
	return (
		<>
			<Head>
				<title>Zen Texts</title>
			</Head>
			<div className={styles.homeContainer}>
				<div className={styles.homeContent}>
					<section>
						<h2>Hey, welcome 👋</h2>
						<br />
						<br />
						<h1>
							Articles about the <span>Zen</span> world.
						</h1>
						<br />
						<h2>
							Get acess to all the publications for <span>$9,90 month</span>
						</h2>
						<SubscribeButton />
					</section>
					<Image src="/imgHome.svg" alt="picture" width={300} height={550} />
				</div>
			</div>
		</>
	)
}
