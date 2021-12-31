import 'bootswatch/dist/morph/bootstrap.min.css'

function MyApp({
  Component,
  pageProps
}) {
  return <Component {
    ...pageProps
  }
  />
}

export default MyApp