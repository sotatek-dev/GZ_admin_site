export enum SaleRoundCreateForm {
	GENERAL_INFOR = 'GENERAL_INFOR',
	SR_DETAIL = 'GENERAL_INFOR',
	SR_EXCHANGE_RATE = 'SR_EXCHANGE_RATE',
	SR_BOX_TIME = 'SR_BOX_TIME',
	SR_ABOUNT = 'SR_ABOUNT',
}

export enum MessageValidations {
	MSC_1_15 = 'This field is required',
	MSC_1_16 = 'Total Max Claim (%) must be equal to 100%',
	MSC_1_4__M500 = 'Please enter less than 500!',
}

export const FORMAT_DATETIME_SALEROUND = 'YYYY-MM-DD hh:mm';

export interface SrTokenInforForm {
	address: string;
	total_sold_coin: number;
}
export interface SrTokenDetailForm {
	network: string;
	buy_limit: number;
}
export interface SRBoxTime {
	start_time: number;
	end_time: number;
}
export interface DataClaimConfig {
	start_time: number;
	max_claim: number | string;
}
export interface ISaleRoundCreateForm {
	name: string;
	have_list_user: boolean;
	description: string;
	details: SrTokenDetailForm;
	claim_configs: DataClaimConfig[];
	token_info: SrTokenInforForm;
	buy_time: SRBoxTime;
	exchange_rate: number;
}

export interface rowsTableClaim {
	id: number;
	startTime: number;
	maxClaim: number;
}
