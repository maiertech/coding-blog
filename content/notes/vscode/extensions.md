# Extensions

VS Code extensions are stored in `~/.vscode/extensions` where each extension is
stored in a separate subfolder.

## Workspace extensions

Use You can define **project specific** extensions under the `extensions` prop
in `devcontainer.json`. This will install extensions into a container at the
time of container creation. This is the best way to handle workspace extensions
when your team develops with containers only.

If your team also develops locally, you should duplicate workspace extensions to
`.vscode/extensions.json` under the `recommendations` prop to allow easy local
installation of recommended extensions. But the moment you install recommended
extensions locally, they will be synchronzed with settings sync. If this is not
what you want, you can excluse extensions from syncing via
`settingsSync.ignoredExtensions` in your settings.

Settings for workspace extensions should go into `.vscode/settings.json` and not
into `devcontainer.json`. This ensures that extension settings are present for
both local and container development.

## User extensions

There might be extensions that you as individual developer would like to use
whenever you develop with VS Code, no matter if you develop locally or with a
container. Such extensions might be too opinionated to justify adding them to a
project as workspace extensions. Therefore, they are referred to as user
extensions.

When you install a user extension, it will be synced together with any extension
settings, unless you explcitly exclude it from sync. Such extensions and their
settings will be availalbe in every local VS Code instance with settings sync
turned on, but not in containers.

### Remote containers

For remote containers that you run locally with Docker, you can use
`remote.containers.defaultExtensions` in your settings to define user extensions
that should be installed into every container. This does not work for
Codespaces.

### Codespaces

The equivalent setting for Codespaces is `codespaces.defaultExtensions`. This
means that you need to duplicate `remote.containers.defaultExtensions`.

During Codespaces beta, I observed inconsistent behavior of how user extensions
are handled inside a container. At one point user extensions were installed into
the container but needed to be activated with a reload. At a later point, synced
user extensions were not installed, but extensions listed in
`codespaces.defaultExtensions` were installed, but not visible until after you
reloaded your container.
