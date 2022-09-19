export const elipsisAddressText = (address: string, start = 6, end = 6) => {
	return `${address.substring(0, start)}...${address.slice(-end)}`;
};
