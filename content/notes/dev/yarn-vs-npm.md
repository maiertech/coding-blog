# `yarn` vs `npm`

| [`yarn`](https://classic.yarnpkg.com/en/docs/cli) | [`npm`](https://docs.npmjs.com/cli-documentation/) | Comment                                                                                          |
| :------------------------------------------------ | :------------------------------------------------- | :----------------------------------------------------------------------------------------------- |
| `yarn` or `yarn install`                          | `npm install` or `npm i`                           | Install dependencies.                                                                            |
| `yarn install --frozen-lockfile`                  | `npm ci`                                           | Install dependencies in CI.                                                                      |
| `yarn add`                                        | `npm i`                                            | Install package in `dependencies`.                                                               |
| `yarn add --dev` or `yarn add -D`                 | `npm i --save-dev` or `npm i -D`                   | Install package in `devDependencies`.                                                            |
| `yarn remove`                                     | `npm uninstall` or `npm remove`                    | Remove package.                                                                                  |
| `yarn outdated`                                   | `npm outdated`                                     | Check for outdated packages.                                                                     |
| `yarn upgrade-interactive --latest`               | `npx npm-check -u`                                 | Interactive upgrades. For `npm`: package `npm-check` needs to be installed in `devDependencies`. |
