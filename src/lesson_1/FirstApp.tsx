
import { Provider } from 'react-redux';
import { store } from './app/store';
import './styles.css';
import Counter from './features/counter/Counter';

const FirstApp = () => {

  return (
    <Provider store={store}>
      <Counter />
    </Provider>
  );
};

export default FirstApp;
