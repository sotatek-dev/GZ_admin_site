import type { FormInstance } from 'antd/es/form/Form';

export enum SaleRoundCreateForm {
	GENERAL_INFOR = 'GENERAL_INFOR',
	SR_DETAIL = 'GENERAL_INFOR',
	SR_TOKEN_INFOR = 'SR_TOKEN_INFOR',
	SR_EXCHANGE_RATE = 'SR_EXCHANGE_RATE',
	SR_BOX_TIME = 'SR_BOX_TIME',
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
export interface SRTokenInfor {
	data: {
		network: string;
		buy_limit: number;
	};
	form: FormInstance;
}
export interface ISaleRoundCreateForm {
	name: string;
	details: {
		network: string;
		buy_limit: string;
	};
}

export interface IDataClaimConfig {
	start_time: number;
	max_claim: number;
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
