export const generateDataTable = ({ size, availables }) => {
  const object = []
  const frees = size - availables
  for (let index = 0; index < size; index++) {
    const day = index + 1
    const isFree = day > frees
    object.push({ id: index, day, free: isFree })
  }
  return object
}
