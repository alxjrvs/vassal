import fs from 'fs'

export const fromFile = (path: string) => {
  try {
    return fs.readFileSync(`./json/locales/${path}`).toJSON().data
  } catch (err) {
    console.log(err)
    return
  }
}
