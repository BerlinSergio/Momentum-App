import React from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import i18n from './i18n/index.js'
import App from './App.jsx'
import { useSettingsStore } from './store/useSettingsStore'
import { usePrayerStore } from './store/usePrayerStore'
import { useLocaleStore } from './store/useLocaleStore'
import { useProfileStore } from './store/useProfileStore'
import { useNavigationStore } from './store/useNavigationStore'

if (typeof window !== 'undefined') {
  window.useSettingsStore = useSettingsStore;
  window.usePrayerStore = usePrayerStore;
  window.useLocaleStore = useLocaleStore;
  window.useProfileStore = useProfileStore;
  window.useNavigationStore = useNavigationStore;
}

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    this.setState({ errorInfo });
    console.error("REACT CRASH:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{ color: 'red', padding: '20px', background: 'black', zIndex: 9999, position: 'relative' }}>
          <h1>{i18n.t('app.somethingWentWrong', 'Something went wrong.')}</h1>
          <pre>{this.state.error && this.state.error.toString()}</pre>
          <pre>{this.state.errorInfo && this.state.errorInfo.componentStack}</pre>
        </div>
      );
    }
    return this.props.children;
  }
}

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </React.StrictMode>,
);

// Register Service Worker for offline PWA support
if ('serviceWorker' in navigator && import.meta.env.PROD) {
  window.addEventListener('load', () => {
    navigator.serviceWorker
      .register('/sw.js')
      .then((reg) => {
        console.log('Momentum SW registered successfully:', reg.scope);
      })
      .catch((err) => {
        console.warn('Momentum SW registration failed:', err);
      });
  });
}

