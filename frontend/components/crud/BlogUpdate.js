import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';
import { getCookie, isAuth } from '../../actions/auth';
import { singleBlog, updateBlog } from '../../actions/blog';
import { getCategories } from '../../actions/category';
import { getTags } from '../../actions/tag';
import { Quillmodules, Quillformats } from '../../helpers/quill';
const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });

export default function BlogUpdate() {
  const router = useRouter();
  const [body, setBody] = useState('');
  const [values, setValues] = useState({
    title: '',
    error: '',
    success: '',
    formData: '',
    title: '',
    body: '',
  });

  const { error, success, formData, title } = values;

  const initBlog = () => {
    if (router.query.slug) {
      singleBlog(router.query.slug).then((data) => {
        if (data.error) {
          console.log(data.error);
        } else {
          setValues({ ...values, title: data.title });
          setBody(data.body);
        }
      });
    }
  };
  useEffect(() => {
    setValues({ ...values, formData: new FormData() });
    initBlog();
  }, [router]);

  const handleBody = (e) => {
    setBody(e);
    formData.set('body', e);
  };
  const handleChange = (name) => (e) => {
    const value = name === 'photo' ? e.target.files[0] : e.target.value;
    formData.set(name, value);
    setValues({ ...values, [name]: value, formData, error: '' });
  };
  const editBlog = () => {
    console.log('update blog');
  };

  const updateBlogForm = () => {
    return (
      <form onSubmit={editBlog}>
        <div className="form-group">
          <label className="text-muted">Title</label>
          <input
            type="text"
            className="form-control"
            value={title}
            onChange={handleChange('title')}
          />
        </div>
        <div className="form-group">
          <ReactQuill
            modules={Quillmodules}
            formats={Quillformats}
            value={body}
            placeholder="Write something amazing..."
            onChange={handleBody}
          />
        </div>
        <div>
          <button className="btn btn-primary">Update</button>
        </div>
      </form>
    );
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-8">
          {updateBlogForm()}
          <div className="pt-3">show sucess and error message</div>
        </div>
        <div className="col-md-4">
          <div>
            <div className="form-group pb-2">
              <h5>Feature image</h5>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
