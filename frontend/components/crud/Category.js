import { useState, useEffect } from 'react';
import Link from 'next/link';
import Router from 'next/router';
import { isAuth, getCookie } from '../../actions/auth';
import { create } from '../../actions/category';

export default function Category() {
  const [values, setValues] = useState({
    name: '',
    error: false,
    sucess: false,
    categories: [],
    removed: false,
  });
  const { name, error, sucess, categories, removed } = values;
  const token = getCookie('token');

  const clickSubmit = (e) => {
    e.preventDefault();
    create({ name }, token).then((data) => {
      console.log(data);
      if (data.error) {
        setValues({ ...values, error: data.error, sucess: false });
      } else {
        setValues({ ...values, error: false, sucess: true, name: '' });
      }
    });
  };
  const handleChange = (e) => {
    setValues({ ...values, name: e.target.value, error: false, sucess: false, removed: '' });
  };

  const newCategoryForm = () => (
    <form onSubmit={clickSubmit}>
      <div className="form-group">
        <label className="text-muted">Name</label>
        <input type="text" className="form-control" onChange={handleChange} value={name} required />
      </div>
      <div>
        <button type="submit" className="btn btn-primary">
          Create
        </button>
      </div>
    </form>
  );
  return <>{newCategoryForm()}</>;
}
