# Extensions

VS Code extensions are stored in `~/.vscode/extensions` where each extensions is
stored in a separate subfolder.

## Workspace extensions

Use You can define **project specific** extensions under the `extensions` prop
in `devcontainer.json`. This will install defined extensions into a container
when the container is created. These extensions should be duplicated to
`.vscode/extensions.json` under the `recommendations` prop to allow anyone not
using containers easy installation of the same set of extensions into their
local VS Code.

Settings for these extensions should go into `.vscode/settings.json` as
workspace settings and not into `devcontainer.json`. This ensures that extension
settings are present for both developers using containers and developers
developing locally.

## User extensions

There are extensions that you as a developer would like to have in your local VS
Code and in every container you create to be more productive. But some of these
extensions might be too opinionated to justify adding them to a project as
workspace extensions.

An example could be the
[Git Graph](https://marketplace.visualstudio.com/items?itemName=mhutchie.git-graph)
extension. While you prefer to look at graphical rendering of a Git graph, your
colleagues might prefer a customized rendering on the command-line. Therefore,
this extension should be treated as user extension rather than a workspace
extension.

When you install a user extension, it will be synced together with any extension
settings. The extension plus its settings will be availalbe in every VS Code
instance with settings sync turned on, including containers.

If you have extensions that are specific to Codespaces only, you can define them
in your `settings.json` under the `codespaces.defaultExtensions` key. Any
extension listed there will be installed into every Codespaces container. But
usually,
