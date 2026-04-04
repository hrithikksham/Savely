import { useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Sidebar } from './components/layout/Sidebar';
import { DashboardScreen } from './screens/index';
import { TransactionsScreen } from './screens/transactions';
import { InsightsScreen } from './screens/insights';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: { retry: 1, refetchOnWindowFocus: false },
  },
});

type Route = '/' | '/transactions' | '/insights';

function AppContent() {
  const [route, setRoute] = useState<Route>('/');

  const screen = {
    '/':             <DashboardScreen />,
    '/transactions': <TransactionsScreen />,
    '/insights':     <InsightsScreen />,
  }[route];

  return (
    <div style={{
      display: 'flex',
      height: '100vh',
      background: '#3a3a3a',
      padding: 12,
      gap: 12,
      overflow: 'hidden',
      boxSizing: 'border-box',
    }}>
      <Sidebar active={route} onNavigate={r => setRoute(r as Route)} />
      <main style={{
        flex: 1,
        overflowY: 'auto',
        overflowX: 'hidden',
        minWidth: 0,
      }}>
        <div style={{ padding: '4px 4px 16px 4px', minHeight: '100%' }}>
          {screen}
        </div>
      </main>
    </div>
  );
}

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AppContent />
    </QueryClientProvider>
  );
}