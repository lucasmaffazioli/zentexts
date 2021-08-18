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
					<a className={styles.active} href="home">
						Home
					</a>
					<a href="posts">Posts</a>
				</nav>
				<LoginButton></LoginButton>
			</div>
		</header>
	)
}
