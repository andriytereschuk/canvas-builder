export default (req, res) => {
  // get specific project
  if (req.url !== '/') {
    // get id from str '/1583143260046'
    const id = parseInt(req.url.substring(1))

    return res.end(JSON.stringify({ id }))
  }

  // get all projects
  const temp = [
    { id: 1583143260046, createDate: '2012-04-22T18:25:43.511Z' },
    { id: 1583143260047, createDate: '2012-04-23T18:25:43.511Z' }
  ]

  res.setHeader('Content-Type', 'application/json')
  return res.end(JSON.stringify(temp))
}
