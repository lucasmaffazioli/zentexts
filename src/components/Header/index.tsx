import Link from 'next/link'
import { LoginButton } from '../LoginButton'
import styles from './styles.module.scss'

export function Header() {
	return (
		<header className={styles.headerContainer}>
			<div className={styles.headerContent}>
				<h1>
					zen<span>.</span>texts
				</h1>
				<nav>
					<Link href="/">
						<a className={styles.active}>Home</a>
					</Link>
					<Link href="/posts">
						<a>Posts</a>
					</Link>
				</nav>
				<LoginButton></LoginButton>
			</div>
		</header>
	)
}
