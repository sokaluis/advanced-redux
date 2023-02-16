import { Provider } from 'react-redux';
import PostsList from './feature/post/PostsList';
import { store } from './app/stores';
import './styles.css';
import AddPostForm from './feature/post/AddPostForm';

const SecondApp = () => {
  return (
    <Provider store={store}>
      <main className='App'>
        <AddPostForm />
        <PostsList />
      </main>
    </Provider>
  );
};

export default SecondApp;