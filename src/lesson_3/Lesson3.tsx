import { Provider } from 'react-redux';
import PostsList from './feature/post/PostsList';
import { store } from './app/stores';
import AddPostForm from './feature/post/AddPostForm';
import './styles.css';

const Lesson3 = () => {
  return (
    <Provider store={store}>
      <main className='App'>
        <AddPostForm />
        <PostsList />
      </main>
    </Provider>
  );
};

export default Lesson3;