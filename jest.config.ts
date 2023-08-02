/**
 * For a detailed explanation regarding each configuration property, visit:
 * https://jestjs.io/docs/en/configuration.html
 */
import {JestConfigWithTsJest} from 'ts-jest';

export default {
	testEnvironment: 'jsdom',
	globals: {
		NODE_ENV: 'test',
	},
	globalSetup: './tests/setup/global.ts',
	// setupFilesAfterEnv: ['./tests/setup/index.ts'],
	clearMocks: true, // Automatically clear mock calls and instances between every test
	coverageDirectory: './coverage',
	coveragePathIgnorePatterns: [
		'.storybook/',
		'docs/',
		'scripts/',
		'tests/',
		'build/',
	],
	coverageReporters: ['text', 'html'],
	coverageThreshold: {
		/**
		 * Just in case
		 * - https://jestjs.io/docs/configuration/#coveragethreshold-object
		 * - https://github.com/istanbuljs/nyc#parsing-hints-ignoring-lines
		 */
		global: {
			branches: 80,
			functions: 80,
			lines: 80,
			statements: -10,
		},
	},
	moduleNameMapper: {
		'.(?:gif|png|jpe?g|svg|css|woff2?)$': '<rootDir>/tests/stubs/staticFile.ts',
    '@boonya/ts-monorepo-playground-first/(.*)$': '<rootDir>/packages/first/src/$1',
    '@boonya/ts-monorepo-playground-second/(.*)$': '<rootDir>/packages/second/src/$1',
	},
	modulePathIgnorePatterns: [
		'<rootDir>/build/',
	],
	transform: {
		/**
		 * Here you can read a bit about "ts-jest" slow down and why we need "isolatedModules".
		 * https://stackoverflow.com/questions/45087018/jest-simple-tests-are-slow
		 */
		'^.+\\.tsx?$': ['ts-jest', {isolatedModules: true}],
	},
	transformIgnorePatterns: [
		'node_modules/',
		'\\.pnp\\.[^\\/]+$',
	],
} satisfies JestConfigWithTsJest;
