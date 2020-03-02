export default (req, res, next) => {
  const temp = [
    { id: 1583143260046, createDate: '2012-04-22T18:25:43.511Z' },
    { id: 1583143260047, createDate: '2012-04-23T18:25:43.511Z' }
  ]

  res.setHeader('Content-Type', 'application/json')
  res.end(JSON.stringify(temp))
  next()
}
