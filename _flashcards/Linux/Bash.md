# Bash

When logging in via console locally or remotely, `.bash_profile` is executed and
a login shell is started.

If you are logged in via GUI and open a new terminal window, then `.bashrc` is
executed and an interactive shell is started.

For most users the file to maintain is .bashrc and .bash_profile is configured
to run .bashrc.

macOS runs a login by default whenever a terminal window is opened. That's why
you need to work with .bash_profile.
