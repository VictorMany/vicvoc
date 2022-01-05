import Head from "next/head"
import styles from '../styles/Layout.module.css'
import Image from "next/image"
import Link from "next/link"
import utilStyles from '../styles/utils.module.css'
import Nav from "./Nav"
import NProgress from "nprogress";
import React, { useEffect, useState } from 'react'
import router from "next/router";

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
                        <Link href='https://www.linkedin.com/in/victor-manuel-velazquez-fuentes-bab088156/'>
                            <a target="_blank" rel="noreferrer">
                                <img src="https://img.icons8.com/ios-filled/48/1866D0/linkedin.png" height={40} width={40} className="me-3" />
                            </a>
                        </Link>
                        <Link href='https://github.com/VictorMany'>
                            <a target="_blank" rel="noreferrer">
                                <img src="https://img.icons8.com/ios-filled/50/1866D0/github.png" height={40} width={40} className="me-3" />
                            </a>
                        </Link>
                        <Link href='https://portfolio-vic-projects.vercel.app'>
                            <a target="_blank" rel="noreferrer">
                                <img src="https://img.icons8.com/ios-filled/50/1866D0/copy-link.png" height={40} width={40} />
                            </a>
                        </Link>
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

                                <div className="p-2 text-primary col-12 col-md-6 mb-3">
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

                                <div className="p-2 text-primary col-12 col-md-6 mb-3">
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