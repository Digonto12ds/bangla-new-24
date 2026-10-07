import Image from "next/image";
import Link from "next/link";
import React from "react";

interface News {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  imageAlt: string;
  category: string;
}

const MainNews = ({ news } : {news:News[]}) => {
  const [firstNews, ...otherNews] = news;

  //   const otherNews = news.slice(1);
  //   console.log(otherNews);

  return (
    <div className="flex gap-2">
      <Link href={`/news/${firstNews.id}`}>
            <div className="card bg-base-100 w-96 shadow-sm">
        <figure>
          <Image
            width={600}
            height={600}
            src={firstNews.imageUrl}
            alt={firstNews.imageAlt}
          />
        </figure>
        <div className="card-body">
          <p className="text-red-600 font-semibold">{firstNews.category}</p>
          <h2 className="card-title">{firstNews.title}</h2>
          <p>{firstNews.description}</p>
        </div>
      </div></Link>
      <div className="grid gap-2 items-center">
        {otherNews.slice(0, 4).map((news) => (
          <div className="card bg-base-100 shadow-sm" key={news.id}>
            <div className="card-body">
              <p className="text-red-600 font-semibold">{firstNews.category}</p>
              <h2 className="font-bold">{news.title}</h2>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MainNews;
