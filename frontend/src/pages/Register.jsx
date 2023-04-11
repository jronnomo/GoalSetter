import { useState, useEffect } from 'react';
// useSelector - select something from the state, such as user, isLoading, etc.
// useDispatch - if we want to dispatch a function like the Thunk register or reset reducer
import { useSelector, useDispatch } from 'react-redux';
//For redirecting
import { useNavigate } from 'react-router-dom';
//For alerts
import { toast } from 'react-toastify';
import { FaUser } from 'react-icons/fa';
import { register, reset } from '../features/auth/authSlice';
import Spinner from '../components/Spinner';

function Register() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    password2: '',
  });

  const { name, email, password, password2 } = formData;

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
    //Check for password match
    if (password !== password2) {
      toast.error('Passwords do not match');
    } else {
      //set our variables coming from the form
      const userData = {
        name,
        email,
        password,
      };
      //run our register function from authSlice Thunk function and pass in our form data
      dispatch(register(userData));
    }
  };

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <>
      <section className="heading">
        <h1>
          <FaUser /> Register
        </h1>
        <p>Please create an account</p>
      </section>
      <section className="form">
        <form onSubmit={onSubmit}>
          <div className="form-group">
            <input
              type="text"
              className="form-control"
              id="name"
              name="name"
              value={name}
              placeholder="Enter your name"
              onChange={onChange}
            />
          </div>
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
            <input
              type="text"
              className="form-control"
              id="password2"
              name="password2"
              value={password2}
              placeholder="Confirm your password"
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

export default Register;
