import { InjectedConnector } from '@web3-react/injected-connector';

const bsc_chain_id = Number(process.env.REACT_APP_BSC_CHAIN_ID);

export const Injected = new InjectedConnector({
	supportedChainIds: [bsc_chain_id],
});
