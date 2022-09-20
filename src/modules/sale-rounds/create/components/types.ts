import type { FormInstance } from 'antd/es/form/Form';

export enum SaleRoundCreateForm {
	GENERAL_INFOR = 'GENERAL_INFOR',
	SR_DETAIL = 'GENERAL_INFOR',
	SR_TOKEN_INFOR = 'SR_TOKEN_INFOR',
	SR_EXCHANGE_RATE = 'SR_EXCHANGE_RATE',
	SR_BOX_TIME = 'SR_BOX_TIME',
	SR_ABOUNT = 'SR_ABOUNT',
}

export interface GeneralInforProps {
	srName: string;
	form: FormInstance;
}

export interface SRDetailProps {
	data: {
		network: string;
		buy_limit: number;
	};
	form: FormInstance;
}
export interface ISRExchangeRateProps {
	form: FormInstance;
}
export interface ISRBoxTimeProps {
	form: FormInstance;
}
export interface ISRAboutProps {
	form: FormInstance;
}
export interface SRTokenInfor {
	data: {
		network: string;
		buy_limit: number;
	};
	form: FormInstance;
}
export interface SRTokenInforForm {
	address: string;
	token_address: string;
	symbol: string;
	token_icon: string;
	total_sold_coin: number;
}
export interface SRBoxTime {
	start_time: number;
	end_time: number;
}
export interface IDataClaimConfig {
	start_time: number;
	max_claim: number;
}
export interface ISaleRoundCreateForm {
	name: string;
	details: {
		network: string;
		buy_limit: number;
	};
	claim_configs: IDataClaimConfig[];
	have_list_user: boolean;
	description: string;
	token_info: SRTokenInforForm;
	buy_time: SRBoxTime;
	exchange_rate: number;
}

export interface IDialogClaimConfigProps {
	open: boolean;
	selectedValue: IDataClaimConfig;
	onClose: (value: IDataClaimConfig) => void;
}

export interface rowsTableClaim {
	id: number;
	startTime: string | number;
	maxClaim: number;
}
