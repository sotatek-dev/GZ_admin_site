import BigNumber from 'bignumber.js';

export const toWei = (value: BigNumber.Value) =>
	new BigNumber(value).times(1e18).toString();
