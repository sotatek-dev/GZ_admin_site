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
	MSC_1_27 = 'Claim time must be after End Buy time',
	MSC_1_4__M500 = 'Please enter less than 500!',
	MSC_1_20 = 'Start Time must be before End time',
	MSC_1_30 = 'The current deployed round buy time is not ended yet',
	MSC_1_31 = 'No file uploaded or invalid file type!',
	MSC_1_33 = 'Start buy time must be after the previous Sale Round period',
	MSC_2_10 = 'Transaction rejected!',
	MSC_2_11 = 'Transaction error',
	MSC_2_12 = 'Transaction completed',
	MSC_3_5 = 'The system will store the latest Round information. Are you sure you want to deploy?',
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
