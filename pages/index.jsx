import Head from "next/head";
import Layout from "../components/Layout";
import PostCard from "../components/PostCard";
import styles from "../styles/Home.module.css";
import React, { useEffect, useState } from "react";
import Masonry from "react-masonry-css";

function Home({ posts }) {
  const [search, setSearch] = useState("");
  const [badges, setBadges] = useState({});
  const [height, setHeight] = useState({});
  const [buttonList, setButtonList] = useState([
    "react",
    "angular",
    "vue",
    "youtube",
    "frontend",
    "course",
    "aws",
    "javascript",
  ]);

  const onChange = (event) => {
    try {
      setSearch(event.target.value);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (badges.badges != undefined) {
      posts[badges.index].imgs = badges.badges;
    }
    if (height.height == 0 && height.height != undefined) {
      posts[height.index].height = height.height;
    }
  }, [badges, height, posts]);

  return (
    <Layout home={true} setSearch>
      <div>
        <Head>
          <title>Vicvoc</title>
        </Head>

        <main>
          <div className="d-flex align-content-start flex-wrap mb-2 mt-2">
            <div className="d-flex align-content-end flex-wrap mb-2 mt-2">
              <ButtonList buttonList={buttonList} setSearch={setSearch} />
            </div>
            <div className="ms-auto col-12 col-md-3 d-flex align-content-end justify-content-md-end justify-content-center">
              <div
                className="row d-flex align-content-end justify-content-md-end justify-content-center"
                style={{
                  width: "500px",
                  paddingLeft: "1rem",
                  paddingRight: "1rem",
                }}
              >
                <input
                  type="text"
                  className="w-100 search"
                  placeholder="Search - Type something"
                  value={search}
                  onInput={onChange}
                />
              </div>
            </div>
          </div>

          <div className="d-flex justify-content-center">
            <div style={{ maxWidth: "580px" }}>
              {posts.length === 0 ? (
                <h2>No added posts</h2>
              ) : (
                <div>
                  {search == ""
                    ? posts.map((post, i) => (
                        <PostCard
                          post={post}
                          index={i}
                          key={i}
                          setBadges={setBadges}
                          setHeight={setHeight}
                          badges={post.imgs ? post.imgs : undefined}
                        />
                      ))
                    : posts
                        .filter(
                          (post) =>
                            post.title
                              .toLowerCase()
                              .includes(search.toLowerCase()) ||
                            post.content
                              .toLowerCase()
                              .includes(search.toLowerCase()) ||
                            post.link
                              .toLowerCase()
                              .includes(search.toLowerCase()) ||
                            post.createdAt
                              .toLowerCase()
                              .includes(search.toLowerCase()) ||
                            post.published
                              .toString()
                              .toLowerCase()
                              .includes(search.toLowerCase())
                        )
                        .map((post, i) => (
                          <PostCard
                            post={post}
                            index={i}
                            key={i}
                            setBadges={setBadges}
                            setHeight={setHeight}
                            badges={post.imgs ? post.imgs : undefined}
                          />
                        ))}
                </div>
              )}
            </div>
          </div>
        </main>
      </div>
    </Layout>
  );
}

export async function getServerSideProps(ctx) {
  // get the current environment

  let dev = process.env.NODE_ENV !== "production";
  let { DEV_URL, PROD_URL } = process.env;

  // request posts from api
  let response = await fetch(`${dev ? DEV_URL : PROD_URL}/api/posts`);
  // extract the data
  let data = await response.json();

  return {
    props: {
      posts: data["message"],
    },
  };
}

const Button = ({ title, setSearchBy }) => {
  return (
    <button
      style={{ boxShadow: "none" }}
      onClick={() => setSearchBy()}
      type="button"
      className="btn btn-primary position-relative btn-sm bg-primary text-white me-2 m-1"
    >
      {title}
    </button>
  );
};

const ButtonList = ({ buttonList, setSearch }) => {
  return buttonList.map((button, i) => {
    return (
      // eslint-disable-next-line react/jsx-key
      <Button
        title={button}
        key={i}
        setSearchBy={() => {
          setSearch(button);
        }}
      />
    );
  });
};

export default Home;
