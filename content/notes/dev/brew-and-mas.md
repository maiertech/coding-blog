# `brew` and `mas`

`brew` and `mas` can be used to automate bootstrapping your Mac and keep
installed packages and apps up to date.

## `brew`

[`brew`](https://brew.sh/) is a package manager for Mac.

| Command                      | Description                                                                                                                                                                           |
| :--------------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `brew install <formula>`     | Install formula.                                                                                                                                                                      |
| `brew cask install <cask>`   | Install cask.                                                                                                                                                                         |
| `brew list [--versions]`     | List installed formulas.                                                                                                                                                              |
| `brew update`                | Update list of formulas.                                                                                                                                                              |
| `brew outdated`              | List formulas for which an update is available.                                                                                                                                       |
| `brew cask outdated`         | Many apps installed with `brew cask` auto-update themselves. The underlying formula is just a shell to install it. Hence, `brew cask outdated` almost never shows anything to update. |
| `brew upgrade [formula]`     | Upgrade all or a specific forumula.                                                                                                                                                   |
| `brew uninstall <formula>`   | Uninstall formula.                                                                                                                                                                    |
| `brew cask uninstall <cask>` | Uninstall cask.                                                                                                                                                                       |
| `brew doctor`                | Check if `brew` is configured properly.                                                                                                                                               |
| `brew analytics off`         | Turn off analytics.                                                                                                                                                                   |

## `mas`

[`mas`](https://github.com/mas-cli/mas) is a CLI tool to install apps from the
App Store.

| Command                           | Description                                                                                                  |
| :-------------------------------- | :----------------------------------------------------------------------------------------------------------- |
| `mas search`                      | Search for app to find out identifier.                                                                       |
| `mas install <identifier>`        | Install app from App Store.                                                                                  |
| `mas outdated`                    | List apps that can be upgraded. [Currently broken in v1.6.3](https://github.com/mas-cli/mas/issues/252).     |
| `mas upgrade [identifier]`        | Upgrade all apps or a specific app. [Currently broken in v1.6.3](https://github.com/mas-cli/mas/issues/252). |
| `sudo mas uninstall <identifier>` | Uninstall app.                                                                                               |
