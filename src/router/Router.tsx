import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import RootLayout from '../layouts/RootLayout';
import App from '../app/app';

function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<RootLayout />}>
          <Route index element={<App />} />
          <Route path=":id" element={<App />} />
        </Route>
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
