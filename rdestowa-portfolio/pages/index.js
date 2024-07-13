import { useRef } from 'react';
import Header from '../components/Header';
import ServiceCard from '../components/ServiceCard';
import Socials from '../components/Socials';
import WorkCard from '../components/WorkCard';
import { useIsomorphicLayoutEffect } from '../utils';
import { stagger } from '../animations';
import Footer from '../components/Footer';
import Head from 'next/head';
import Button from '../components/Button';
import Link from 'next/link';
import Cursor from '../components/Cursor';

// Local Data
import data from '../data/portfolio.json';

export default function Home() {
  // Ref
  const workRef = useRef();
  const aboutRef = useRef();
  const textOne = useRef();
  const textTwo = useRef();
  const textThree = useRef();
  const textFour = useRef();

  // Handling Scroll
  const handleWorkScroll = () => {
    window.scrollTo({
      top: workRef.current.offsetTop,
      left: 0,
      behavior: 'smooth',
    });
  };

  const handleAboutScroll = () => {
    window.scrollTo({
      top: aboutRef.current.offsetTop,
      left: 0,
      behavior: 'smooth',
    });
  };

  useIsomorphicLayoutEffect(() => {
    stagger(
      [textOne.current, textTwo.current, textThree.current, textFour.current],
      { y: 40, x: -10, transform: 'scale(0.95) skew(10deg)' },
      { y: 0, x: 0, transform: 'scale(1)' }
    );
  }, []);

  return (
    <div className={`relative ${data.showCursor && 'cursor-none'}`}>
      {data.showCursor && <Cursor />}
      <Head>
        <title>Big-Rdestowa</title>
      </Head>

      <div className="gradient-circle"></div>
      <div className="gradient-circle-bottom"></div>

      <div className="container mx-auto mb-10">
        <Header handleWorkScroll={handleWorkScroll} handleAboutScroll={handleAboutScroll} />
        <div className="laptop:mt-20 mt-10">
          <div className="mt-5">
            <h1
              ref={textOne}
              className="text-3xl tablet:text-6xl laptop:text-6xl laptopl:text-8xl p-1 tablet:p-2 text-bold w-4/5 mob:w-full laptop:w-4/5"
            ></h1>
            <h1
              ref={textTwo}
              className="text-3xl tablet:text-6xl laptop:text-6xl laptopl:text-8xl p-1 tablet:p-2 text-bold w-full laptop:w-4/5"
            ></h1>
            <h1
              ref={textThree}
              className="text-3xl tablet:text-6xl laptop:text-6xl laptopl:text-8xl p-1 tablet:p-2 text-bold w-full laptop:w-4/5"
            ></h1>
            <h1 className="text-3xl tablet:text-6xl laptop:text-6xl laptopl:text-8xl p-1 tablet:p-2 text-bold w-full laptop:w-4/5"></h1>
          </div>
        </div>

        <Footer />
      </div>
    </div>
  );
}
