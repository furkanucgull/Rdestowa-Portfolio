import Head from 'next/head';
import Router from 'next/router';
import { useEffect, useRef, useState } from 'react';
import { stagger } from '../../animations';
import Button from '../../components/Button';
import Cursor from '../../components/Cursor';
import Header from '../../components/Header';
import data from '../../data/portfolio.json';
import { getFakePosts } from '../../utils/fakeData';
import { ISOToDate, useIsomorphicLayoutEffect } from '../../utils';
import { MdOutlineSearch } from 'react-icons/md';
import Footer from '../../components/Footer';

const Blog = ({ posts }) => {
  const showBlog = useRef(true);
  const text = useRef();
  const router = Router;
  const [mounted, setMounted] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredPosts, setFilteredPosts] = useState(posts);
  useIsomorphicLayoutEffect(() => {
    stagger(
      [text.current],
      { y: 40, x: -10, transform: 'scale(0.95) skew(10deg)' },
      { y: 0, x: 0, transform: 'scale(1)' }
    );
    if (showBlog.current) stagger([text.current], { y: 30 }, { y: 0 });
    else router.push('/');
  }, []);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleSearch = (e) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);
    const filtered = posts.filter((post) => post.title.toLowerCase().includes(term));
    setFilteredPosts(filtered);
  };

  return (
    showBlog.current && (
      <>
        {data.showCursor && <Cursor />}
        <Head>
          <title>Current-Rdestowians</title>
        </Head>
        <div className={`container mx-auto mb-10 ${data.showCursor && 'cursor-none'}`}>
          <Header isBlog={true}></Header>
          <div className="mt-10 flex flex-col items-center">
            <h1 ref={text} className="mx-auto mob:p-2 text-bold text-4xl laptop:text-6xl w-full text-center">
              Current-Rdestowians
            </h1>
            <div className="search flex flex-row items-center w-full max-w-xl mt-5">
              <input
                type="text"
                placeholder="Search"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-200"
                onChange={handleSearch}
              />
              <MdOutlineSearch className="text-3xl ml-3 text-gray-500" />
            </div>
            <div className="mt-10 grid grid-cols-1 mob:grid-cols-1 tablet:grid-cols-2 laptop:grid-cols-3 justify-between gap-10 w-full">
              {filteredPosts &&
                filteredPosts.map((post) => (
                  <div
                    className="cursor-pointer relative"
                    key={post.slug}
                    onClick={() => Router.push(`/current-rdestowians/${post.slug}`)}
                  >
                    <img
                      className="w-[90%] h-96 ml-5 rounded-full shadow-lg object-cover hover:scale-90 border-8 border-red-300"
                      src={post.image}
                      alt={post.title}
                    />
                    <div className="ml-20">
                      <h2 className="mt-5 text-4xl">{post.title}</h2>
                      <p className="mt-2 opacity-50 text-lg">{post.preview}</p>
                      <span className="text-sm mt-5 opacity-25">{ISOToDate(post.date)}</span>
                    </div>

                    {process.env.NODE_ENV === 'development' && mounted && (
                      <div className="absolute top-0 right-0"></div>
                    )}
                  </div>
                ))}
            </div>
          </div>
          <Footer />
        </div>
      </>
    )
  );
};

export async function getStaticProps() {
  const posts = getFakePosts(['slug', 'title', 'image', 'preview', 'author', 'date']);

  return {
    props: {
      posts: [...posts],
    },
  };
}

export default Blog;
