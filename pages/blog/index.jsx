import Head from "next/head";
import Layout from "../../components/Layout";
import PostCard from "../../components/PostCard";
import styles from "../../styles/Home.module.css";
import React, { useEffect, useState } from "react";

export default function Index({ posts }) {
  const [search, setSearch] = useState("");
  const [date, setDate] = useState(new Date().toLocaleString());
  const [imgs, setImages] = useState("");

  let today;
  function cambiar() {
    try {
      today = new Date().toLocaleString();
      setDate(today);
    } catch (error) {
      console.log(error);
    }
  }

  //setInterval(cambiar, 1000);

  today = new Date().toLocaleString();

  const onChange = (event) => {
    try {
      setSearch(event.target.value);
      setInfo(event.target.value);
    } catch (error) {
      console.log(error);
    }
  };

  const sendImgs = (imgs) => {
    console.log(imgs);
  };

  return (
    <Layout home={false} title={"Published"}>
      <div>
        <Head>
          <title>Published</title>
        </Head>
        <main>
          <div className="d-flex align-content-start flex-wrap mb-4">
            <div className="d-flex align-content-end flex-wrap mb-2">
              <Button
                title="react"
                setSearchBy={() => {
                  setSearch("react");
                }}
              />
              <Button
                title="angular"
                setSearchBy={() => {
                  setSearch("angular");
                }}
              />
              <Button
                title="vue"
                setSearchBy={() => {
                  setSearch("vue");
                }}
              />
              <Button
                title="youtube"
                setSearchBy={() => {
                  setSearch("youtube");
                }}
              />
              <Button
                title="frontend"
                setSearchBy={() => {
                  setSearch("frontend");
                }}
              />
              <Button
                title="course"
                setSearchBy={() => {
                  setSearch("course");
                }}
              />
              <Button
                title="aws"
                setSearchBy={() => {
                  setSearch("aws");
                }}
              />
            </div>
            <div className="ms-auto col-12 col-md-3 d-flex align-content-end justify-content-md-end justify-content-center">
              <div
                className="row d-flex align-content-end justify-content-md-end justify-content-center"
                style={{ width: "500px" }}
              >
                <label
                  type="text"
                  className="w-100 mb-2 fw-bold text-primary text-nowrap"
                >
                  {date.toString()}
                </label>
                <input
                  type="text"
                  className="w-100 search"
                  placeholder="Search"
                  value={search}
                  onInput={onChange}
                />
              </div>
            </div>
          </div>

          <div className={styles.container}>
            {posts.length === 0 ? (
              <h2>No added posts</h2>
            ) : (
              <div className="row">
                {search == ""
                  ? posts.map((post, i) => (
                      <PostCard
                        post={post}
                        key={i}
                        buttons={false}
                        onSendImgs={sendImgs}
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
                            .includes(search.toLowerCase())
                      )
                      .map((post, i) => (
                        <PostCard
                          post={post}
                          key={i}
                          buttons={false}
                          onSendImgs={sendImgs}
                        />
                      ))}
              </div>
            )}
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

  //console.log(data)
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
      className="btn btn-primary position-relative btn-sm bg-primary text-white me-4 m-2"
    >
      {title}
    </button>
  );
};
