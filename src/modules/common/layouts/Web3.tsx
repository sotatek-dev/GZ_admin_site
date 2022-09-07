import { useEagerConnect, useWalletListener } from '@web3/hooks';

interface Props {
	children: JSX.Element;
}

export default function Web3Layout({ children }: Props) {
	useEagerConnect();
	useWalletListener();

	return children;
}
