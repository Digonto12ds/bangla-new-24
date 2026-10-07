import Image from "next/image";
import Link from "next/link";
import React from "react";

interface NewCard {
  id: string;
  title: string;
  description: string;
  category: string;
  imageUrl: string;
  imageAlt: string;
}

const NewsCard = ({ news }: { news: NewCard }) => {
  // console.log("from newsCard",news)
  return (
    <Link href={`/news/${news.id}`}>
      <div>
        <div className="card bg-base-100 shadow-sm">
          <figure>
            <Image
              width={600}
              height={600}
              src={news.imageUrl}
              alt={news.imageAlt}
            />
          </figure>
          <div className="card-body">
            <p className="text-red-600 font-semibold">{news.category}</p>
            <h2 className="card-title">{news.title}</h2>
            <p>{news.description}</p>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default NewsCard;
