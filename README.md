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

## `AUDIT.md`

[`AUDIT.md`](AUDIT.md) is the prompt for auditing the Artful Simplicity skill itself.

```text
Follow AUDIT.md to audit skills/artful-simplicity/SKILL.md.
```
