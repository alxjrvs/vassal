import fs from 'fs'

export const toFile = (name: string, data: string) => {
  const filename = `./json/locales/${name}.json`
  console.log(`Writing ${filename}`)
  return fs.writeFileSync(filename, data)
}
