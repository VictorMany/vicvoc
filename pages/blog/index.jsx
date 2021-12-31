import Layout from "../../components/Layout"
import Link from "next/link"

export default function index({ data }) {

    return (
        <Layout>
            <h1>Lista de posts</h1>
            {
                data.map(({ id, body, title }) => {
                    return (

                        <div key={id}>
                            <h3><Link href={`/blog/${id}`}>
                                <a>
                                    {id} - {title}
                                </a>
                            </Link>
                            </h3>
                            <p>{body}</p>
                        </div>
                    )
                })
            }
        </Layout >
    )
}


/**Solo se ejecuta del lado del servidor */
/**Este no jala para consukta de apis en tiempo real  */
export async function getStaticProps() {
    try {
        const res = await fetch('https://jsonplaceholder.typicode.com/posts')
        //Data es nuestro arreglo
        const data = await res.json();
        return {
            props: {
                data
            }
        }
    } catch (error) {
        console.log(error)
    }
}