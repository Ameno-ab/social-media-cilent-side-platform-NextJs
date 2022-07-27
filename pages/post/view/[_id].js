
import ParallaxBG from "../../../components/cards/parallaxBG";
import axios from "axios";
import PostPublic from "../../../components/cards/PostPublic";
import Head from "next/head";

const SinglePost = ({ post }) => {
  
  const head = () => (
    <Head>
      <title>MERNCAMP - A social network by devs for devs</title>
      <meta
        name="description"
        content={post.content}
      />
      <meta
        property="og:description"
        content="A social network by developer for other web developers"
      />
      <meta property="og:site_name" content="MERNCAMP" />
      <meta property="og:url" content={`http://merncamp.com/post/view/${post._id}`} />
      <meta
        property="og:image:secure_url"
        content={imageSource(post)}
      />
    </Head>
  );

  const imageSource = () => {
    if (post.image) {
      return post.image.url;
    } else {
      return "/images/default.png";
    }
  };
  return (
    <>
      <ParallaxBG url={"/images/pd.jpg"} />
      {/* <pre>{JSON.stringify(posts,null,4)}</pre> */}
      <div className="container">
        <div className="row pt-5">
          <div className="col-md-8 offset-md-2">
            <PostPublic key={post._id} post={post} />
          </div>
        </div>
      </div>
    </>
  );
};

export async function getServerSideProps(ctx) {
  const { data } = await axios.get(`/post/${ctx.params._id}`);
  console.log(data);
  return {
    props: {
      post: data,
    },
  };
}
export default SinglePost;
