import ReactDOM from 'react-dom/client';
import './styles/main.scss';
import ErrorBoundary from './components/ErrorBoundary';
import Router from './router/Router';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <ErrorBoundary>
    <Router />
  </ErrorBoundary>
);
