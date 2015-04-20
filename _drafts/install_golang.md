# Install Go

## Mac

The best way to install go on Mac is with [Homebrew](http://brew.sh/):

    brew install go

If you do not have [Git](http://git-scm.com/) and [Mercurial](http://mercurial.selenic.com/) installed, add them via Hombrew.

Add the following lines to your `.bash_profile`:

    export GOPATH=/Users/thilo/gocode
    export PATH=$GOPATH/bin:$PATH

## Windows

The best way to install Go on Windows is with [Chocolatey](https://chocolatey.org/):

    cinst golang

This sets system variable `GOROOT=C:\tools\go` ands add `C:\tools\go\bin` to the system `PATH`. Create a workspace directory `%USERPROFILE%\gocode` and add a user environment variable `GOPATH` pointing to this directory.

You need to make sure to add

    %USERPROFILE%\AppData\Local\GitHub\PortableGit_c2ba306e536fdf878271f7fe636a147ff37326ad\bin

to your user `PATH`. The hash in the path may differ on your machine. Install [Mercurial](http://mercurial.selenic.com/) via Chocolatey:

    cinst hg

Finally, add `%USERPROFILE%/gocode/bin` to your user `PATH`.

## Atom Support

For Go support in Atom, you need to install package [`go-plus`](https://atom.io/packages/go-plus). On Windows, installation from within Atom fails with an ` Unable to find remote helper for 'https'` error. You need to install `go-plus` from the Windows command-line:

    apm install go-plus

Restart your terminal and re-launch `atom` from the command-line. If you have all your environment variables set properly, `go-plus` will install everything it needs automatically. Set **Format Tool** to `goreturns`. This includes the functionality of `goimports` and `gofmt`.
