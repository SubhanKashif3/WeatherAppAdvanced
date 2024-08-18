import { configureStore } from '@reduxjs/toolkit';

// Define a simple reducer function that returns the state as-is
const placeholderReducer = (state = {}, action) => state;

const store = configureStore({
  reducer: {
    placeholder: placeholderReducer,
    // You can add other reducers here in the future
  },
});

export default store;
