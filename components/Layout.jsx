import Head from "next/head"
import styles from '../styles/Layout.module.css'
import Image from "next/image"
import Link from "next/link"
import utilStyles from '../styles/utils.module.css'


export default function Layout({ children, title, description, home }) {
    console.log(home);
    return (
        <div className={styles.container}>
            <Head>
                <title>{title}</title>
                <meta
                    name="description"
                    content={description} />
            </Head>
            <header className={styles.header}>
                {home ? (
                    <>
                        <Image
                            priority
                            src="/img/1.jpg"
                            className={utilStyles.borderCircle}
                            height={200}
                            width={200}
                            alt={title}
                        />
                        <h1 className={utilStyles.heading2Xl}>{title}</h1>
                    </>
                ) : (
                    <>
                        <Link href="/">
                            <a>
                                <Image
                                    priority
                                    src="/img/1.jpg"
                                    className={utilStyles.borderCircle}
                                    height={108}
                                    width={108}
                                    alt={name}
                                />
                            </a>
                        </Link>
                        <h2 className={utilStyles.headingLg}>
                            <Link href="/">
                                <a className={utilStyles.colorInherit}>{name}</a>
                            </Link>
                        </h2>
                    </>
                )}
            </header>
            <nav>
                <Link href="/">
                    <a>Inicio | </a>
                </Link>
                <Link href="/blog">
                    <a>Blog | </a>
                </Link>
                <Link href="/contact">
                    <a>Contact | </a>
                </Link>
                <Link href="/about">
                    <a>About</a>
                </Link>
            </nav>
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