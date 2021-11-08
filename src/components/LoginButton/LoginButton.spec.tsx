import { render, screen } from '@testing-library/react';
import { useSession } from 'next-auth/client';
import { mocked } from 'ts-jest/utils'
import { LoginButton } from '.';

jest.mock('next-auth/client')


describe('LoginButton component', () => {
	it('renders SignIn correctly', () => {
		const useSessionMocked = mocked(useSession)

		useSessionMocked.mockReturnValueOnce([null, false])

		render(
			<LoginButton />
		)

		expect(screen.getByText('Sign in with GitHub')).toBeInTheDocument()
	})

	it('renders user correctly', () => {
		const useSessionMocked = mocked(useSession)

		useSessionMocked.mockReturnValueOnce([{ user: { name: 'User Lucas' } }, false])

		render(
			<LoginButton />
		)

		expect(screen.getByText('User Lucas')).toBeInTheDocument()
	})
})
