import Layout from "../components/Layout";

export default function about() {
    return (
        <Layout title={'About'}>
            <div className="p-3">
                <h3>
                    About this page
                </h3>
                <p> This is an CRUD example page.</p>
                <p>

                    I used NextJS (the framework for react) because this framework integrates the front and the back-end in only one project

                    It is easier to use routes with the component Link.

                </p>
                For the back-end I used MongoDB such my database because NextJS provide us a easy way to integrate this database
                <p></p>
            </div>
        </Layout>
    )
}
