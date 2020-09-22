# Settings

User settings are stored in
`~/Library/Application Support/Code/User/settings.json` on macOS and
`~/.config/Code/User/settings.json` on Linux.

## Scopes

There are two settings scopes: **user settings** (stored in `settings.json`) and
**workspace settings** (stored in `.vscode/settings.json`). Workspace settings
override user settings.

Settings consolidation works like this:

1. Start with default settings `defaultSettings.json`.
1. Apply any user settings defined in changed user `settings.json`.
1. Apply any workspace settings from `.vscode/settings.json`.

For
[GitHub Codespaces](https://docs.github.com/en/github/developing-online-with-codespaces),
there is an additional scope: remote settings (defined in `devcontainer.json`
under the `settings` key). Remote settings override user settings, but can be
overridden by workspace settings.

The settings UI in VS Code is very confusing. For each scope it shows all
default values. Anything which has been explicitly defined or modified in this
scope's corresponding JSON file is marked with a blue line. For user settings
this UI makes sense, because they are the first level at which defaults can be
overridden. For the other scopes, this UI makes no sense.

In order to know which setting actually applies, you need to know how scopes
override each other and look at all JSON files.

## Settings Sync

VS Code settings sync synchronizes the following:

- settings
- keyboard shortcuts (for each platform)
- user snippets
- extensions
- UI state

Turn settings sync on and see them as your personal defaults that can be
overridden by remote and workspace settings. This eliminates the need to manage
your default settings in your dotfiles repo because you will have them in every
new instance of VS Code, including cloudspaces.

Also note that settings sync includes extensions, but should include only
[user extensions that are too opinionated to be added as workspace extensions](http://localhost:8000/notes/vscode/extensions).
