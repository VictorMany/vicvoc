import Link from 'next/link';


const Nav = () => {

    return (
        <nav className='p-2 d-flex justify-content-around fw-lighter' style={{width: '100%'}}>
            <Link href="/">
                <a>HOME</a>
            </Link>

            <Link href="/blog">
                <a>PUBLISHED</a>
            </Link>

            <Link href="/add-post">
                <a>ADD POST</a>
            </Link>

            <Link href="/contact">
                <a>CONTACT</a>
            </Link>

            <Link href="/about">
                <a>ABOUT</a>
            </Link>
        </nav>
    );
}


export default Nav;