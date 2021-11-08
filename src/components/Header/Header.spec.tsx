import { render, screen } from '@testing-library/react';
import { Header } from '.';

jest.mock('next/dist/client/router', () => {
	return {
		useRouter: () => {
			return {
				asPath: '/' // Path to active link
			}
		}

	}
})

jest.mock('next-auth/client', () => {
	return {
		useSession() {
			return [null, false]
		},
		signIn: () => {
			return true
		},
		signOut: () => {
			return true
		},
	}
})




// import { signIn, signOut, useSession } from 'next-auth/client'

describe('Header component', () => {
	// it ou teste
	it('renders correctly', () => {
		render(
			<Header />
		)

		expect(screen.getByText('Home')).toBeInTheDocument()
		expect(screen.getByText('Posts')).toBeInTheDocument()

		// debug() // Essa função printa como ficou o DOM com o teste
	})
})
