
import React from 'react';
import ReactDOM from 'react-dom/client';
import { getAppConfigIssues } from './appConfig';

const rootElement = document.getElementById('root');
if (!rootElement) throw new Error('Could not find root element to mount to');

const root = ReactDOM.createRoot(rootElement);
const issues = getAppConfigIssues(import.meta.env);

function renderStartupMessage(title: string, content: React.ReactNode) {
  root.render(
    <main role="alert" style={{ minHeight: '100vh', display: 'grid', placeItems: 'center', padding: 24, background: '#0D1117', color: '#e5e7eb', fontFamily: 'system-ui, sans-serif' }}>
      <section style={{ maxWidth: 560, width: '100%', padding: 32, border: '1px solid #374151', borderRadius: 12, background: '#161B22' }}>
        <h1 style={{ marginTop: 0, color: '#00F5A0' }}>{title}</h1>
        {content}
      </section>
    </main>
  );
}

if (issues.length > 0) {
  renderStartupMessage('Local setup needed', <>
    <p>The app needs its Supabase configuration before it can start.</p>
    <p>Copy <code>.env.example</code> to <code>.env.local</code> in the project folder, then replace these placeholder values with your Supabase project values:</p>
    <ul>{issues.map((name) => <li key={name}><code>{name}</code></li>)}</ul>
    <p>Restart <code>npm run dev</code> after saving the file.</p>
  </>);
} else {
  import('./App')
    .then(({ default: App }) => root.render(<React.StrictMode><App /></React.StrictMode>))
    .catch((error) => {
      console.error('App failed to start:', error);
      renderStartupMessage('App could not start', <p>Check the browser console for the error, then reload this page.</p>);
    });
}
