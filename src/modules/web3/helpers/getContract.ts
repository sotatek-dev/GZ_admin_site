import { BaseContract, Contract, ContractInterface } from 'ethers';
import { Signer } from '@ethersproject/abstract-signer';
import { Provider } from '@ethersproject/providers';

export const getContract = <T extends BaseContract>(
	abi: ContractInterface,
	address: string,
	signer?: Signer | Provider
): T => {
	return new Contract(address, abi, signer) as T;
};
