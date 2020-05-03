import fs from 'fs'

export const fromFile = (path: string) => {
  try {
    return JSON.parse(fs.readFileSync(`./json/locales/${path}.json`).toString('utf8'))
  } catch (err) {
    console.log(err)
    return
  }
}
