# Git

Monorepos

Problems:

- Lerna does not work with NPM 5
- Yarn workspaces is buggy: as of 1.3.2 peer dependencies are not installed and
  break installation.
- CRA was not made to work in monorepo. Many things break including linting.
- Libraries from monorepo need to be published. Git installation from subdir is
  not possible.
- Lerna cannot handle peer dependencies when publishing packages.

Unfortunately for the time being separate repos is the answer.
