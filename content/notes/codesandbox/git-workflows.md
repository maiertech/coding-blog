# Git workflows with Codesandbox

Vercel's concept of
[immutable deployments](https://vercel.com/docs/v2/platform/deployments)
redfines deployments as a commodity that is meant to be used lavishly. Likewise,
Codesandbox redefines an editor, such as a locallly installed
[VS Code](https://code.visualstudio.com/), as a commodity that is meant to be
used lavishly. Condesandbox makes it easy to create, fork and discard sandboxes.
Lavish use of deployments or editors makes it possible to redefine traditionsl
workflows.

## GitHub view

Condesandbox's GitHub view is minimalistic. It features two buttons: `Commit`
and `OpenPR`. At first glance, it looks like Codesandbox is missing branches.
But it handles branches differently:

- You can create an immutable sandbox from any GitHub repository URL (including
  branch URLs) as described
  [here](https://codesandbox.io/docs/importing#import-from-github) or by using
  [githubbox.com](https://github.com/dferber90/githubbox)).
- You can make this immutable sandbox editable by forking it. A fork maintains a
  link to the underlying GitHub repository.
- As mentioned
  [here](https://codesandbox.io/docs/git#committing-and-opening-prs), a forked
  sandbox can be seen as a branch.

The `Commit` button commits all changes to the linked repository. Before hitting
the `Open PR` button you need to commit all changes that should be part of the
pull request. This creates a new branch for the pull request with the branch
from which the sandbox was created as target. Your sandbox then switches context
to a new immutable sandbox created form this new branch.

## Git workflows

### The no-branch workflow

- Create an immutable sandbox from `master`.
- Fork the sandbox to make it editable.
- If you have write permission to the linked repository, every commit goes to
  `master` and you might end up with unwanted commits on `master`.
- If you do not have write permission to the linked repository, you can still
  open a pull request that contains all changes.
- After you have created the pull request, you can discard your sandbox.

### The branch workflow

- Create an immutable sandbox from a branch.
- Fork the sandbox to make it editable.
- Commits go to the branch from which the sandbox has been created.
- If you create a pull request on github.com (not using Codesandbox's `Open PR`
  button), then any subsequent commits also update the pull request.
- If you create a pull request with the `Open PR` button, this will create a new
  branch for the pull request and your sandbox will switch to the new branch.
  This is a potential pitfall since you would expect the pull request to be
  created from the branch from which you created the sandbox.
