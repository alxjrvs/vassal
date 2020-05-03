export const batchPromise = async <T>({
  list,
  batchSize = 0,
}: {
  list: T[]
  batchSize?: number
}) => {
  const length = list.length
  const container = []
  for (let i = 0; i < length; i += batchSize) {
    const requests = list.slice(i, i + batchSize)
    console.log(requests.length)
    container.push(requests)
  }
  console.log(container.length)
  return await Promise.all(container)
}
