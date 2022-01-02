import Head from 'next/head';
import Layout from '../components/Layout';
import PostCard from '../components/PostCard';
import styles from '../styles/Home.module.css';

export default function Home({ posts }) {
  return (
    <Layout home={true}>
      <div>
        <Head>
          <title>Home</title>

        </Head>
        <main>
          <div className={styles.container}>
            {posts.length === 0 ? (
              <h2>No added posts</h2>
            ) : (
              <div className='row'>
                {posts.map((post, i) => (
                  <PostCard post={post} key={i} />
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
  let dev = process.env.NODE_ENV !== 'production';
  let { DEV_URL, PROD_URL } = process.env;

  // request posts from api
  let response = await fetch(`${dev ? DEV_URL : PROD_URL}/api/posts`);
  // extract the data
  let data = await response.json();

  //console.log(data)
  return {
    props: {
      posts: data['message'],
    },
  };
}