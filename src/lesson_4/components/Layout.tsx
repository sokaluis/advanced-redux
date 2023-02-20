import { Outlet } from 'react-router-dom';
import Header from './Header';
import { FC, PropsWithChildren } from 'react';

const Layout: FC<PropsWithChildren> = () => {
  return (
    <>
      <Header />
      <main className="App">
        <Outlet />
      </main>
    </>
  );
};

export default Layout;