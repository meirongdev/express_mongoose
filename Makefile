initBase: initPrettierrc initPrettierignore initEslintConfig addEslintCmd addLintStaged installDevDeps initHusky
	@echo "Base setup complete"
	

initPrettierrc:
	printf "{\n\t\"trailingComma\": \"all\",\n\t\"tabWidth\": 2,\n\t\"printWidth\": 80,\n\t\"semi\": false,\n\t\"jsxSingleQuote\": true,\n\t\"singleQuote\": true\n}\n" > .prettierrc.json
initPrettierignore:
	echo "dist/" > .prettierignore
initEslintConfig:
	printf "import js from '@eslint/js'\nimport eslintConfigPrettier from 'eslint-config-prettier'\n\nexport default [\n\teslintConfigPrettier,\n\t{ ignores: ['**/node_modules/**', '**/dist/**'] },\n\t{\n\t\tfiles: ['**/*.{js}'],\n\t\tlanguageOptions: {\n\t\t\tecmaVersion: 'latest',\n\t\t\tparserOptions: {\n\t\t\t\tecmaVersion: 'latest',\n\t\t\t\tsourceType: 'module',\n\t\t\t},\n\t\t},\n\t\tplugins: {},\n\t\trules: {\n\t\t\t...js.configs.recommended.rules,\n\t\t},\n\t},\n]\n" > eslint.config.js

addEslintCmd:
	pnpm pkg set scripts.lint="eslint src"
addLintStaged:
	pnpm pkg set lint-staged="{\"**/*.{js,jsx}\":[\"npx prettier --write\",\"npx eslint --fix\"]}"
installDevDeps:
	pnpm add -D prettier \
		eslint \
		eslint-config-prettier \
		husky \
		lint-staged \
		@commitlint/cli@19.5.0 \
		@commitlint/config-conventional@19.5.0

initHusky:
	pnpm pkg set scripts.prepare="husky init"
	echo "npx lint-staged" > .husky/pre-commit
	echo "npx commitlint --edit ${1}" > .husky/commit-msg
# initCommitlint:
# 	echo "export default { extends: ['@commitlint/config-conventional'] };" > commitlint.config.js