import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
//App layouts
import RootLayout from '../layouts/RootLayout';
//App Components
import App from '../app/app';
import ErrorBoundary from '../components/ErrorBoundary';

function Router() {
  return (
    <ErrorBoundary>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<RootLayout />}>
            <Route index element={<App />} />
            <Route path=":id" element={<App />} />
          </Route>
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </BrowserRouter>
    </ErrorBoundary>
  );
}

export default Router;
