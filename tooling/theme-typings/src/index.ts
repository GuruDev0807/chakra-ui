import "regenerator-runtime/runtime"
import * as path from "path"
import { program } from "commander"
import { register } from "ts-node"
import { createThemeTypingsInterface } from "./create-theme-typings-interface"
import { isObject } from "@chakra-ui/utils"
import { writeFile } from "fs/promises"
import { themeKeyConfiguration } from "./config"

function readTheme(themeFilePath: string) {
  const absoluteThemePath = path.join(process.cwd(), themeFilePath)
  register({
    project: path.join(__dirname, "..", "bin", "tsconfig.json"),
    dir: path.basename(absoluteThemePath),
  })
  const module = require(absoluteThemePath)
  return module.default ?? module.theme
}

export async function run() {
  program.on("--help", () => {
    console.info(`Example call:
  $ create-chakra-theme-typings theme.ts
`)
  })
  program.parse(process.argv)

  const {
    args: [themeFile],
  } = program

  console.info(`👀 Reading theme file "${themeFile}"...`)
  const theme = readTheme(themeFile)

  if (!isObject(theme)) {
    console.error("❌ Theme not found in default or named `theme` export")
    process.exit(1)
  }

  console.info(`💭 Creating theme interface...`)
  const template = await createThemeTypingsInterface(theme, {
    config: themeKeyConfiguration,
  })

  const outPath = path.resolve(
    "..",
    "..",
    "node_modules",
    "@chakra-ui",
    "styled-system",
    "dist",
    "types",
    "theming.types.d.ts",
  )

  console.info(`✏️  Write file "${outPath}"...`)
  await writeFile(outPath, template, "utf8")
  console.info(`✅ done`)
}
