import { FaSignInAlt } from 'react-icons/fa';
import { useState, useEffect } from 'react';
// useSelector - select something from the state, such as user, isLoading, etc.
// useDispatch - if we want to dispatch a function like the Thunk register or reset reducer
import { useSelector, useDispatch } from 'react-redux';
//For redirecting
import { useNavigate } from 'react-router-dom';
//For alerts
import { toast } from 'react-toastify';
import { login, reset } from '../features/auth/authSlice';
import Spinner from '../components/Spinner';

function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const { email, password } = formData;

  const navigate = useNavigate();
  const dispatch = useDispatch();

  //Distructuring the variables that we're grabbing from our auth state
  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );

  useEffect(
    () => {
      if (isError) {
        toast.error(message);
      }
      //either there'll be a successful login, or the user is already logged in
      if (isSuccess || user) {
        navigate('/');
      }

      dispatch(reset());
    },
    //Dependency array - we watch for changes on any of these states
    [user, isError, isSuccess, message, navigate, dispatch]
  );

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = (e) => {
    e.preventDefault();

    const userData = {
      email,
      password,
    };

    dispatch(login(userData));
  };

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <>
      <section className="heading">
        <h1>
          <FaSignInAlt /> Login
        </h1>
        <p>Login and start setting goals</p>
      </section>
      <section className="form">
        <form onSubmit={onSubmit}>
          <div className="form-group">
            <input
              type="text"
              className="form-control"
              id="email"
              name="email"
              value={email}
              placeholder="Enter your email"
              onChange={onChange}
            />
          </div>
          <div className="form-group">
            <input
              type="text"
              className="form-control"
              id="password"
              name="password"
              value={password}
              placeholder="Enter password"
              onChange={onChange}
            />
          </div>
          <div className="form-group">
            <button type="submit" className="btn btn-block">
              Submit
            </button>
          </div>
        </form>
      </section>
    </>
  );
}

export default Login;
