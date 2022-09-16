export interface SaleRound {
	_id: string;
	sale_round: number;
	is_current_sale_round: boolean;
	name: string;
	description: string;
	details: { network: string; buy_limit: number };
	claim_configs: Array<{ start_time: string; max_claim: number }>;
	buy_time: { start_time: string; end_time: string };
	exchange_rate: number;
	token_info: { address: string; symbol: string; total_sold_coin: number };
	status: string;
	created_at: string;
	updated_at: string;
}
