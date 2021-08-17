import { GetServerSideProps } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import { SubscribeButton } from '../components/SubscribeButton'

import styles from './home.module.scss'

export default function Home(props) {
	console.log('props')
	console.log(props)

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
							Get acess to all the publications for <span>$9.90 / month</span>
						</h2>
						<SubscribeButton />
					</section>
					<Image src="/imgHome.svg" alt="picture" width={300} height={550} />
				</div>
			</div>
		</>
	)
}

export const getServerSideProps: GetServerSideProps = async () => {
	console.log('server side')

	return {
		props: {
			name: 'lucas',
			age: 21,
		},
	}
}
