import Link from 'next/link';
import React from 'react';

interface Navs {
     slug: string,
      title: string,
      topicId: string | null,
      url: string,
      scrapable: boolean
}

const NavLinks = async() => {

    const res = await fetch("https://news-api-v2.vercel.app/api/categories");
    const data = await res.json();
    const navs : Navs[] = data.data;
    const filtered = navs.filter(n => n.scrapable)

    return (
        <div className='flex gap-5 justify-center mt-5'>
            <Link href={'/'}>হোম</Link>
            {
                filtered.map((nav, i) => <Link key={i} href={`/category/${nav.slug}`}>{nav.title}</Link>)
            }
            
        </div>
    );
};

export default NavLinks;