export enum SaleRoundCreateForm {
	GENERAL_INFOR = 'GENERAL_INFOR',
	SR_DETAIL = 'GENERAL_INFOR',
	SR_EXCHANGE_RATE = 'SR_EXCHANGE_RATE',
	SR_BOX_TIME = 'SR_BOX_TIME',
	SR_ABOUNT = 'SR_ABOUNT',
}

export const FORMAT_DATETIME_SALEROUND = 'YYYY-MM-DD HH:mm';
export const MAXCLAIM_TO_SC = 100;

export interface SrTokenInforForm {
	address: string;
	total_sold_coin: string;
}
export interface SrTokenDetailForm {
	network: string;
	buy_limit: string;
}
export interface SRBoxTime {
	start_time: number;
	end_time: number;
}
export interface DataClaimConfig {
	start_time: number;
	max_claim: string;
}
export interface ISaleRoundCreateForm {
	name: string;
	have_list_user: boolean;
	description: string;
	details: SrTokenDetailForm;
	claim_configs: DataClaimConfig[];
	token_info: SrTokenInforForm;
	buy_time: SRBoxTime;
	exchange_rate: string;
}

export interface rowsTableClaim {
	id: number;
	startTime: number;
	maxClaim: string;
}

export interface SaleRoundDetailsType {
	address?: string;
	buyLimit?: string;
	name?: string;
	network?: string;
	total_sold_coin?: string;
	is_shown?: boolean;
	is_claim_configs_shown?: boolean;
}

export interface SaleRoundExchangeRateType {
	ex_rate_get: string;
	ex_rate_have: string;
}

export interface PageingWhiteList {
	page: number;
	limit: number;
}

export interface DataTypePropsTable {
	_id: string;
	wallet_address: string;
	email: string;
}
