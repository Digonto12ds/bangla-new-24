import Image from "next/image";
import { notFound } from "next/navigation";
import React from "react";
type NewsBodyItem =
  | {
      type: "text";
      text: string;
    }
  | {
      type: "subheading";
      text: string;
    }
  | {
      type: "image";
      url: string;
      width: number;
      height: number;
      caption?: string;
      altText?: string;
      copyrightHolder?: string;
    };

const NewsDetails = async ({ params }: { params: { newsId: string } }) => {
  const { newsId } = await params;
  const res = await fetch(
    `https://news-api-v2.vercel.app/api/article/${newsId}`,
  );
  const data = await res.json();
  const news = data.data;
  if (!news){
    notFound();
  }
  return (
    <main className="min-h-screen bg-gray-50 py-10">
      {" "}
      <article className="mx-auto max-w-4xl px-4">
        {" "}
        {/* Main Card */}{" "}
        <div className="overflow-hidden rounded-2xl bg-white shadow-lg">
          {" "}
          {/* Hero Image */}{" "}
          <div className="w-full">
            {" "}
            <Image width={600} height={600}
              src={news.imageUrl}
              alt={news.title}
              className="h-100 w-full object-cover"
            />{" "}
          </div>{" "}
          {/* Content */}{" "}
          <div className="p-6 md:p-10">
            {" "}
            {/* Topics */}{" "}
            <div className="mb-4 flex flex-wrap gap-2">
              {" "}
              {news.topics?.map((topic: { id: string; name: string }) => (
                <span
                  key={topic.id}
                  className="rounded-full bg-blue-100 px-3 py-1 text-sm font-medium text-blue-700"
                >
                  {" "}
                  {topic.name}{" "}
                </span>
              ))}{" "}
            </div>{" "}
            {/* Title */}{" "}
            <h1 className="mb-5 text-3xl font-bold leading-tight text-gray-900 md:text-5xl">
              {" "}
              {news.title}{" "}
            </h1>{" "}
            {/* Description */}{" "}
            <p className="mb-6 text-lg leading-8 text-gray-600">
              {" "}
              {news.description?.blocks?.[0]?.model?.blocks?.[0]?.model?.text ||
                ""}{" "}
            </p>{" "}
            {/* Author + Date */}{" "}
            <div className="mb-8 flex flex-wrap items-center gap-4 border-b pb-6 text-sm text-gray-500">
              {" "}
              <span>
                {" "}
                By{" "}
                <strong className="text-gray-800">
                  {" "}
                  {news.byline?.[0]?.name}{" "}
                </strong>{" "}
              </span>{" "}
              <span>•</span>{" "}
              <span>
                {" "}
                {new Date(news.firstPublished).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}{" "}
              </span>{" "}
            </div>{" "}
            {/* News Body */}{" "}
            <div className="space-y-6">
              {" "}
              {news.body?.map((item: NewsBodyItem, index: number) => {
                if (item.type === "subheading") {
                  return (
                    <h2
                      key={index}
                      className="mt-10 text-2xl font-bold text-gray-900 md:text-3xl"
                    >
                      {" "}
                      {item.text}{" "}
                    </h2>
                  );
                }
                if (item.type === "text") {
                  return (
                    <p
                      key={index}
                      className="text-base leading-8 text-gray-700 md:text-lg"
                    >
                      {" "}
                      {item.text}{" "}
                    </p>
                  );
                }
                if (item.type === "image") {
                  return (
                    <figure key={index} className="my-8">
                      {" "}
                      <Image width={600} height={600}
                        src={item.url}
                        alt={item.altText || item.caption || ""}
                        className="w-full rounded-xl object-cover"
                      />{" "}
                      {item.caption && (
                        <figcaption className="mt-2 text-sm text-gray-500">
                          {" "}
                          {item.caption}{" "}
                        </figcaption>
                      )}{" "}
                    </figure>
                  );
                }
                return null;
              })}{" "}
            </div>{" "}
            {/* Tags */}{" "}
            <div className="mt-10 border-t pt-6">
              {" "}
              <h3 className="mb-3 text-lg font-semibold text-gray-900">
                {" "}
                Tags{" "}
              </h3>{" "}
              <div className="flex flex-wrap gap-2">
                {" "}
                {news.tags?.map((tag: string) => (
                  <span
                    key={tag}
                    className="rounded-md bg-gray-100 px-3 py-1 text-sm text-gray-600"
                  >
                    {" "}
                    #{tag}{" "}
                  </span>
                ))}{" "}
              </div>{" "}
            </div>{" "}
            {/* Source */}{" "}
            <div className="mt-8 border-t pt-6">
              {" "}
              <a
                href={news.sourceUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-blue-600 hover:underline"
              >
                {" "}
                Read original article on {news.source}{" "}
              </a>{" "}
            </div>{" "}
          </div>{" "}
        </div>{" "}
      </article>{" "}
    </main>
  );
};

export default NewsDetails;
