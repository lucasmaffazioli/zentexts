import { ActiveLink } from '../ActiveLink'
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
					<ActiveLink activeClassName={styles.active} href="/">
						<a>Home</a>
					</ActiveLink>
					<ActiveLink activeClassName={styles.active} href="/posts" prefetch>
						<a>Posts</a>
					</ActiveLink>
				</nav>
				<LoginButton></LoginButton>
			</div>
		</header>
	)
}
