import Link from 'next/link';
import NProgress from "nprogress";
import { useEffect } from 'react'
import router, { useRouter } from "next/router";


const Nav = () => {
    useEffect(() => {
        const handleRouteChange = url => {
            NProgress.start();
        }
        router.events.on('routeChangeStart', handleRouteChange)
        router.events.on("routeChangeComplete", () => NProgress.done());
        return () => {
            router.events.off('routeChangeStart', handleRouteChange)
        }
    }, [])

    return (
        <nav className='bg-secondary p-3 mb-4' style={{ borderRadius: '0.5rem' }}>
            <Link href="/">
                <a>Inicio | </a>
            </Link>
            <Link href="/blog">
                <a>Blog | </a>
            </Link>
            <Link href="/add-post">
                <a>Add post | </a>
            </Link>
            <Link href="/contact">
                <a>Contact | </a>
            </Link>

            <Link href="/about">
                <a>About</a>
            </Link>
        </nav>
    );
}


export default Nav;