import { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';

function RootLayout() {
  const [isDarkTheme, setIsDarkTheme] = useState(!!localStorage.getItem('dark') || false);

  useEffect(() => {
    if (isDarkTheme) {
      document.body.setAttribute('data-bs-theme', 'dark');
      localStorage.setItem('dark', 'true');
    } else {
      document.body.removeAttribute('data-bs-theme');
      localStorage.removeItem('dark');
    }
    return () => {
      document.body.removeAttribute('data-bs-theme');
    };
  });

  return (
    <>
      <Header isDarkTheme={isDarkTheme} setIsDarkTheme={setIsDarkTheme} />
      <main>
        <Outlet />
      </main>
      <Footer isDarkTheme={isDarkTheme} />
    </>
  );
}

export default RootLayout;
