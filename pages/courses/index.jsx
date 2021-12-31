import Layout from "../../components/Layout"
import dbConnect from "../../lib/dbConnect"
import Course from "../../models/Course"


export default function index({ courses }) {
    console.log(courses)
    return (
        <Layout>
            <h1 style={{color: 'peru'}}>Lista de posts</h1>
            {
                courses.map(({ _id, title, link }) => (
                    <div className="card p-3 m-1" key={_id}>
                        <h3>
                            {title}
                        </h3>
                        <p>{link}</p>
                    </div>
                ))
            }
        </Layout>
    )
}


export async function getServerSideProps() {
    try {
        await dbConnect();
        const res = await Course.find({})

        const courses = res.map(doc => {
            const course = doc.toObject()
            course._id = `${course._id}`
            return course
        })
        console.log(res)

        return { props: { courses } }
    } catch (error) {
        console.log(error)
    }
}