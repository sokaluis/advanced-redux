import React from 'react';
import ReactDOM from 'react-dom/client';
import SecondApp from './lesson_2/SecondApp';
// import FirstApp from './lesson_1/FirstApp';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    {/* <FirstApp /> */}
    <SecondApp />
  </React.StrictMode>,
);
