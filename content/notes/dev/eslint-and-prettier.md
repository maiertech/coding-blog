# ESLint and Prettier

There are 2 ways of configuring [ESLint](https://eslint.org/) and
[Prettier](https://prettier.io/):

1. Use both in parallel and let each of them do their own thing.
1. Run Prettier through ESLint. ESLint is Prettier's master.

For the following sections you need to know that ESLint runs on file type `*.js`
by default and Prettier suports
[these file types](https://prettier.io/docs/en/index.html) (including `*.js`) by
default.

## `lint-staged` with `husky`

Installing package `husky` triggers setup up of Git hooks. Configuration is done
in `package.json` under `husky`:

```
// package.json
{
  "husky": {
    "hooks": {
      "pre-commit": "lint-staged",
      "pre-push": "yarn run lint"
    }
  }
}
```

`lint-staged` can run one or more scripts on staged files just before they are
commited. For this to work you need to create a `lint-staged.config.js` and
define by extension which scripts to run.

## Use ESLint and Prettier in parallel

Prettier controls the formatting while ESLint takes care of syntactial errors.
In this setup you need to turn off all
[ESLint rules that interfere with Prettier](https://prettier.io/docs/en/integrating-with-linters.html#disable-formatting-rules).
This can be done with
[`eslint-config-prettier`](https://github.com/prettier/eslint-config-prettier).
If you use a third party ESLint config it probably offers a custom way tod o the
same thing. You can optionally create a `.prettierrc` to avoid running with
Prettier's defaults.

### `package.json`

| Script            | Command                                              | Description                                     |
| :---------------- | :--------------------------------------------------- | :---------------------------------------------- |
| `lint`            | `yarn run lint:eslint && yarn run lint:prettier`     | Run ESLint, then Prettier.                      |
| `lint:eslint`     | `eslint . --ignore-path .gitignore`                  | Lint `*.js` files with ESLint.                  |
| `lint:prettier`   | `prettier . --check --ignore-path .gitignore`        | Lint supported files with Prettier.             |
| `format`          | `yarn run format:eslint && yarn run format:prettier` | Format with ESLint, then Prettier.              |
| `format:eslint`   | `yarn run lint:eslint --fix`                         | Fix fixable issues in `*.js` files with ESLint. |
| `format:prettier` | `yarn run lint:prettier --write`                     | Format supported files with Prettier.           |

You normally you do not run these scripts manually. Their main purpose is to run
with GitHub actions.

### `lint-staged`

```
// lint-staged.config.js
module.exports = {
  '*.js': ['eslint --fix', 'prettier --write', 'prettier --check'],
  '*.{md,mdx,css,yaml,yml}': ['prettier --write', 'prettier --check'],
}
```

`eslint --fix` tries to fix errors and rewrite files. It will throw an error and
fail if it cannot fix it. `prettier --write` tries to reformat and rewrite
supported files. However, this command does not throw an error when it cannot
reformat and rewrite a file. Therefore, you need to run `prettier --check`
afterwards. This makes sure that `lint-staged` fails when there is a problem.

### VS Code extensions

Running ESLint and Prettier in parallel means you need to install two
extensions.

#### ESLint extension

The
[ESLint extension](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)
picks up `.eslintrc` automatically and visually highlights any ESLint warnings
or errors. You need to add this configuration to your `settings.json`:

```
"editor.codeActionsOnSave": {
  "source.fixAll.eslint": true,
}
```

#### Prettier extension

The
[Prettier extension](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)
picks up your `.prettierrc`. You have to make this extension the default
formatter in `settings.json`:

```
{
  "editor.defaultFormatter": "esbenp.prettier-vscode",
}
```

Formatting works out of the box for all supported file types. However, this
extension does not visually highlight problems that Prettier has detected. The
only way to see that there is a problem that Prettier detected and cannot fix is
by looking at the status bar.

## Use Prettier through ESLint

In this setup we
[run Prettier with ESLint](https://prettier.io/docs/en/integrating-with-linters.html#use-eslint-to-run-prettier).
This can be done with
[`eslint-plugin-prettier`](https://github.com/prettier/eslint-plugin-prettier)
in combination with
[`eslint-config-prettier`](https://github.com/prettier/eslint-config-prettier).

### `package.json`

Running Prettier through ESLint simplifies the scripts that wee need to
configure in `package.json`:

| Script   | Command                             | Description                                                                    |
| :------- | :---------------------------------- | :----------------------------------------------------------------------------- |
| `lint`   | `eslint . --ignore-path .gitignore` | Run ESLint on `*.js` files and Prettier on all supported files.                |
| `format` | `yarn run lint --fix`               | Fix fixable issues in `*.js` files and re-format supported files with Prettier |

### `lint-staged`

```
// lint-staged.config.js
module.exports = {
  '*.{js,md,mdx,css,yaml,yml}': ['eslint --fix', 'prettier --check'],
}
```

NEED TO VERIFY IF `prettier --check` is NEEDED (USE YML FILE).

### VS Code

You need to uninstall the Prettier extension to prevent it from interfering with
ESLint. All you need is the
[ESLint extension](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)
with the following configuration in `settings.json`:

```
"editor.formatOnSave": false,
"editor.codeActionsOnSave": {
    "source.fixAll.eslint": true,
}
```
