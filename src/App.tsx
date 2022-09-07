import './App.scss';
import { BrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import BigNumber from 'bignumber.js';
import Web3Layout from '@common/layouts/Web3';
import { Web3ActiveReactProvider } from '@web3/contexts/web3ActiveReact';
import { AppRoutes } from './router/routes';

function App() {
	const queryClient = new QueryClient({
		defaultOptions: {
			queries: { retry: false },
		},
	});

	BigNumber.config({
		ROUNDING_MODE: BigNumber.ROUND_DOWN,
		EXPONENTIAL_AT: [-50, 50],
	});

	return (
		<Web3ActiveReactProvider>
			<Web3Layout>
				<QueryClientProvider client={queryClient}>
					<BrowserRouter>
						<AppRoutes />
					</BrowserRouter>
				</QueryClientProvider>
			</Web3Layout>
		</Web3ActiveReactProvider>
	);
}

export default App;
