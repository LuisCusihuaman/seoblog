import { API, APP_NAME, DOMAIN, FB_APP_ID } from '../../config';
import Head from 'next/head';
import Link from 'next/link';
import { useState } from 'react';
import Layout from '../../components/Layout';
import { singleBlog } from '../../actions/blog';
import Card from '../../components/blog/Card';
import moment from 'moment';
import renderHTML from 'react-render-html';

export default function SingleBlog({ blog }) {
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
    <>
      <Layout>
        <main>
          <articule>
            <div className="container-fluid">
              <section>
                <div className="row" style={{ marginTop: '-30px' }}>
                  <img
                    className="img img-fluid featured-image"
                    src={`${API}/blog/photo/${blog.slug}`}
                    alt={blog.title}
                  />
                </div>
              </section>
              <section>
                <div className="container">
                  <h1 className="display-2 pt-3 pb-3 text-center font-weight-bold">{blog.title}</h1>
                  <p className="lead mt-3 mark">
                    Written by {blog.postedBy.name} | Published {moment(blog.updateAt).fromNow()}
                  </p>
                  <div className="pb-3">
                    {showBlogCategories(blog)}
                    {showBlogTags(blog)}
                  </div>
                </div>
              </section>
            </div>
            <div className="container">
              <section>
                <div className="col-md-12 lead">{renderHTML(blog.body)}</div>
              </section>
            </div>
            <div className="container pb-5">
              <h4 className="text-center pt-5 pb-5 h2">Related blogs</h4>
              <hr />
              <p>show related blogs</p>
            </div>
            <div className="container pb-5">
              <p>show comments</p>
            </div>
          </articule>
        </main>
      </Layout>
    </>
  );
}

SingleBlog.getInitialProps = ({ query }) => {
  //This run in the backend
  return singleBlog(query.slug).then((data) => {
    if (data.error) {
      console.log(data.error);
    } else {
      return { blog: data };
    }
  });
};
