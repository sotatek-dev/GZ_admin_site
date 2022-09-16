import { SaleRoundStatus } from '@sale-rounds/list/types';

export const SaleRoundStatusLabel = {
	[SaleRoundStatus.CREATED]: 'Created',
	[SaleRoundStatus.DEPLOYED]: 'Deployed',
	[SaleRoundStatus.FAIL]: 'Failed',
	[SaleRoundStatus.PENDING]: 'Pending',
};
