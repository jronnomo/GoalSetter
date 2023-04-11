import { useEffect } from 'react';
//to redirect user
import { useNavigate } from 'react-router-dom';
//grab user object from the state
import { useSelector, useDispatch } from 'react-redux';
import GoalForm from '../components/GoalForm';
import GoalItem from '../components/GoalItem';
import Spinner from '../components/Spinner';
import { getGoals, reset } from '../features/goals/goalSlice';

const Dashboard = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  //user is set to null except when a user is logged in
  const { user } = useSelector((state) => state.auth);
  const { goals, isLoading, isError, message } = useSelector(
    (state) => state.goals
  );

  useEffect(() => {
    //console.log error message is an error
    if (isError) {
      console.log(message);
    }
    //if user is null (no one logged in) must stay on login page
    if (!user) {
      navigate('/login');
    }
    //fetch goals from backend and add assign it to our goals variable
    dispatch(getGoals());

    return () => {
      dispatch(reset);
    };
  }, [user, navigate, isError, message, dispatch]);

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <>
      <section className="heading">
        <h1>Welcome {user && user.name}</h1>
        <p>Goals Dashboard</p>
      </section>
      <GoalForm />

      <section className="content">
        {goals.length > 0 ? (
          <div className="goals">
            {goals.map((goal) => {
              return <GoalItem key={goal._id} goal={goal} />;
            })}
          </div>
        ) : (
          <h3>You have not set any goals</h3>
        )}
      </section>
    </>
  );
};

export default Dashboard;
