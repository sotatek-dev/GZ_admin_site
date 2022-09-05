import { Injected } from './injected';

export enum ConnectorKey {
	injected = 'MetaMask',
}

export const connectors = {
	[ConnectorKey.injected]: Injected,
};
