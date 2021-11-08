module.exports = {
	testPathIgnorePatterns: [
		".next",
		"node_modules",
		"docs",
		"dist",
		"build",
		"out",
		"coverage",
		"lib"
	],
	setupFilesAfterEnv: [
		"<rootDir>/src/tests/setupTests.ts"
	],
	transform: {
		"^.+\\.(js|jsx|ts|tsx)$": "babel-jest"
	},
	moduleNameMapper: {
		"\\.(scss|css|sass)$": "identity-obj-proxy"
	},
	testEnvironment: 'jsdom'
}