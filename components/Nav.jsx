import Link from "next/link";

const Nav = () => {
  return (
    <nav
      className="p-2 d-flex justify-content-around"
      style={{ width: "100%" }}
    >
      <Link href="/">
        <a>
          <img
            alt="home"
            src="/img/home.svg"
            height={27}
            width={27}
            className="pb-1 css-badges-list"
          />
        </a>
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
};

export default Nav;
