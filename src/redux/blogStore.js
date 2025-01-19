import { configureStore } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    posts: [],
  };
  

const blogSlice = createSlice({
    name: 'blog',
    initialState,
    reducers: {
      addPost: (state, action) => {
        state.posts.push(action.payload);
      },
      deletePost: (state, action) => {
        state.posts = state.posts.filter(post => post.id !== action.payload);
      }
    }
  });


const store = configureStore({
  reducer: {
    blog: blogSlice.reducer,
  },
});
// export default store;





export const { addPost, deletePost } = blogSlice.actions;
export default store
