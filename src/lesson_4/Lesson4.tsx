import { Provider } from 'react-redux';
import PostsList from './feature/post/PostsList';
import { store } from './app/stores';
import AddPostForm from './feature/post/AddPostForm';
import './styles.css';
import { fetchUsers } from './feature/users/usersThunks';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import SinglePostPage from './feature/post/SinglePostPage';

store.dispatch(fetchUsers());

const App = () => (
  <Routes>
    <Route path="/" element={<Layout />}>
      <Route index element={<PostsList />} />
      <Route path="post">
        <Route index element={<AddPostForm />} />
        <Route path=":postId" element={<SinglePostPage />} />
        {/* <Route path="edit/:postId" element={<EditPostForm />} /> */}
      </Route>
    </Route>
  </Routes>
);

const Lesson4 = () => {
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

export default Lesson4;