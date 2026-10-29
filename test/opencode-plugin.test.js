import assert from "node:assert/strict"
import { readFile, mkdtemp, rm } from "node:fs/promises"
import { tmpdir } from "node:os"
import { join } from "node:path"
import { fileURLToPath } from "node:url"
import test from "node:test"
import plugin from "artful-simplicity"

const path = fileURLToPath(new URL("../skills/artful-simplicity/SKILL.md", import.meta.url))

test("registers the bundled skill outside the plugin's working directory", async () => {
  const directory = await mkdtemp(join(tmpdir(), "artful-simplicity-"))
  const previous = process.cwd()
  let transform

  try {
    process.chdir(directory)
    await plugin.setup({
      skill: {
        async transform(callback) {
          transform = callback
        },
      },
    })
  } finally {
    process.chdir(previous)
    await rm(directory, { recursive: true, force: true })
  }

  const skills = new Map()
  const existing = { id: "existing", content: "An unrelated skill" }
  skills.set(existing.id, existing)
  const editor = { add: (skill) => skills.set(skill.id, skill) }
  transform(editor)
  transform(editor)

  const skill = skills.get("artful-simplicity")
  const source = await readFile(path, "utf8")
  assert.equal(plugin.id, "artful-simplicity")
  assert.equal(skills.size, 2)
  assert.equal(skills.get(existing.id), existing)
  assert.equal(skill.name, "artful-simplicity")
  assert.equal(skill.path, path)
  assert.equal(await readFile(skill.path, "utf8"), source)
  assert.equal(skill.description, source.match(/^description: (.+)$/m)[1])
  assert.equal(skill.content, source.slice(source.indexOf("# Artful simplicity")).trim())
})

test("preserves V1 skill paths when the config hook is applied repeatedly", async () => {
  const { config: configure } = await plugin.server()
  const config = { skills: { paths: ["/existing/skills"], urls: ["https://example.com/skills"] } }

  await configure(config)
  await configure(config)

  assert.deepEqual(config.skills, {
    paths: ["/existing/skills", fileURLToPath(new URL("../skills", import.meta.url))],
    urls: ["https://example.com/skills"],
  })

  const empty = {}
  await configure(empty)
  assert.deepEqual(empty.skills.paths, [fileURLToPath(new URL("../skills", import.meta.url))])
})
