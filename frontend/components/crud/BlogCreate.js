import React from 'react';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';
import { getCookie, isAuth } from '../../actions/auth';
import { createBlog } from '../../actions/blog';
import { getCategories } from '../../actions/category';
import { getTags } from '../../actions/tag';
const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });

BlogCreate.modules = {
  toolbar: [
    [{ header: '1' }, { header: '2' }, { header: [3, 4, 5, 6] }, { font: [] }],
    [{ size: [] }],
    ['bold', 'italic', 'underline', 'strike', 'blockquote'],
    [{ list: 'ordered' }, { list: 'bullet' }],
    ['link', 'image', 'video'],
    ['clean'],
    ['code-block'],
  ],
};

BlogCreate.formats = [
  'header',
  'font',
  'size',
  'bold',
  'italic',
  'underline',
  'strike',
  'blockquote',
  'list',
  'bullet',
  'link',
  'image',
  'video',
  'code-block',
];

export default function BlogCreate() {
  const windowIsAvaible = typeof window !== 'undefined';
  const blogFromLocalStorage = () => {
    if (!windowIsAvaible) {
      return false;
    }
    const blog = localStorage.getItem('blog');
    return blog ? JSON.parse(blog) : false;
  };
  const router = useRouter();
  const [categories, setCategories] = useState([]);
  const [tags, setTags] = useState([]);
  const [body, setBody] = useState(blogFromLocalStorage());
  const [values, setValues] = useState({
    error: '',
    sizeError: '',
    success: '',
    formData: '',
    title: '',
    hidePublishButton: false,
  });
  const { error, sizeError, success, formData, title, hidePublishButton } = values;

  const initCategories = () => {
    getCategories().then((data) =>
      data.error ? setValues({ ...values, error: data.error }) : setCategories(data),
    );
  };
  const initTags = () => {
    getTags().then((data) =>
      data.error ? setValues({ ...values, error: data.error }) : setTags(data),
    );
  };
  useEffect(() => {
    setValues({ ...values, formData: new FormData() });
    initCategories();
    initTags();
  }, [router]);

  const publishBlog = (e) => {
    e.preventDefault();
    console.log('ready to publishblog');
  };
  const handleChange = (name) => (e) => {
    const value = name === 'photo' ? e.target.files[0] : e.target.value;
    formData.set(name, value);
    setValues({ ...values, [name]: value, formData, error: '' });
  };
  const handleBody = (e) => {
    setBody(e);
    formData.set('body', e);
    if (windowIsAvaible) {
      localStorage.setItem('blog', JSON.stringify(e));
    }
  };

  const showCategories = () => {
    return (
      categories &&
      categories.map((c, i) => (
        <li key={i} className="list-unstyled">
          <input type="checkbox" className="mr-2" />
          <label className="form-check-label">{c.name}</label>
        </li>
      ))
    );
  };

  const showTags = () => {
    return (
      tags &&
      tags.map((t, i) => (
        <li key={i} className="list-unstyled">
          <input type="checkbox" className="mr-2" />
          <label className="form-check-label">{t.name}</label>
        </li>
      ))
    );
  };

  const createBlogForm = () => {
    return (
      <form onSubmit={publishBlog}>
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
            modules={BlogCreate.modules}
            formats={BlogCreate.formats}
            value={body}
            placeholder="Write something amazing..."
            onChange={handleBody}
          />
        </div>
        <div>
          <button className="btn btn-primary">Publish</button>
        </div>
      </form>
    );
  };
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-8">{createBlogForm()}</div>
        <div className="col-md-4">
          <div>
            <h5>Categories</h5>
            <hr />
            <ul style={{ maxHeight: '200px', overflowY: 'scroll' }}> {showCategories()}</ul>
          </div>
          <div>
            <h5>Tags</h5>
            <ul style={{ maxHeight: '200px', overflowY: 'scroll' }}> {showTags()}</ul>
            <hr />
          </div>
        </div>
      </div>
    </div>
  );
}
