import Link from 'next/link';


const Nav = () => {

    return (
        <nav className='p-2 d-flex justify-content-around' style={{width: '100%'}}>
            <Link href="/">
                <a >Home</a>
            </Link>

            <Link href="/blog">
                <a>Published</a>
            </Link>

            <Link href="/add-post">
                <a>Add post</a>
            </Link>

            <Link href="/contact">
                <a>Contact</a>
            </Link>

            <Link href="/about">
                <a>About</a>
            </Link>
        </nav>
    );
}


export default Nav;