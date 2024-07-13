import Head from 'next/head';
import { useRouter } from 'next/router';
import { getFakePosts, getFakePostBySlug } from '../../utils/fakeData';
import Header from '../../components/Header';
import data from '../../data/portfolio.json';
import { ISOToDate } from '../../utils';
import Footer from '../../components/Footer';

const Post = ({ post }) => {
  const router = useRouter();

  if (!router.isFallback && !post?.slug) {
    return <p>Post not found</p>;
  }

  return (
    <>
      <Head>
        <title>{post.title}</title>
      </Head>
      <div className={`container mx-auto mb-10 ${data.showCursor && 'cursor-none'}`}>
        <Header isBlog={true}></Header>
        <div className="mt-10 flex flex-col items-center">
          <img
            className="w-80 h-96 rounded-lg shadow-lg object-contain border-4 border-t-blue-600 border-b-yellow-300 border-l rounded-2xl hover:border-yellow-300 duration-300 "
            src={post.image}
            alt={post.title}
          />
          <h1 className="mx-auto mob:p-2 text-bold text-4xl laptop:text-6xl w-full text-center mt-5">{post.title}</h1>
          <p className="mt-10 text-lg">{post.preview}</p>
          <span className="text-sm mt-5 opacity-25">{ISOToDate(post.date)}</span>
          <div className="mt-10">
            <p>{post.content}</p>
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
};

export async function getStaticPaths() {
  const posts = getFakePosts(['slug']);
  const paths = posts.map((post) => ({
    params: { slug: post.slug },
  }));

  return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
  const post = getFakePostBySlug(params.slug, ['title', 'image', 'preview', 'content', 'date', 'slug']);
  if (!post) {
    return {
      notFound: true,
    };
  }
  return {
    props: {
      post,
    },
  };
}

export default Post;
