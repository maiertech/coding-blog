# Automated Code Formatting

Run lint upon pull request.

Prettier config for atom can be done via eslint config file. This is kind of
handy as opposed to having to configure prettier-atom.

[ESLint](http://eslint.org/) knows two types of rules:

1. Rules that detect patterns in the AST.
1. Rules relating to code formatting.

While ESLint was not meant to be a code formatter, but rather a tool to detect
patterns in the AST.

## Use prettier inside ESLint

Use prettier as a rule and before that turn off all ESLint formatting rules.

There are 2 approaches: prettier-eslint vs eslint-plugin-prettier. The former
runs prettier and then `eslint --fix`. The latter gives control to eslint and
the prettier output is just another eslint rule.

2 Problems 2 solve:

1 format the code => use prettier 2 catch bugs => use eslint

The sequence is lint then format. Because linting checks for bugs and formatting
is presentation of bug-free code.

You should see prettier as formatting tool not as linter. Even though prettier
can fix some lint errors.

Use [prettier](https://github.com/prettier/prettier) to format source code
nicely. Prettier creates a JavaScript AST transformation and then renders the
AST nicely formatted, but opinionated, ignoring any original format.

When using ESLint, running prettier needs to be followed by `eslint --fix`. This
can be achieved with
[prettier-eslint-cli](https://github.com/prettier/prettier-eslint-cli), which
unlike [prettier-eslint](https://github.com/prettier/prettier-eslint) works on
files, not just strings.

This approach works best when enforced via a pre-commit hook:

- Install [pre-commit](https://github.com/observing/pre-commit) as dev
  dependency and configure it to execute
  [lint-staged](https://github.com/okonet/lint-staged), which is another dev
  dependency. During installation pre-commit adds a pre-commit hook to
  `.git/hooks`.
- Configure lint-staged to run `prettier-eslint --write` and then `git add`.
- `git commit` triggers the pre-commit hook. Unfortunately, the pre-commit hook
  does not get triggered when using [GitKraken](https://www.gitkraken.com/).
- If the pre-commit hook does not pass, `git commit` throws an error and blocks
  the commit.

This is the configuration in `package.json`

```JSON
"scripts": {
  "lint:fix": "prettier-eslint src/**/*.js --write",
  "lint:js": "eslint src/**/*.js",
  "lint:staged": "lint-staged",
},
"lint-staged": {
  "*.js": [
    "prettier-eslint --write",
    "git add"
  ]
},
"pre-commit": "lint:staged",
```

with `lint:fix` and `lint:js` being optional convenience scripts. This
configuration is a great way to ensure that only clean JavaScript gets
committed. But we can go one step further and let the editor do the actual
formatting for us.

For [Atom](https://atom.io/) install
[prettier-atom](https://atom.io/packages/prettier-atom). Turn on **ESLint
integration** and enable **Format on save**. Turn off **Fix errors on save** in
plugin [linter-eslint](https://github.com/AtomLinter/linter-eslint).
prettier-atom takes full control of formatting and linting.

Now you have a pre-commit hook in place to catch sloppily formatted JavaScript
code, but it hardly every actually blocks commit since the editor takes care of
formatting whenever a file is saved.
