import Head from 'next/head';
import Router, { useRouter } from 'next/router';
import { useEffect, useRef, useState } from 'react';
import { stagger } from '../../animations';
import Button from '../../components/Button';
import Cursor from '../../components/Cursor';
import Header from '../../components/Header';
import data from '../../data/portfolio.json';
import { ISOToDate, useIsomorphicLayoutEffect } from '../../utils';
import { getAllPosts } from '../../utils/api';
import { MdOutlineSearch } from 'react-icons/md';
import Footer from '../../components/Footer';

const Blog = ({ posts }) => {
  const showBlog = useRef(data.showBlog);
  const text = useRef();
  const router = useRouter();
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
    const searchTerm = e.target.value.toLowerCase();
    setSearchTerm(searchTerm);

    const filtered = posts.filter((post) => post.title.toLowerCase().includes(searchTerm));
    setFilteredPosts(filtered);
  };

  return (
    showBlog.current && (
      <>
        {data.showCursor && <Cursor />}
        <Head>
          <title>Ex-Rdestowians</title>
        </Head>
        <div className={`container mx-auto mb-10 ${data.showCursor && 'cursor-none'}`}>
          <Header isBlog={true}></Header>

          <div className="mt-10 text-center">
            <h1 ref={text} className="mx-auto mob:p-2 text-bold text-4xl laptop:text-6xl w-full">
              Ex-Rdestowians
            </h1>
            <div className="search flex items-center mt-5">
              <input
                type="text"
                placeholder="Search...."
                className="px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-200 flex-grow placeholder:pl-2"
                onChange={handleSearch}
              />
              <button className="flex items-center justify-center bg-blue-500 text-white rounded-full h-10 w-10 ml-2">
                <MdOutlineSearch className="text-2xl" />
              </button>
            </div>
            <div className="mt-10 grid grid-cols-1 mob:grid-cols-1 tablet:grid-cols-2 laptop:grid-cols-3 justify-between gap-10">
              {filteredPosts.map((post) => (
                <div
                  className="cursor-pointer relative"
                  key={post.slug}
                  onClick={() => Router.push(`/ex-rdestowians/${post.slug}`)}
                >
                  <img className="profilepics  hover:scale-90 " src={post.image} alt={post.title} />
                  <div className="descriptions mr-20">
                    <h2 className="mt-5 text-4xl ">{post.title}</h2>
                    <p className="mt-2 opacity-50 text-lg ">{post.preview}</p>
                    <span className="text-sm mt-5 opacity-25 ">{ISOToDate(post.date)}</span>
                  </div>

                  {process.env.NODE_ENV === 'development' && mounted && <div className="absolute top-0 right-0"></div>}
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
  const posts = getAllPosts(['slug', 'title', 'image', 'preview', 'author', 'date']);

  return {
    props: {
      posts: [...posts],
    },
  };
}

export default Blog;
