Install via Homebrew

    brew install rbenv

`ruby-build` as dependency. Always check the caveats section in the formula:

https://github.com/Homebrew/homebrew/blob/master/Library/Formula/rbenv.rb

And then add

    if which rbenv > /dev/null; then eval "$(rbenv init -)"; fi

to your profile which is normally .bash_profile

    rbenv install -l

Then create a `.ruby-version` and execut

    rbenv install

which will pick up the Ruby version from the file.

Then execute

rbenv rehash

No Gemsets as for RVM, just use bundler to manage gems and bundle exec to execute stuff.

Each Ruby version installs its own gems, but across projects bundler manages gems

Clean, simple and non-intrusive.

Here is the problem with Atom: This brings us back to the atom dependnecies project from which you should start Atom to get everything right.
