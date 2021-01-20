export const insertItem = (array, action) => {
  return [
    ...array.slice(0, action.page-1),
    action.headlines,
    ...array.slice(action.page-1)
  ]
}

export default insertItem