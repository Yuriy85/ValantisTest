import ReactDOM from 'react-dom/client';
import './styles/main.scss';
import App from './app/app';
import ErrorBoundary from './components/ErrorBoundary';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <ErrorBoundary>
    <App />
  </ErrorBoundary>
);
