import { Provider } from 'react-redux';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import './styles.css';
import { store } from './app/stores';

const App = () => {
  return (
    <>
      <div>Lesson8</div>
    </>
  );
};

const Lesson8 = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/*" element={<App />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  );
};

export default Lesson8;