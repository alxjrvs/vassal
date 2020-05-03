import axios from 'axios'
import cheerio from 'cheerio'

export const loadPage = async (url: string) => {
  try {
    const { data } = await axios.get(url)
    return cheerio.load(data)
  } catch (e) {
    new Error(e)
    console.log(e)
  }
}
