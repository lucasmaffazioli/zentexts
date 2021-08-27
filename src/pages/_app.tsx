import { AppProps } from 'next/app'
import '../styles/global.scss'
import { Header } from '../components/Header'
import { Footer } from '../components/Footer'
import { Provider as NextAuthProvider } from 'next-auth/client'

function MyApp({ Component, pageProps }: AppProps) {
	return (
		<NextAuthProvider session={pageProps.session}>
			<Header></Header>
			<Component {...pageProps} />
			<Footer></Footer>
		</NextAuthProvider>
	)
}

export default MyApp
