import { API, APP_NAME, DOMAIN, FB_APP_ID } from '../../config';
import { userPublicProfile } from '../../actions/user';
import Head from 'next/head';
import Layout from '../../components/Layout';
import Link from 'next/link';
import moment from 'moment';

export default function UserProfile() {
  return (
    <>
      <Layout>
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <div className="card">
                <div className="card-body">
                  <h5>username</h5>
                  <p>....</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
}

// UserProfile.getInitialProps = ({ query }) => {
//   //This run in the backend
//   return singleBlog(query.slug).then((data) => {
//     if (data.error) {
//       console.log(data.error);
//     } else {
//       return { blog: data, query };
//     }
//   });
// };
