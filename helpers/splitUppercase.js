export const splitUppercase = (str) => {
  return str
    .split(/(?=[A-Z])/)
    .join(' ')
    .toUpperCase()
}
