import { WalletConnectConnector } from '@web3-react/walletconnect-connector';

const bscChainId = Number(process.env.REACT_APP_BSC_CHAIN_ID);

const bscRpcUrl = process.env.REACT_APP_BSC_RPC_URL || '';
const RPC_MAPS: { [chainId: number]: string } = {
	[bscChainId]: bscRpcUrl,
};

export const WalletConnect = new WalletConnectConnector({
	rpc: RPC_MAPS,
	bridge: 'https://bridge.walletconnect.org',
	chainId: bscChainId,
	qrcode: true,
});
