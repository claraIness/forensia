import { copyFileSync, cpSync, existsSync, mkdirSync, readdirSync } from 'node:fs'
import { extname, join } from 'node:path'

const root = process.cwd()
const dist = join(root, 'dist')

const htmlFiles = readdirSync(root).filter((file) => extname(file) === '.html' && file !== 'index.html')
const staticFiles = ['style.css', 'script.js', 'favicon.svg']
const staticFolders = ['images']

if (!existsSync(dist)) {
  mkdirSync(dist)
}

for (const file of [...htmlFiles, ...staticFiles]) {
  const source = join(root, file)

  if (existsSync(source)) {
    copyFileSync(source, join(dist, file))
  }
}

for (const folder of staticFolders) {
  const source = join(root, folder)

  if (existsSync(source)) {
    cpSync(source, join(dist, folder), { recursive: true })
  }
}
