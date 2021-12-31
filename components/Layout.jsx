import Head from "next/head"
import styles from '../styles/Layout.module.css'
import Image from "next/image"
import Link from "next/link"
import utilStyles from '../styles/utils.module.css'
import Nav from "./Nav"
import NProgress from "nprogress";
import { useEffect } from 'react'
import router, { useRouter } from "next/router";

export default function Layout({ children, title, description, home }) {

    useEffect(() => {
        const handleRouteChange = url => {
            NProgress.start();
        }
        router.events.on('routeChangeStart', handleRouteChange)
        router.events.on("routeChangeComplete", () => NProgress.done());
        return () => {
            console.log('hace algo')
            router.events.off('routeChangeStart', handleRouteChange)
        }
    }, [])



    return (
        <div className={`${styles.container}`}>
            <Head>
                <title>{title}</title>
                <meta
                    name="description"
                    content={description} />
            </Head>
            <header className={styles.header}>
                {home ? (
                    <>
                        <div className={`d-flex justify-content-center align-items-center ${utilStyles.borderCircle}`}>
                            <Image
                                priority
                                src="/img/1.png"
                                height={114}
                                width={190}
                                alt={title}
                            />
                        </div>

                        <h1 className={utilStyles.heading2Xl}>{title}</h1>
                    </>
                ) : (
                    <>
                        <Link href="/">
                            <a>
                                <div className={`d-flex justify-content-center align-items-center ${utilStyles.borderCircle}`}>
                                    <Image
                                        priority
                                        src="/img/1.png"
                                        height={114}
                                        width={190}
                                        alt={title}
                                    />
                                </div>
                            </a>
                        </Link>
                        <h2 className={utilStyles.headingLg}>
                            <Link href="/">
                                <a className={utilStyles.colorInherit}>{title}</a>
                            </Link>
                        </h2>
                    </>
                )}
            </header>
            <Nav ></Nav>
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
    )
}


/**
 * Definir las props por default 
 */

Layout.defaultProps = {
    title: "Vicvoc",
    description: 'vicvoc web site'
}