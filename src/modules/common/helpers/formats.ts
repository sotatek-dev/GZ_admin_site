import BigNumber from 'bignumber.js';

export const ellipsisAddressText = (address: string, start = 6, end = 6) => {
	return `${address.substring(0, start)}...${address.slice(-end)}`;
};
export const removeComanString = (val: string) =>
	val ? val.replace(/,/g, '') : '';

export const formatNumberClaim = (val: string | number) =>
	new BigNumber(
		new BigNumber(val).div(1e18).decimalPlaces(2, BigNumber.ROUND_DOWN)
	).toFormat();
