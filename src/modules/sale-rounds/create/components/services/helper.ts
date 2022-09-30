import BigNumber from 'bignumber.js';

const formatNumberClaim = (val: string | number) =>
	new BigNumber(
		new BigNumber(val).div(1e18).decimalPlaces(2, BigNumber.ROUND_DOWN)
	).toFormat();

const formatNumberPush = (val: string | number) =>
	new BigNumber(val).times(1e18).toString();

export { formatNumberClaim, formatNumberPush };
