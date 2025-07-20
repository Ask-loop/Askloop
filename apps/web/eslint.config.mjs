import { FlatCompat } from '@eslint/eslintrc'
import pluginJs from '@eslint/js'
import pluginReact from 'eslint-plugin-react'
// import eslintPluginTailwindcss from 'eslint-plugin-tailwindcss';
import eslintPluginUnicorn from 'eslint-plugin-unicorn'
import globals from 'globals'
import tseslint from 'typescript-eslint'

const compat = new FlatCompat({
	baseDirectory: import.meta.dirname
})

/** @type {import("eslint").Linter.Config} */
const config = [
	{
		ignores: [
			'.next/**',
			'public/**',
			'next.config.ts',
			'postcss.config.mjs'
		]
	},
	{ files: ['**/*.{js,mjs,cjs,ts,jsx,tsx}'] },
	{ languageOptions: { globals: { ...globals.browser, ...globals.node } } },
	pluginJs.configs.recommended,
	...tseslint.configs.recommended,
	pluginReact.configs.flat.recommended,
	eslintPluginUnicorn.configs['recommended'],
	// ...eslintPluginTailwindcss.configs['flat/recommended'],
	...compat.config({
		extends: ['next'],
		settings: {
			next: {
				rootDir: '.'
			}
		}
	}),
	...compat.config({
		extends: ['plugin:drizzle/all']
	}),
	{
		rules: {
			'no-undef': 'error',
			'tailwindcss/no-custom-classname': 'off',
			'@typescript-eslint/no-unused-vars': [
				'error',
				{
					argsIgnorePattern: '^_',
					varsIgnorePattern: '^_',
					caughtErrorsIgnorePattern: '^_'
				}
			],
			'unicorn/prevent-abbreviations': 'off'
		}
	},
	{
		files: ['**/*.{jsx,tsx}'],
		rules: {
			'no-console': 'warn',
			'react-hooks/exhaustive-deps': 'off',
			'unicorn/filename-case': 'off',
			'drizzle/enforce-delete-with-where': 'off',
		}
	}
]

export default config
