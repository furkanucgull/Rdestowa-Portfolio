// pages/current-rdestowians/index.js

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

const Blog = ({ posts }) => {
  const showBlog = useRef(true);
  const text = useRef();
  const router = Router;
  const [mounted, setMounted] = useState(false);

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

  return (
    showBlog.current && (
      <>
        {data.showCursor && <Cursor />}
        <Head>
          <title>Current-Rdestowians</title>
        </Head>
        <div className={`container mx-auto mb-10 ${data.showCursor && 'cursor-none'}`}>
          <Header isBlog={true}></Header>
          <div className="mt-10">
            <h1 ref={text} className="mx-auto mob:p-2 text-bold text-4xl laptop:text-6xl w-full">
              Current-Rdestowians
            </h1>
            <div className="mt-10 grid grid-cols-1 mob:grid-cols-1 tablet:grid-cols-2 laptop:grid-cols-3 justify-between gap-10">
              {posts &&
                posts.map((post) => (
                  <div
                    className="cursor-pointer relative"
                    key={post.slug}
                    onClick={() => Router.push(`/current-rdestowians/${post.slug}`)}
                  >
                    <img className="w-full h-60 rounded-lg shadow-lg object-cover" src={post.image} alt={post.title} />
                    <h2 className="mt-5 text-4xl">{post.title}</h2>
                    <p className="mt-2 opacity-50 text-lg">{post.preview}</p>
                    <span className="text-sm mt-5 opacity-25">{ISOToDate(post.date)}</span>
                    {process.env.NODE_ENV === 'development' && mounted && (
                      <div className="absolute top-0 right-0"></div>
                    )}
                  </div>
                ))}
            </div>
          </div>
        </div>
      </>
    )
  );
};

export async function getStaticProps() {
  const posts = getFakePosts(['slug', 'title', 'image', 'preview', 'author', 'date']); // Fake verileri çağırıyoruz

  return {
    props: {
      posts: [...posts],
    },
  };
}

export default Blog;
