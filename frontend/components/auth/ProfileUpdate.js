import { useState, useEffect } from 'react';
import { getCookie } from '../../actions/auth';
import { getProfile, update } from '../../actions/user';

export default function ProfileUpdate() {
  const [values, setValues] = useState({
    username: '',
    name: '',
    email: '',
    about: '',
    password: '',
    error: false,
    success: false,
    loading: false,
    photo: '',
    userData: '',
  });
  const token = getCookie('token');
  const {
    username,
    name,
    email,
    about,
    password,
    error,
    success,
    loading,
    photo,
    userData,
  } = values;
  const init = () => {
    getProfile(token).then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error });
      } else {
        setValues({
          ...values,
          username: data.username,
          name: data.name,
          email: data.email,
          about: data.about || '',
        });
      }
    });
  };
  useEffect(() => {
    init();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    setValues({ ...values, loading: true });
    update(token, userData).then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error, success: false, loading: false });
      } else {
        setValues({
          ...values,
          username: data.username,
          name: data.name,
          email: data.email,
          about: data.about || '',
          sucess: true,
          loading: false,
        });
      }
    });
  };

  const handleChange = (name) => (e) => {
    const value = name === 'photo' ? e.target.files[0] : e.target.value;
    const userFormData = new FormData();
    userFormData.set(name, value);
    setValues({ ...values, [name]: value, userData: userFormData, error: false, success: false });
  };

  const profileUpdateForm = () => (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label className="btn btn-outline-info">
          Profile photo
          <input onChange={handleChange('photo')} type="file" accept="image/*" hidden />
        </label>
      </div>
      <div className="form-group">
        <label className="text-muted">Username</label>
        <input
          className="form-control"
          onChange={handleChange('username')}
          type="text"
          value={username}
        />
      </div>
      <div className="form-group">
        <label className="text-muted">Name</label>
        <input className="form-control" onChange={handleChange('name')} type="text" value={name} />
      </div>
      <div className="form-group">
        <label className="text-muted">Email</label>
        <input
          className="form-control"
          onChange={handleChange('email')}
          type="text"
          value={email}
        />
      </div>
      <div className="form-group">
        <label className="text-muted">About</label>
        <input
          className="form-control"
          onChange={handleChange('about')}
          type="text"
          value={about}
        />
      </div>
      <div className="form-group">
        <label className="text-muted">Password</label>
        <input
          className="form-control"
          onChange={handleChange('password')}
          type="text"
          value={password}
        />
      </div>
      <button type="submit" className="btn btn-primary">
        Submit
      </button>
    </form>
  );

  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-md-4">image</div>
          <div className="col-md-8 mb-5">{profileUpdateForm()}</div>
        </div>
      </div>
    </>
  );
}
