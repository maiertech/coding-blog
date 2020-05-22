# ESLint and Prettier

The best way to use [ESLint](https://eslint.org/) and
[Prettier](https://prettier.io/) is to run them independently and let each do
what it is best at. It is also possible to run Prettier through ESLint. At the
end of this note I will explain why I opted against this approach.

## ESLint config

In our scenario, ESLint takes care of syntactical errors whilte Prettier takes
care of formatting. Therefore, we need to turn off all
[ESLint rules that interfere with Prettier](https://prettier.io/docs/en/integrating-with-linters.html#disable-formatting-rules).
This can be done with
[`eslint-config-prettier`](https://github.com/prettier/eslint-config-prettier).

Some third party ESLint configs, such as
[`@shopify/eslint-plugin`](https://github.com/Shopify/web-foundation/blob/master/packages/eslint-plugin/README.md)
offer a custom way of turning off interfering ESLint rules. My config
[`@maiertech/eslint-config`](https://github.com/maiertech/eslint-config) comes
with interfering rules already turned off.

## Prettier config

You can optionally add your own Prettier config or go with a sharable config,
such as
[`@maiertech/prettier-config`](https://github.com/maiertech/prettier-config). If
you do not have a configuration file, Prettier will run with its defaults.

## `package.json`

ESLint runs on file type `*.js` by default and Prettier suports
[these file types](https://prettier.io/docs/en/index.html) (including `*.js`).

| Script            | Command                                              | Description                                                        |
| :---------------- | :--------------------------------------------------- | :----------------------------------------------------------------- |
| `prettier`        | `prettier . --ignore-path .gitignore`                | Prettier base command. Runs on all supported file types.           |
| `lint`            | `yarn run lint:eslint && yarn run lint:prettier`     | Run ESLint, then Prettier.                                         |
| `lint:eslint`     | `eslint . --ignore-path .gitignore`                  | Run ESLint on `*.js`.                                              |
| `lint:prettier`   | `yarn run prettier --check`                          | Run Prettier on `*.js` and all other supported file types.         |
| `format`          | `yarn run format:eslint && yarn run format:prettier` | Format with ESLint, then Prettier.                                 |
| `format:eslint`   | `yarn run lint:eslint --fix`                         | Fix fixable issues in `*.js` files with ESLint.                    |
| `format:prettier` | `yarn run prettier --write`                          | Re-format `*.js` and all other supported file types with Prettier. |

This means that on `*.js` files not ESLint and Prettier run, while on all other
supported file types Prettier runs. You normally you do not run these scripts
manually. Their main purpose is to run with
[GitHub Actions](https://github.com/features/actions).

## `lint-staged` with `husky`

Installing package `husky` triggers setup up of Git hooks. Configuration is done
in `package.json` under `husky`:

```
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
commited or pushed. For this to work you need to create a
`lint-staged.config.js` and define by extension which scripts to run:

```
module.exports = {
  '*.js': ['eslint --fix', 'prettier --write', 'prettier --check'],
  '*.{md,mdx,css,yaml,yml}': ['prettier --write', 'prettier --check'],
}
```

`eslint --fix` tries to fix syntactical errors. It will throw an error and fail
if it cannot fix it. `prettier --write` tries to re-format supported file types.
Since this command does not throw an error when it cannot re-format a file, we
need to run `prettier --check` afterwards to fail `lint-staged` if necessary.

## VS Code extensions

Running ESLint and Prettier independently means you need to install two
extensions.

### ESLint extension

The
[ESLint extension](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)
picks up `.eslintrc` automatically and visually highlights ESLint warnings or
errors. You need to add this configuration to your `settings.json`:

```
"editor.codeActionsOnSave": {
  "source.fixAll.eslint": true,
}
```

### Prettier extension

The
[Prettier extension](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)
picks up your `.prettierrc`. You have to make this extension default formatter
in `settings.json`:

```
{
  "editor.defaultFormatter": "esbenp.prettier-vscode",
}
```

Formatting works out of the box for all supported file types. However, this
extension does not visually highlight problems that Prettier has detected. The
only way to see that there is a problem that Prettier detected is by clicking
`Prettier` in the status bar.

## Why not run Prettier through ESLint?

It is possible to run Prettier through ESLint. This gives you visual
highlighting of Prettier errors via the ESLint extension in VS Code. This sounds
valuable, but it's not really since many problems that Prettier flags it can fix
automatically. In VS Code this will happen the moment you save a file. No need
to highlight things that will get fixed in 30 seconds.

But to make this work in VS Code, you need to uninstall the Prettier extension
to prevent it from interfering with the ESLint extension. And you need to make
the following configuration changes in `settings.json`:

```
"editor.formatOnSave": false,
"editor.codeActionsOnSave": {
    "source.fixAll.eslint": true,
}
```

This configuration caters for `*.js` files only and you will miss out on all the
re-formatting magic Prettier can prerform on other supported file types. For
instance, I have Prettier format all my Markdown files to 80 characters width
automatically. This is why I think running ESLint and Prettier indepedently
(with interfering ESLint rules turned off) as described above gives you more
mileage.
