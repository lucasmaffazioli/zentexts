import styles from './styles.module.scss'
import { FaReact } from 'react-icons/fa'

export function Footer() {
	return (
		<div className={styles.footerContainer}>
			<div className={styles.footerContent}>
				{'Made '}
				<a href="https://github.com/lucasmaffazioli/">by Lucas</a>
				{' with 🧡 and '}
				<FaReact></FaReact>{' '}
			</div>
		</div>
	)
}
