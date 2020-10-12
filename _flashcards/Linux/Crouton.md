# Crouton

To install a new chroot, select

- a release (base system)
- one or more targets
- a name.

Check for available releases:

    sh ~/Downloads/crouton -r list

`xenial` is Ubuntu 16.04 LTS and should be used by default.

Check for available targets:

    sh ~/Downloads/crouton -t help

Use crouton only to run development tools that do not run natively in Chrome,
but run them in Chrome’s UI and not in a separate window manager.

`xiwi` is the only target required:

    sudo sh ~/Downloads/crouton -r xenial -t xiwi -n dev -e

Run `sudo enter-chroot` to switch to the chroot on the command-line.

## Install Atom

From crosh shell:

- Download vscode to `Downloads`.
- Then update the chroot: `sudo sh ~/Downloads/crouton -u -n dev`

From within chroot:

- `sudo apt install ~/Downloads/vscode.deb`
- `sudo apt install libxss1`

Test Code by running `xiwi -T code` inside the chroot.

We need openssh for ssh agent. Install via apt install openssh-server

## Install Linuxbrew

Brew needs a system curl

Sudo apt install curl

First install sudo apt install build-essential because Linuxbrew instructions
may be overwritten later on and then you cannot complete installation.

- Install [Linuxbrew](http://linuxbrew.sh) as described on its website and
  follow the next step instructions, but save additions in `.bash_profile` not
  .profile.

Because we use vscode’s terminal as main terminal

- Then log out and log in.
- Run `sudo dpkg-reconfigure locales` and choose `en_US.UTF-8` and make it
  default.
- `brew doctor`

Change write permission of .cache folder

## Development environment

Run `brew install <package>` for:

- gcc (recommended by Linuxbrew)
- git
- nvm

Install nvm via brew and install a default node.

Add to .bashrc after Linuxbrew:

export NVM_DIR=“$HOME/.nvm”
source $(brew —prefix nvm)/nvm.sh

Then you should have default node in any terminal.

Nvm install stable Nvm install —lts

nvm sets default therefore install yarn without node!

Brew install yarn --without-node

Install nvm via brew and follow on screen instructions

- Nano to edit commit messages

Create alias for

Configure git as described in docs repo

If anything asks you to add something to .bash-profile add it to .profile. If
there is bash-profile profile gets ignored.

    git config ––global alias.tree 'log ––graph ––decorate ––oneline ––all'

VSCode Settings:

editor.formatOnSave: true filesAutoSave: onFocusChange
telemetry.enableTelemetry: false

Do not install watchman on Linux!!!

If jest watchmode fails, remove node_modules and run yarn and try again.

Avoid problems with jest. Apply fix from

GitHub.com/Facebook/jest/issues/3254
