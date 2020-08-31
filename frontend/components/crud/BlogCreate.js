import React from 'react';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';
import { getCookie, isAuth } from '../../actions/auth';
import { getCategories } from '../../actions/category';
import { getTags } from '../../actions/tag';
import { createBlog } from '../../actions/blog';
const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });

export default function BlogCreate() {
  const router = useRouter();
  const [body, setBody] = useState({});
  const [values, setValues] = useState({
    error: '',
    sizeError: '',
    success: '',
    formData: '',
    title: '',
    hidePublishButton: false,
  });
  const { error, sizeError, success, formData, title, hidePublishButton } = values;

  const publishBlog = (e) => {
    e.preventDefault();
    console.log('ready to publishblog');
  };
  const handleChange = (name) => (e) => console.log(e.target.value);
  const handleBody = (e) => console.log(e);

  const createBlogForm = () => {
    return (
      <form onSubmit={publishBlog}>
        <div className="form-group">
          <label className="text-muted"></label>
          <input
            type="text"
            className="form-control"
            value={title}
            onChange={handleChange('title')}
          />
        </div>
        <div className="form-group">
          <ReactQuill value={body} placeholder="Write something amazing..." onChange={handleBody} />
        </div>
        <div>
          <button className="btn btn-primary">Publish</button>
        </div>
      </form>
    );
  };
  return <>{createBlogForm()}</>;
}
