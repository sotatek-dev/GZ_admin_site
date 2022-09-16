export interface SaleRound {
	_id: string;
	name: string;
	description: string;
	details: { network: string; buy_limit: number };
	claim_configs: Array<{ start_time: number; max_claim: number }>;
	buy_time: { start_time: number; end_time: number };
	exchange_rate: number;
	token_info: { address: string; symbol: string; total_sold_coin: number };
	created_at: string;
	updated_at: string;
	sale_round: number;
	status: SaleRoundStatus;
}

export enum SaleRoundStatus {
	// Pending to update to sc
	PENDING = 'pending',
	// Created in SC
	CREATED = 'created',
	// Used to set current in sc
	DEPLOYED = 'deployed',
	// Fail when send trans to sc
	FAIL = 'fail_when_create',
}
