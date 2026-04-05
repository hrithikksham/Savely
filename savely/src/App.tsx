import React, { useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Sidebar } from './components/layout/Sidebar';
import { DashboardScreen }    from './screens/DashboardScreen';
import { TransactionsScreen } from './screens/TransactionsScreen';
import { InsightsScreen }     from './screens/InsightsScreen';

const queryClient = new QueryClient({ defaultOptions: { queries: { retry: 1, refetchOnWindowFocus: false } } });
type Route = '/' | '/transactions' | '/insights';

function AppContent() {
  const [route, setRoute] = useState<Route>('/');
  const screens: Record<Route, React.ReactElement> = {
    '/':             <DashboardScreen />,
    '/transactions': <TransactionsScreen />,
    '/insights':     <InsightsScreen />,
  };
  return (
    <div style={{ display: 'flex', height: '100vh', background: '#3a3a3a', padding: 12, gap: 12, overflow: 'hidden', boxSizing: 'border-box' }}>
      <Sidebar active={route} onNavigate={r => setRoute(r as Route)} />
      <main style={{ flex: 1, overflowY: 'auto', overflowX: 'hidden', minWidth: 0, paddingRight: 4 }}>
        {screens[route]}
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