import { Provider } from 'react-redux';
import PostsList from './feature/post/PostsList';
import { store } from './app/stores';
import './styles.css';

const SecondApp = () => {
  return (
    <Provider store={store}>
      <main className='App'>
        <PostsList />
      </main>
    </Provider>
  );
};

export default SecondApp;