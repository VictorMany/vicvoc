import Layout from "../components/Layout";
import Head from 'next/head';
import Image from 'next/image'
import utilStyles from '../styles/utils.module.css'

export default function contact() {
    return (
        <Layout title={'Contact'}>

            <div className="card p-2 m-1">
                <div className="d-flex align-items-center">
                    <Image src="https://avatars.githubusercontent.com/u/61021780?v=4" width={100} height={100} className={` ${utilStyles.borderCircle}`} />
                    <h4 className='ms-4'>Victor Manuel Velázquez Fuentes</h4>
                </div>
            </div>
            <div className="row ps-3 pe-3 d-flex justify-content-between" style={{ fontSize: 12 }}>
                <div className="p-2 card mb-1 percent98">
                    <div style={{ backgroundColor: '#D2E2EA', padding: 10 }}>
                        <Image src="/img/in.png" width={175} height={43.82} alt="linkedin" ></Image>
                    </div>
                    <div className='p-1'>
                        <div className='row d-flex align-items-center p-2'>
                            <div className="col pl-3">
                                <p>Front-end developer</p>
                                <ul>
                                    <li>JavaSript</li>
                                    <li>HTML</li>
                                    <li>CSS</li>
                                    <li>ReactJS</li>
                                </ul>
                            </div>
                        </div>

                    </div>
                    <div className="mt-auto">
                        <div className='d-flex justify-content-center'>
                            <a href={`https://www.linkedin.com/in/victor-manuel-velazquez-fuentes-bab088156/`} target="_blank" rel="noreferrer"><button className="btn bg-primary btn-sm text-white btn-sm">
                                See my profile</button></a>
                        </div>
                    </div>
                </div>

                <div className="p-2 card mb-1 percent98">
                    <div className='w-100' style={{ backgroundColor: '#D2E2EA', padding: 10 }}>
                        <Image src="/img/git.png" width={131} height={43.82} alt="github" ></Image>
                    </div>
                    <div className='p-1'>

                        <div className='row d-flex align-items-center p-2'>
                            <div className="col PL-3">
                                <p>Software Engineer Student, I like to learn new technologies</p>

                            </div>
                        </div>
                    </div>
                    <div className="mt-auto">
                        <div className='d-flex justify-content-center'>
                            <a href={`https://github.com/VictorMany`} target="_blank" rel="noreferrer"><button className="btn bg-primary btn-sm text-white">
                                See my profile</button></a>
                        </div>
                    </div>
                </div>
            </div>
        </Layout >
    )
}
