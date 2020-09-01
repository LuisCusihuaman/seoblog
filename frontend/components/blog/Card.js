import React from 'react';
import Link from 'next/link';
import moment from 'moment';
import renderHTML from 'react-render-html';

export default function Card({ blog }) {
  const showBlogCategories = (blog) =>
    blog.categories.map((c, i) => (
      <Link key={i} href={`/categories/${c.slug}`}>
        <a className="btn btn-primary mr-1 ml-1 mt-3">{c.name}</a>
      </Link>
    ));
  const showBlogTags = (blog) =>
    blog.tags.map((t, i) => (
      <Link key={i} href={`/tags/${t.slug}`}>
        <a className="btn btn-outline-primary mr-1 ml-1 mt-3">{t.name}</a>
      </Link>
    ));

  return (
    <div className="lead pb-4">
      <header>
        <Link href={`/blogs/${blog.slug}`}>
          <a>
            <h2 className="display-4 pt-3 pb-3 font-weight-blog">{blog.title}</h2>
          </a>
        </Link>
      </header>
      <section>
        <p className="mark ml-1 pt-2 pb-3">
          Written by {blog.postedBy.name} | Published {moment(blog.updatedAt).fromNow()}
        </p>
      </section>
      <section>
        {showBlogCategories(blog)}
        {showBlogTags(blog)}
        <div className="row">
          <div className="col-md-4">image</div>
          <div className="col-md-8">
            <section>
              <div className="pb-3">{renderHTML(blog.excerpt)}</div>
              <Link href={`/blogs/${blog.slug}`}>
                <a className="btn btn-primary pt-2">Read more</a>
              </Link>
            </section>
          </div>
        </div>
      </section>
    </div>
  );
}
