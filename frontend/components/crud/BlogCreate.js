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
  const [checked, setChecked] = useState([]);
  const [checkedTag, setCheckedTag] = useState([]);
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
  const token = getCookie('token');

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
    createBlog(formData, token).then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error });
      } else {
        setValues({
          ...values,
          title: '',
          error: '',
          success: `A new blog titled "${data.title}" is created`,
        });
        setBody('');
        setCategories([]);
        setTags([]);
      }
    });
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
  const handleToggle = (c) => () => {
    setValues({ ...values, error: '' });
    const clickedCategory = checked.indexOf(c);
    const all = [...checked];
    if (clickedCategory === -1) {
      all.push(c);
    } else {
      all.splice(clickedCategory, 1);
    }
    console.log(all);
    setChecked(all);
    formData.set('categories', all);
  };
  const handleTagToggle = (t) => () => {
    setValues({ ...values, error: '' });
    const clickedCategory = checked.indexOf(t);
    const all = [...checkedTag];
    if (clickedCategory === -1) {
      all.push(t);
    } else {
      all.splice(clickedCategory, 1);
    }
    console.log(all);
    setChecked(all);
    formData.set('tags', all);
  };
  const showCategories = () => {
    return (
      categories &&
      categories.map((c, i) => (
        <li key={i} className="list-unstyled">
          <input onChange={handleToggle(c._id)} type="checkbox" className="mr-2" />
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
          <input onChange={handleTagToggle(t._id)} type="checkbox" className="mr-2" />
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
            <div className="form-group pb-2">
              <h5>Feature image</h5>
              <hr />
              <small className="text-muted">Max size: 1mb</small>
              <label className="btn btn-outline-info">
                Upload feature image
                <input onChange={handleChange('photo')} type="file" accept="image/*" hidden />
              </label>
            </div>
            <div></div>
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
