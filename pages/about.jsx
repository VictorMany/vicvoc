import Layout from "../components/Layout";

export default function about() {
    return (
        <Layout title={'About'}>
            <div className="p-3" style={{color: 'black'}}>
                <h3>
                    About this page
                </h3>

                <p className="fw-lighter" style={{color: 'black'}}>
                    There are many courses available for you to learn anything you want. 
                    Find the perfect course for you, start learning and improve your skills. Courses can help you find a better job and improve your career.
                </p>
                <p className="fw-lighter" style={{color: 'black'}}>
                    Job seekers can find courses to improve their chances of getting a job. 
                    People who want to change careers can find courses to learn new skills.
                </p>
                <p className="fw-lighter" style={{color: 'black'}}>
                    Many courses are available online, so you can learn at your own pace.</p>
            </div>
        </Layout>
    )
}
