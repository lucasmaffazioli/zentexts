import Image from 'next/image'

import styles from './styles.module.scss'

export function HomePage() {
	return (
		<div className={styles.homeContainer}>
			<div className={styles.homeContent}>
				<table>
					<tr>
						<td>
							<h2>Hey, welcome 👋</h2>
							<br />
							<br />
							<h1>
								Articles about the <span>Zen</span> world
							</h1>
							<br />
							<br />
							<h2>
								Get acess to all the publications for <span>$9,90 month</span>
							</h2>
						</td>
						<td>
							<Image
								src="/imgHome.svg"
								alt="picture"
								width={800}
								height={1000}
							/>
						</td>
					</tr>
				</table>
			</div>
		</div>
	)
}
