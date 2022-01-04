import Head from "next/head"
import styles from '../styles/Layout.module.css'
import Image from "next/image"
import Link from "next/link"
import utilStyles from '../styles/utils.module.css'
import Nav from "./Nav"
import NProgress from "nprogress";
import React, { useEffect, useState } from 'react'
import router, { useRouter } from "next/router";
import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css';

export default function Layout({ children, title, description, home }) {

    useEffect(() => {
        const handleRouteChange = url => {
            NProgress.start();
        }
        console.log('que')
        router.events.on('routeChangeStart', handleRouteChange)
        router.events.on("routeChangeComplete", () => NProgress.done());

        return () => {
            console.log('hace algo')
            router.events.off('routeChangeStart', handleRouteChange)
        }
    }, [])
    let today;
    function cambiar() {
        try {
            today = new Date().toLocaleString();
            setDate(today);
        } catch (error) {
            console.log(error)
        }
    }
    today = new Date().toLocaleString();
    const [search, setSearch] = useState('');
    const [date, setDate] = useState(today);

    const onChange = (event) => {
        try {
            setSearch(event.target.value);
        } catch (error) {
            console.log(error)
        }
    };

    setInterval(cambiar, 1000);

    return (
        <div>

            <Head>
                <title>{title}</title>
                <meta
                    name="description"
                    content={description} />
            </Head>
            <header className={styles.header}>
                <div className="bg-blue-400 w-100 p-2 row bg-navbar d-flex justify-content-between">
                    <div className="col d-flex justify-content-center justify-content-md-start col-12 col-md-6">
                        <img src="https://img.icons8.com/ios-filled/48/000000/linkedin.png" height={40} width={40} className="me-3" />
                        <img src="https://img.icons8.com/ios-filled/50/000000/github.png" height={40} width={40} />
                    </div>
                    <div className="col-12 col-md-6 d-flex justify-content-end">
                        <Nav></Nav>
                    </div>
                </div>
                <div className="bg-abajo">
                    {
                        home ? (
                            <div className="row d-flex justify-content-md-start justify-content-center align-items-center">
                                <div className={` ${utilStyles.borderCircle} d-flex justify-content-center align-items-center col-12 col-md-3 m-3`}>
                                    <Image
                                        priority
                                        src="/img/1.png"
                                        height={114}
                                        width={190}
                                        alt={title}
                                    />
                                </div>

                                <div className="p-2 text-primary col-12 col-md-6">
                                    <h1 className={`${utilStyles.heading2Xl}`}>{title}</h1>
                                    <p className="ps-1">Productivity page</p>
                                    <p className="ps-1 fw-lighter">Sample CRUD notes in cards. Each card contains the following structure</p>
                                    <ul className="fw-lighter">
                                        <li>Title</li>
                                        <li>Content or description</li>
                                        <li>Link (Optional)</li>
                                        <li>Created date (Auto)</li>
                                    </ul>
                                </div>
                                <div className='ms-auto mt-auto col-12 col-md-3 d-flex align-content-end justify-content-end'>
                                    <div className="row d-flex align-content-end">
                                        <label type="text" className="fw-lighter w-100 mb-2 mt-2">{date.toString()}</label>
                                        <input type="text" className="w-100 ms-2" placeholder="Search" value={search} onInput={onChange} />
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <div className="row d-flex justify-content-md-start justify-content-center align-items-center">
                                <div className={` ${utilStyles.borderCircle} d-flex justify-content-center align-items-center col-12 col-md-3 m-3`}>
                                    <Image
                                        priority
                                        src="/img/1.png"
                                        height={114}
                                        width={190}
                                        alt={title}
                                    />
                                </div>

                                <div className="p-2 text-primary col-12 col-md-6">
                                    <h2 className={`${utilStyles.heading2Xl}`}>{title}</h2>
                                    <p className="ps-1">Productivity page</p>
                                    <p className="ps-1 fw-lighter">Sample CRUD notes in cards</p>
                                   
                                </div>
                                
                            </div>
                        )
                    }
                </div>

            </header >

            <div className={`${styles.container}`}>

                <main>
                    {children}
                </main>
                {!home && (
                    <div className={styles.backToHome}>
                        <Link href="/">
                            <a>← Back to home</a>
                        </Link>
                    </div>
                )}
            </div>


        </div >
    )
}


/**
 * Definir las props por default 
 */

Layout.defaultProps = {
    title: "Vicvoc",
    description: 'vicvoc web site'
}