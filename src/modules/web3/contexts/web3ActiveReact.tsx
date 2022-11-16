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
	const library = new Web3Provider(provider);
	library.pollingInterval = 3000;
	return library;
}

export const Web3ActiveReactProvider: React.FC<Props> = ({ children }) => {
	return (
		<Web3ReactProvider getLibrary={getLibrary}>{children}</Web3ReactProvider>
	);
};
