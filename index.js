import { readFile } from "node:fs/promises"
import { fileURLToPath } from "node:url"
import { Plugin, Skill } from "@opencode/plugin"
import { parse } from "yaml"

const skills = fileURLToPath(new URL("./skills", import.meta.url))
const path = fileURLToPath(new URL("./skills/artful-simplicity/SKILL.md", import.meta.url))

export default {
  ...Plugin.define({
    id: "artful-simplicity",
    async setup(ctx) {
      const source = await readFile(path, "utf8")
      const match = /^---\r?\n([\s\S]*?)\r?\n---(?:\r?\n|$)([\s\S]*)$/.exec(source)
      if (!match) throw new Error(`Missing skill frontmatter: ${path}`)

      const { name, description } = parse(match[1])
      const skill = Skill.Info.make({
        id: Skill.ID.make(name),
        name: Skill.Name.make(name),
        description,
        path: Skill.Info.fields.path.make(path),
        content: match[2].trim(),
      })

      await ctx.skill.transform((editor) => editor.add(skill))
    },
  }),
  async server() {
    return {
      config: async (config) => {
        config.skills ??= {}
        config.skills.paths = [...new Set([...(config.skills.paths ?? []), skills])]
      },
    }
  },
}
