import { render } from '@testing-library/react';
import { ActiveLink } from '.';

jest.mock('next/dist/client/router', () => {
	return {
		useRouter: () => {
			return {
				asPath: '/' // Path to active link
			}
		}

	}
})

describe('ActiveLink component', () => {
	// it ou teste
	it('renders correctly', () => {
		const { debug, getByText } = render(
			<ActiveLink href="/Home" activeClassName='active'>
				<a>Home</a>
			</ActiveLink>
		)

		expect(getByText('Home')).toBeInTheDocument() // Espera que encontre Home dentro do da arvore

		// debug() // Essa função printa como ficou o DOM com o teste
	})

	it('adds active class if the link is active (/)', () => {
		const { debug, getByText } = render(
			<ActiveLink href="/" activeClassName='active'>
				<a>Home</a>
			</ActiveLink>
		)

		expect(getByText('Home')).toHaveClass('active') // Espera que encontre Home dentro do da arvore

		// debug() // Essa função printa como ficou o DOM com o teste
	})

	it('renders without correct inactive class', () => {
		const { debug, getByText } = render(
			<ActiveLink href="/NoActiveLink" activeClassName='active'>
				<a>Home</a>
			</ActiveLink>
		)

		expect(getByText('Home')).not.toHaveClass('active') // Espera que encontre Home dentro do da arvore

		// debug() // Essa função printa como ficou o DOM com o teste
	})
})
