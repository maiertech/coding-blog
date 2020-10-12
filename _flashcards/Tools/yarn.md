# Yarn

Yarn global installation is buggy as of v0.23.4. You can add packages globally
with

    yarn global add

But when you run

    yarn global ls

no packages are displayed. As a workaround you can check in
`~/.config/yarn/global/package.json` which packages are installed. This
