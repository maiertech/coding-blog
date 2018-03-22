Install via Homebrew by following the instructions here:

https://github.com/OiNutter/nodenv#homebrew-on-mac-os-x

Always check the caveats section in the formula:

https://github.com/jawshooah/homebrew-nodenv/blob/master/nodenv.rb

And then add

    if which nodenv > /dev/null; then eval "$(nodenv init -)"; fi

to your profile which is normally .bash_profile

List all available versions

    nodenv install -l

Then create a `.node-version` and execute

    rbenv install

which will pick up the Ruby version from the file.

Then execute

nodenv rehash

Clean, simple and non-intrusive.

Here is the problem with Atom: This brings us back to the atom dependencies project from which you should start Atom to get everything right.
