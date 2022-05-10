import Layout from "../components/Layout";

export default function about() {
    return (
        <Layout title={'About'}>
            <div className="p-3" style={{color: 'black'}}>
                <h3>
                    About this page
                </h3>

                <p className="fw-lighter" style={{color: 'black'}}>This is a sample CRUD page.</p>
                <p className="fw-lighter" style={{color: 'black'}}>
                    I used NextJS (the react framework) because this framework integrates the front and the back end in a single project. It is easier to use routes with the Link component.
                </p>
                <p className="fw-lighter" style={{color: 'black'}}> For the backend I used MongoDB as my database because NextJS provides us a simple way to use it</p>

            </div>
        </Layout>
    )
}
