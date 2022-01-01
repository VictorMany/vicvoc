import Link from 'next/link';


const Nav = () => {

    return (
        <nav className='bg-secondary p-3 mb-4' style={{ borderRadius: '0.5rem' }}>
            <Link href="/">
                <a>Home | </a>
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