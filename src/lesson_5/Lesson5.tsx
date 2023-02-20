import { Provider } from 'react-redux';
import PostsList from './feature/post/PostsList';
import { store } from './app/stores';
import AddPostForm from './feature/post/AddPostForm';
import './styles.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import SinglePostPage from './feature/post/SinglePostPage';
import { fetchUsersThunk, fetchPostsThunk } from './app/thunks';
import EditPostForm from './feature/post/EditPostPage';

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
    </Route>
  </Routes>
);

const Lesson5 = () => {
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

export default Lesson5;