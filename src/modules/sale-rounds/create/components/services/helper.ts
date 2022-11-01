import BigNumber from 'bignumber.js';

const formatNumberClaim = (val: string | number) =>
	new BigNumber(
		new BigNumber(val).div(1e18).decimalPlaces(4, BigNumber.ROUND_DOWN)
	).toFormat();

const formatNumberPush = (val: string) => {
	const newVal = val.replace(/,/g, '');
	const temp = new BigNumber(newVal).multipliedBy(1e18).toString();

	return temp;
};

const removeComanString = (val: string) => (val ? val.replace(/,/g, '') : '');

export { formatNumberClaim, formatNumberPush, removeComanString };
