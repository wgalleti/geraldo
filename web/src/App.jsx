import { BrowserRouter } from 'react-router-dom';
import ptMessages from 'devextreme/localization/messages/pt.json';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { loadMessages, locale } from 'devextreme/localization';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './context/Auth.jsx';
import { AppRoutes } from './router/index.jsx';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: false,
    },
  },
});
loadMessages(ptMessages);
locale(navigator.language);

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Toaster />
      <AuthProvider>
        <BrowserRouter>
          <AppRoutes />
        </BrowserRouter>
      </AuthProvider>
    </QueryClientProvider>
  );
}
