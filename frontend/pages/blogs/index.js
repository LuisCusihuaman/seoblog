import Layout from '../../components/Layout';
import { listBlogsWithCategoriesAndTags } from '../../actions/blog';
import Card from '../../components/blog/Card';
import Link from 'next/link';
import { APP_NAME, DOMAIN, FB_API_ID } from '../../config';
import { useRouter } from 'next/router';
import Head from 'next/head';

export default function Blogs({ blogs, categories, tags, size }) {
  const router = useRouter();
  const head = () => (
    <Head>
      <title>Programming blogs | {APP_NAME}</title>
      <meta
        name="description"
        content="Programming blogs and tutorials on react node next vue php laravel and web development"
      />
      <link rel="canonical" href={`${DOMAIN}${router.pathname}`} />
      <meta property="og:title" content={`Lastest development tutorials | ${APP_NAME}`} />
      <meta
        property="og:description"
        content="Programming blogs and tutorials on react node next vue php laravel and web development"
      />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={`${DOMAIN}${router.pathname}`} />
      <meta property="og:image" content={`${DOMAIN}/static/images/seoblog.jpg`} />
      <meta property="og:image:secure_url" content={`${DOMAIN}/static/images/seoblog.jpg`} />
      <meta property="og:image:type" content="image/jpg" />
      <meta property="fb:app_id" content={`${FB_API_ID || ''}`} />
    </Head>
  );

  const showAllBlogs = () => {
    return blogs.map((blog, i) => (
      <article key={i}>
        <Card blog={blog} />
        <hr />
      </article>
    ));
  };

  const showAllCategories = () =>
    categories.map((c, i) => (
      <Link key={i} href={`/categories/${c.slug}`}>
        <a href="" className="btn btn-primary mr-1 ml-1 mt-3">
          {c.name}
        </a>
      </Link>
    ));
  const showAllTags = () =>
    tags.map((t, i) => (
      <Link key={i} href={`/tags/${t.slug}`}>
        <a href="" className="btn btn-outline-primary mr-1 ml-1 mt-3">
          {t.name}
        </a>
      </Link>
    ));

  return (
    <>
      {head()}
      <Layout>
        <main>
          <div className="container-fluid">
            <header>
              <div className="col-md-12 pt-3">
                <h1 className="display-4 font-weight-bold text-center">
                  Programming blogs and tutorials
                </h1>
              </div>
              <section>
                <div className="pb-5 text-center">
                  {showAllCategories()}
                  <br />
                  {showAllTags()}
                </div>
              </section>
            </header>
          </div>
          <div className="container-fluid">
            <div className="row">
              <div className="col-md-12">{showAllBlogs()}</div>
            </div>
          </div>
        </main>
      </Layout>
    </>
  );
}

Blogs.getInitialProps = () => {
  return listBlogsWithCategoriesAndTags().then((data) => {
    if (data.error) {
      console.log(data.error);
    } else {
      return {
        blogs: data.blogs,
        categories: data.categories,
        tags: data.tags,
        size: data.size,
      };
    }
  });
};
