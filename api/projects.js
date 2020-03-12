export default (req, res) => {
  // get specific project
  if (req.url !== '/') {
    // get id from str '/1583143260046'
    const id = parseInt(req.url.substring(1))

    return res.end(JSON.stringify({ id }))
  }

  // get all projects
  const temp = [
    {
      id: 1583143260046,
      name: 'Project 1',
      created: '2012-04-22T18:25:43.511Z',
      modified: '2013-04-22T18:25:43.511Z',
      desktop: [],
      tablet: [],
      mobile: [],
      currentStep: 'desktop'
    },
    {
      id: 1583143260047,
      name: 'Project 2',
      created: '2015-04-23T18:25:43.511Z',
      modified: '2016-04-22T18:25:43.511Z',
      desktop: [],
      tablet: [],
      mobile: [],
      currentStep: 'desktop'
    },
    {
      id: 1583143260048,
      name: 'Project 3',
      created: '2015-04-23T18:25:43.511Z',
      modified: '2016-04-22T18:25:43.511Z',
      desktop: [],
      tablet: [],
      mobile: [],
      currentStep: 'desktop'
    },
    {
      id: 1583143260049,
      name: 'Project 4',
      created: '2015-04-23T18:25:43.511Z',
      modified: '2016-04-22T18:25:43.511Z',
      desktop: [],
      tablet: [],
      mobile: [],
      currentStep: 'desktop'
    },
    {
      id: 1583143260050,
      name: 'Project 5',
      created: '2015-04-23T18:25:43.511Z',
      modified: '2016-04-22T18:25:43.511Z',
      desktop: [],
      tablet: [],
      mobile: [],
      currentStep: 'desktop'
    }
  ]

  res.setHeader('Content-Type', 'application/json')
  return res.end(JSON.stringify(temp))
}
