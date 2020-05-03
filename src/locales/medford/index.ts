import flatten from 'lodash.flatten'

import { ALPHABET } from '../../const'
import { loadPage } from '../../utils/loadPage'
// import { sleep } from '../../utils/sleep'
import { toFile } from '../../utils/toFile'
import { fromFile } from '../../utils/fromFile'
// import { batchPromise } from '../../utils/batchPromise'

const HOST = 'http://gis.vgsi.com/medfordma'
const BASE_URL = `${HOST}/Streets.aspx`

// const sleepTimeout = 1000

const streetPathSlug = 'Streets.aspx?Name='
const addressPidSlug = 'Parcel.aspx?pid='

let streetCount = 1
let addressCount = 1

const getStreetNames = async () => Promise.all(ALPHABET.map(getStreetNameMap))

const getStreetNameMap = async (letter: string) => {
  // sleep(sleepTimeout)
  const page = await loadPage(`${BASE_URL}?Letter=${letter}`)
  const paths = page(`a[href*='${streetPathSlug}']`)
    .toArray()
    .map(e => page(e).text())
  console.log(`Getting streets by letter - Letter ${letter}`)
  return paths
}

const getAddressPids = async (streetNames: string[]) =>
  Promise.all(streetNames.map(getAddressPidsMap))

const getAddressPidsMap = async (streetPath: string) => {
  // sleep(sleepTimeout)
  const page = await loadPage(`${HOST}/Streets.aspx?Name=${encodeURIComponent(streetPath)}`)
  const paths = page(`a[href*='${addressPidSlug}']`)
    .toArray()
    .map(e => Number(e.attribs.href.replace(addressPidSlug, '')))
  console.log(`Getting Street #${streetCount++}`)
  return paths
}

const getAddressData = async (addressPids: number[]) =>
  Promise.all(addressPids.map(getAddressDataMap))
// batchPromise({ list: addressPids.map(getAddressDataMap) })

const getAddressDataMap = async (addressPid: number) => {
  // sleep(sleepTimeout)
  const page = await loadPage(`${HOST}/Parcel.aspx?pid=${addressPid}`)
  console.log(`loaded address pid #${addressPid}, count #${addressCount++}`)
  return page.html
}

const buildStreetNameCache = async () => {
  const streetNames = flatten(await getStreetNames())
  toFile('medford/STREET_NAMES', JSON.stringify(streetNames))
}

const buildAddressPidText = async () => {
  const cachedStreetNames = fromFile('medford/STREET_NAMES')
  const addressPids = flatten(await getAddressPids(cachedStreetNames))
  toFile('medford/PIDS', JSON.stringify(addressPids))
}

const buildCache = async () => {
  await buildStreetNameCache()
  await buildAddressPidText()
}

const parse = async () => {
  const addresPids = await fromFile('medford/PIDS')
  const addressData = flatten(await getAddressData(addresPids))
  console.log('LETS A GO: ' + addressData.length)
  return addressData
}

const parseSingleAddress = async (pid: number) => {
  return await getAddressDataMap(pid)
}
export const Medford = {
  parse,
  parseSingleAddress,
  buildCache,
}
