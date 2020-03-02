export default (context) => {
  // console.log('middleware context:', context)

  // temp redirect
  const {
    redirect,
    route: { path }
  } = context

  if (path === '/') {
    return redirect('/projects')
  }
}
