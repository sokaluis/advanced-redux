import { Provider } from 'react-redux';
import PostsList from './feature/post/PostsList';
import { store } from './app/stores';
import AddPostForm from './feature/post/AddPostForm';
import './styles.css';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import SinglePostPage from './feature/post/SinglePostPage';
import { fetchUsersThunk, fetchPostsThunk } from './app/thunks';
import EditPostForm from './feature/post/EditPostPage';
import UsersList from './feature/users/UsersList';
import UserPage from './feature/users/UserPage';

store.dispatch(fetchUsersThunk());
store.dispatch(fetchPostsThunk());

const App = () => (
  <Routes>
    <Route path="/" element={<Layout />}>
      <Route index element={<PostsList />} />
      <Route path="post">
        <Route index element={<AddPostForm />} />
        <Route path=":postId" element={<SinglePostPage />} />
        <Route path="edit/:postId" element={<EditPostForm />} />
      </Route>
      <Route path="user">
        <Route index element={<UsersList />} />
        <Route path=":userId" element={<UserPage />} />
      </Route>
      <Route path='*' element={<Navigate to='/' replace />} />
    </Route>
  </Routes>
);

const Lesson7 = () => {
  return (
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path="/*" element={<App />} />
        </Routes>
      </Router>
    </Provider>
  );
};

export default Lesson7;