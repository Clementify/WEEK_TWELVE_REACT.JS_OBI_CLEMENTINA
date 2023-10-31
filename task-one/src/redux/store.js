import { configureStore } from '@reduxjs/toolkit';
import commentSlice from './features/commentSlice';

const store = configureStore({
  reducer: {
    comments: commentSlice,
  },
});

export default store;