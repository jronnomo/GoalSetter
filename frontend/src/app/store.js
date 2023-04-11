import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import goalReducer from '../features/goals/goalSlice';

//setting values here with our Reducers sets the state in Redux. Once added goals: goalReducer, the goals states are visible in Redux toolkit.
export const store = configureStore({
  reducer: {
    auth: authReducer,
    goals: goalReducer,
  },
});
