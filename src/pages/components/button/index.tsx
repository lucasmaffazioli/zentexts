import styles from './styles.module.scss'

import { FaGit, FaGithub } from 'react-icons/fa'
import { FiX } from 'react-icons/fi'

export function Button() {
	let isUserLoggedIn = true

	return isUserLoggedIn ? (
		<button className={styles.signInButton} type="button">
			<FaGithub color="#04D361" />
			Lucas Antonio
			<FiX color="#737380" className={styles.closeIcon} />
		</button>
	) : (
		<button className={styles.signInButton} type="button">
			<FaGithub color="#EBA417"></FaGithub>
			Sign in with GitHub
		</button>
	)
}
