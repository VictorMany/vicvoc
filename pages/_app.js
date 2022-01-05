import 'bootswatch/dist/journal/bootstrap.min.css'
import '../styles/globals.css'
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