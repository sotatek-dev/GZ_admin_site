import './App.scss';
import { BrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import BigNumber from 'bignumber.js';
import Web3Layout from '@common/layouts/Web3';
import { Web3ActiveReactProvider } from '@web3/contexts/web3ActiveReact';
import { AppRoutes } from './router/routes';
import { AuthProvider } from '@common/contexts/authContext';

function App() {
	const queryClient = new QueryClient({
		defaultOptions: {
			queries: { retry: false, refetchOnWindowFocus: false },
		},
	});

	BigNumber.config({
		ROUNDING_MODE: BigNumber.ROUND_DOWN,
		EXPONENTIAL_AT: [-50, 50],
	});

	return (
		<Web3ActiveReactProvider>
			<QueryClientProvider client={queryClient}>
				<BrowserRouter>
					<AuthProvider>
						<Web3Layout>
							<AppRoutes />
						</Web3Layout>
					</AuthProvider>
				</BrowserRouter>
			</QueryClientProvider>
		</Web3ActiveReactProvider>
	);
}

export default App;
