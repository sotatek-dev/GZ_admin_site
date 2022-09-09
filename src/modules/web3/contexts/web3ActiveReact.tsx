import React from 'react';
import { Web3ReactProvider } from '@web3-react/core';
import {
	ExternalProvider,
	JsonRpcFetchFunc,
	Web3Provider,
} from '@ethersproject/providers';

type Props = {
	children: React.ReactNode;
};

function getLibrary(provider: ExternalProvider | JsonRpcFetchFunc) {
	return new Web3Provider(provider);
}

export const Web3ActiveReactProvider: React.FC<Props> = ({ children }) => {
	return (
		<Web3ReactProvider getLibrary={getLibrary}>{children}</Web3ReactProvider>
	);
};
