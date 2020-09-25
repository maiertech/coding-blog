# VS Code containers

[This article](https://css-tricks.com/a-gentle-introduction-to-using-a-docker-container-as-a-dev-environment/)
is a very good introduction to developing with containers.

## How to run containers

### Locally

You can run containers locally with
[Docker](https://formulae.brew.sh/cask/docker) and either clone your repo inside
a container or open a locally cloned repo inside a container. However, running
containers locally comes with a huge performance penalty.

To run containers locally, follow these steps:

1. Install Docker with `brew cask install docker`.
1. Install the
   [Docker](https://marketplace.visualstudio.com/items?itemName=ms-azuretools.vscode-docker)
   extension to help you manage locally created images.
1. Install the
   [Remote - Containers](https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.remote-containers)
   extension, with which you can open a locally cloned repo inside a container
   or clone a repo into a local container.

### Connect to Codespaces container from local VS Code

In this scenario you connect to a Codespaces container from your local VS Code
using the
[Visual Studio Codespaces](https://marketplace.visualstudio.com/items?itemName=ms-vsonline.vsonline)
extension. This feels like a local VS Code experience. Since all the heavy
lifting is done in the cloud, even an underpowerd Macbook Air makes for a very
good developing machine.

### Access Codespaces container via browser

In this scneario you not only run your container in the cloud, but you also
access it at https://github.com/codespaces via your browser. In this case VS
Code runs inside your browser and replaces your local VS Code. This is suitable
even for Chromebooks.

## vscode-dev-containers

The [vscode-dev-containers](https://github.com/microsoft/vscode-dev-containers)
repository is a starting point to explore ready to use configs. All predefined
dev containers are located inside the `containers` folder. Developers much
smarter than me created many different ready to use dev containers. Each dev
container comes with a `README` and a `.devcontainer` folder containing the
following files:

- `base.Dockerfile` defines the underlying container that is registered in
  Microsoft's Docker registry and references inside `Dockerfile`.
- `Dockerfile` is the actual Dokcer file used to spin up your container.
- `devcontainer.json` is a configuration file with which you can customize VS
  Code running inside the container.
  [See the `devcontainer.json` docs](https://code.visualstudio.com/docs/remote/devcontainerjson-reference).
- All other files are helper files that are needed to build the Docker images
  for the public registry.

To add a container definition to your repo, you only need to copy `Dockerfile`
and `devcontainer.json` into folder `.devcontainer`. If you need to customize
the image from the registry you can modify `Dockerfile`, e.g., by installing
additional Linux packages. If you do not need to customize the Docker image, you
could just reference the Docker image in `devcontainer.json` directly.

## Env variables

[This article](https://code.visualstudio.com/docs/remote/containers-advanced#_adding-environment-variables)
outlines how to define env variables inside a container:

- You can use prop `remoteEnv` in `devcontainer.json` to set env variables that
  are availalbe inside VS Code and its terminal. For this to work you need to
  set `terminal.integrated.inheritEnv` to `true`. However, this did not result
  in consistent results for me. More often than not defined env variables were
  not present in launched containers. See
  [this discussion](https://github.community/t/variable-defined-in-remoteenv-via-devcontainer-json-are-not-present/133847)
- You can use `containerEnv` in `devcontainer.json` to set env variables that
  apply to the entire container, not just VS Code. This seems to work reliably
  and is the recommended way of setting env variables.

## GitHub Codespaces

This is GitHub's implementation of cloud hosted dev containers. Once a container
is created, it is persisted and any changes you make to the container, e.g.
changinge VS Code settings, are persisted, too.
