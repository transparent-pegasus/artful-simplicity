# Artful Simplicity

A read-only plugin for auditing code, tests, and prose for readability, over-engineering, redundancy, and misplaced concerns. It asks whether a cold reader can name each unit's one idea and recommends the safer direction: delete, fold, move, or rewrite.

## Plugin installation

Claude Code:

```sh
claude plugin marketplace add transparent-pegasus/artful-simplicity
claude plugin install artful-simplicity@artful-simplicity
```

Codex:

```sh
codex plugin marketplace add transparent-pegasus/artful-simplicity
codex plugin add artful-simplicity@artful-simplicity
```

Cursor:

```sh
agent plugin marketplace add https://github.com/transparent-pegasus/artful-simplicity.git
```

Then install **Artful Simplicity** from Cursor's plugin marketplace. Start a new agent session after installation.

OpenCode 2 (tested with 2.0.32):

```sh
opencode plugin add artful-simplicity@git+https://github.com/transparent-pegasus/artful-simplicity.git
```

Start a new OpenCode session after installation. The plugin registers the bundled
`artful-simplicity` skill. OpenCode 1.18.29 and later V1 releases are also supported
through the legacy plugin entrypoint.

For a local checkout, run `npm install` in this repository, then add the repository
directory to `plugins` in your project's `opencode.json`:

```json
{
  "plugins": ["/absolute/path/to/artful-simplicity"]
}
```

Use the directory path, as OpenCode 2 does not load individual plugin files from
`plugins` configuration entries.

## `AUDIT.md`

[`AUDIT.md`](AUDIT.md) is the prompt for auditing the Artful Simplicity skill itself.

```text
Follow AUDIT.md to audit skills/artful-simplicity/SKILL.md.
```
