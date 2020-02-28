export default async (req, res, next) => {
  const response = await Promise.resolve('test')

  return response
}
