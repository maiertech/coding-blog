# Renovate Bot

A good starting point for a `renovate.json` is
[`config:base`](https://docs.renovatebot.com/presets-config/#configbase):

```
{
  "extends": ["config:base"]
}
```

It uses [default presets](https://docs.renovatebot.com/presets-default/),
[group presets](https://docs.renovatebot.com/presets-group/) and
[helper presets](https://docs.renovatebot.com/presets-helpers/), which compose
[configuration options](https://docs.renovatebot.com/configuration-options/). To
schedule pull requests use a
[schedule preset](https://docs.renovatebot.com/presets-schedule/), for example,
`schedule:weekly` or `schedule:monthly`.

The following table lists options that are not part of `config:base` and should
be set:

| Option                                                                                   | Description                                                                                                                                                                                                                                                                                                                                                                                                                                           | Example                              |
| :--------------------------------------------------------------------------------------- | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :----------------------------------- |
| [`labels`](https://docs.renovatebot.com/configuration-options/#labels)                   | Array of label to add to each pull request.                                                                                                                                                                                                                                                                                                                                                                                                           | `["dependencies"]`                   |
| [`reviewers`](https://docs.renovatebot.com/configuration-options/#reviewers)             | Array of people or teams to add as reviewers to each pull request. Even though it is possible to put team names into this array, it makes more sense to maintain a team of reviewers directly in this array as code. Maintaining a team of reviewers as code vs in a GitHub configuration.                                                                                                                                                            | `["<username>", "team:<team-name>"]` |
| [`rebaseWhen`](https://docs.renovatebot.com/configuration-options/#rebasewhen)           | This value is set to `auto` by default which can trigger a rebase for every open pull request whenever `master` moves forward. If a repository is connected to [Vercel](https://vercel.com/) or [Netlify](https://www.netlify.com/) this can trigger a cascade of rebuilds that incurr charges. In such cases it is better to explicitly set this to `never` and trigger a rebase only by adding label `rebase` to the branch that should be rebased. | `auto` or `never`                    |
| [`semanticCommits`](https://docs.renovatebot.com/configuration-options/#semanticcommits) | Renovate Bot tries to detect if semantic commits are used automatically and then applies semantic commits to its commits accordingly. I do not use semantic commits in any project, yet Renovate Bot thinks I'm using semantic commits. Turn off semantic commits for good with this option.                                                                                                                                                          | `false`                              |
