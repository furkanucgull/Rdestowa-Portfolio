import React from 'react';
import Socials from '../Socials';
import Link from 'next/link';
import Button from '../Button';

const Footer = ({}) => {
  return (
    <>
      <div className="mt-5 laptop:mt-40 p-2 laptop:p-0">
        <div>
          <h1 className="text-2xl text-bold"></h1>
          <div className="mt-10">
            <h1 className="text-3xl tablet:text-6xl laptop:text-6xl laptopl:text-8xl text-bold"></h1>
            <h1 className="text-3xl tablet:text-6xl laptop:text-6xl laptopl:text-8xl text-bold"></h1>

            <div className="mt-10"></div>
          </div>
        </div>
      </div>

      <div className="flex flex-row gap-4 items-center justify-between border-y-2">
        <h1 className="text-sm text-bold mt-2 laptop:mt-10 p-2 laptop:p-0 mb-4">
          Made With ❤ by{' '}
          <Link href="https://www.linkedin.com/in/furkanucgull/">
            <a className="underline underline-offset-1">Furkan Üçgül</a>
          </Link>
        </h1>
        <Socials />
      </div>
    </>
  );
};

export default Footer;
