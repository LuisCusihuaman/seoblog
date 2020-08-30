import Layout from '../../../components/Layout';
import Admin from '../../../components/auth/Admin';

const CategoryTag = () => (
  <Layout>
    <Admin>
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-12 pt-5 pb-5">
            <h2 className="font-weight-bold">Manage Caegories and Tags</h2>
          </div>
          <div className="col-md-6">
            <p>categories</p>
          </div>
          <div className="col-md-6">
            <p>tags</p>
          </div>
        </div>
      </div>
    </Admin>
  </Layout>
);
export default CategoryTag;
