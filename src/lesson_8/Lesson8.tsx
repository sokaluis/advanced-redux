import { Provider } from 'react-redux';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import './styles.css';
import { store } from './app/stores';
import Layout from './components/Layout';
import Public from './components/Public';
import Login from './features/auth/components/Login';
import RequireAuth from './features/auth/components/RequireAuth';
import Welcome from './features/auth/components/Welcome';

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        {/* public routes */}
        <Route index element={<Public />} />
        <Route path="login" element={<Login />} />

        {/* protected routes */}
        <Route element={<RequireAuth />}>
          <Route path="welcome" element={<Welcome />} />
          {/* <Route path="userslist" element={<UsersList />} /> */}
        </Route>

      </Route>
    </Routes>
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