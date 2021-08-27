import { signIn, useSession } from 'next-auth/client'
import { useRouter } from 'next/dist/client/router'
import { api } from '../../services/api'
import { getStripeJs } from '../../services/stripe-js'
import styles from './styles.module.scss'

interface SubscribeButtonProps {
	priceId: string
	type: string
}

export function SubscribeButton(props: SubscribeButtonProps) {
	const [session] = useSession()
	const router = useRouter()

	async function handleSubscribe() {
		if (!session) {
			signIn('github')
			return
		}

		if (session.activeSubscription) {
			router.push('/posts/1')
			return
		}

		try {
			const response = await api.post('/subscribe')

			const { sessionId } = response.data

			const stripe = await getStripeJs()

			await stripe.redirectToCheckout({ sessionId })
		} catch (err) {
			alert(err.message)
		}
	}

	return (
		<button
			type="button"
			className={styles.signInButton}
			onClick={handleSubscribe}
		>
			{props.type === 'home' ? 'Subscribe now' : 'Subscribe now 🤗'}
		</button>
	)
}
