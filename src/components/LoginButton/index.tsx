import styles from './styles.module.scss'

import { signIn, signOut, useSession } from 'next-auth/client'

import { FaGithub } from 'react-icons/fa'
import { FiX } from 'react-icons/fi'

export function LoginButton() {
	const [session, loading] = useSession()

	return session ? (
		<button className={styles.signInButton} type="button">
			<FaGithub color="#04D361" />
			{session.user.name}
			<FiX
				color="#737380"
				className={styles.closeIcon}
				onClick={() => signOut()}
			/>
		</button>
	) : (
		<button
			className={styles.signInButton}
			type="button"
			onClick={() => signIn('github')}
		>
			<FaGithub color="#EBA417"></FaGithub>
			Sign in with GitHub
		</button>
	)
}
