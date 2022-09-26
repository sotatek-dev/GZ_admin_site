import './scss/SaleRoundCreate.style.scss';
import './scss/DialogClaim.style.scss';

import Generalinfor from './Generalinfor';
import SrDetails from './SrDetails';
import SrClaimConfig from './SrClaimConfig';
import ExchangeRate from './ExchangeRate';
import BoxTime from './BoxTime';
import AboutSaleRaound from './AboutSaleRaound';
import ListUser from './ListUser';
import { Col, Row, Form } from 'antd';
import {
	ISaleRoundCreateForm,
	SaleRoundCreateForm,
	rowsTableClaim,
} from './types';
import { useState } from 'react';
import { useNavigate } from 'react-router';
import { PATHS } from '@common/constants/paths';
import { MessageValidations } from './types';
// import { createSaleRound } from './services/saleRoundUpdate'

export default function SaleRoundList() {
	const navigate = useNavigate();
	const [saleroundForm, setSaleroundForm] = useState<ISaleRoundCreateForm>({
		name: 'nadfgfdgme',
		details: {
			network: 'network',
			buy_limit: 9,
		},
		claim_configs: [
			{
				start_time: 1,
				max_claim: 2,
			},
		],
		have_list_user: true,
		description: 'string',
		token_info: {
			address: '0xb237546A3706bde802B016131fa97df94D358FfF',
			token_address: 'string',
			symbol: 'BSC',
			token_icon: 'BSC',
			total_sold_coin: 99,
		},
		buy_time: {
			start_time: 0,
			end_time: 1,
		},
		exchange_rate: 1,
	});
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	let debounceCreate: any;

	const [claimConfig, setClaimConfig] = useState<rowsTableClaim[]>([]);
	const [messageErrClaimConfig, setMessageErrClaimConfig] =
		useState<string>('');
	const [isEvryCanJoin, setEveryCanJoin] = useState<boolean>(false);

	const formsSaleRound = {
		[SaleRoundCreateForm.GENERAL_INFOR]: Form.useForm()[0],
		[SaleRoundCreateForm.SR_DETAIL]: Form.useForm()[0],
		[SaleRoundCreateForm.SR_EXCHANGE_RATE]: Form.useForm()[0],
		[SaleRoundCreateForm.SR_BOX_TIME]: Form.useForm()[0],
		[SaleRoundCreateForm.SR_ABOUNT]: Form.useForm()[0],
	};

	const handlerSubClaimConfig = (val: rowsTableClaim[]) => {
		setClaimConfig(val);
	};

	const handlerSubmitUpdate = async () => {
		formsSaleRound[SaleRoundCreateForm.GENERAL_INFOR].submit();
		formsSaleRound[SaleRoundCreateForm.SR_ABOUNT].submit();
		formsSaleRound[SaleRoundCreateForm.SR_BOX_TIME].submit();
		formsSaleRound[SaleRoundCreateForm.SR_DETAIL].submit();
		formsSaleRound[SaleRoundCreateForm.SR_EXCHANGE_RATE].submit();

		let satusValidate = true;
		const payload = {
			name: '',
			details: {
				network: '',
				buy_limit: 0,
			},
			claim_configs: [],
			have_list_user: isEvryCanJoin,
			description: '',
			token_info: {
				address: '',
				token_address: '',
				symbol: '',
				token_icon: '',
				total_sold_coin: 0,
			},
			buy_time: {
				start_time: 0,
				end_time: 0,
			},
			exchange_rate: 1,
		};

		await formsSaleRound[SaleRoundCreateForm.GENERAL_INFOR]
			.validateFields()
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			.then((data: any) => {
				payload.name = data.name;
			})
			.catch(() => {
				satusValidate = false;
			});

		await formsSaleRound[SaleRoundCreateForm.SR_ABOUNT]
			.validateFields()
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			.then((data: any) => {
				payload.description = data.description;
			})
			.catch(() => {
				satusValidate = false;
			});

		await formsSaleRound[SaleRoundCreateForm.SR_BOX_TIME]
			.validateFields()
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			.then((data: any) => {
				payload.buy_time.start_time = data.start_time.unix();
				payload.buy_time.end_time = data.end_time.unix();
			})
			.catch(() => {
				satusValidate = false;
			});

		await formsSaleRound[SaleRoundCreateForm.SR_DETAIL]
			.validateFields()
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			.then((data: any) => {
				payload.token_info.address = data.address;
				payload.details.network = data.network;
				payload.details.buy_limit = data.buy_limit;
				payload.token_info.symbol = data.network;
				payload.token_info.total_sold_coin = data.total_sold_coin;
			})
			.catch(() => {
				satusValidate = false;
			});

		await formsSaleRound[SaleRoundCreateForm.SR_EXCHANGE_RATE]
			.validateFields()
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			.then((data: any) => {
				payload.exchange_rate = (1 / Number(data.ex_rate_get)) | 1;
			})
			.catch(() => {
				satusValidate = false;
			});

		if (!satusValidate) return;

		const claim_configs: {
			start_time: number;
			max_claim: number;
		}[] = [];
		let totalMaxClaim = 0;
		claimConfig.forEach((el) => {
			claim_configs.push({
				start_time: Number(el.startTime),
				max_claim: Number(el.maxClaim) * 100,
			});

			totalMaxClaim += Number(el.maxClaim);
		});
		if (claimConfig.length === 0) {
			claim_configs.push({
				start_time: payload.buy_time.start_time + 1000,
				max_claim: 10000,
			});
		}

		if (totalMaxClaim < 100 || totalMaxClaim > 100) {
			setMessageErrClaimConfig(MessageValidations.MSC_1_16);
			return;
		} else setMessageErrClaimConfig('');

		setSaleroundForm(payload);
		clearTimeout(debounceCreate);
		debounceCreate = setTimeout(() => {
			// createSaleRound(saleroundForm)
			// eslint-disable-next-line no-console
			console.log(saleroundForm);
		}, 500);
	};

	return (
		<>
			<div className='sale-round-container'>
				<div className='pb-62'>
					<div
						className='btn-sale-round-create btn-back d-flex align-items-center justify-content-center'
						onClick={() => navigate(PATHS.saleRounds.list())}
					>
						<span>Back</span>
					</div>
				</div>
				<div className='sale-round-mid'>
					<Form.Provider>
						<Row gutter={41}>
							<Col span={12}>
								<div className='w-100'>
									<Generalinfor
										form={formsSaleRound[SaleRoundCreateForm.GENERAL_INFOR]}
										srName={saleroundForm.name}
									/>
								</div>
								<div className='w-100 pt-42'>
									<SrClaimConfig
										message={messageErrClaimConfig}
										onSubmitClaimConfig={handlerSubClaimConfig}
									/>
								</div>
							</Col>
							<Col span={12}>
								<div>
									<SrDetails
										data={{
											buy_limit: 0,
											network: 'BSC',
											address: '0xb237546A3706bde802B016131fa97df94D358FfF',
											tottal_sold_coin: 0,
										}}
										form={formsSaleRound[SaleRoundCreateForm.SR_DETAIL]}
									/>
								</div>
								<div className='pt-15'>
									<ExchangeRate
										form={formsSaleRound[SaleRoundCreateForm.SR_EXCHANGE_RATE]}
									/>
								</div>
								<div className='pt-19'>
									<BoxTime
										form={formsSaleRound[SaleRoundCreateForm.SR_BOX_TIME]}
									/>
								</div>
							</Col>
						</Row>
						<Row className='pt-41'>
							<Col span={24}>
								<AboutSaleRaound
									form={formsSaleRound[SaleRoundCreateForm.SR_ABOUNT]}
								/>
							</Col>
						</Row>
						<Row className='pt-41'>
							<Col span={24}>
								<ListUser isEveryCanJoin={setEveryCanJoin} />
							</Col>
						</Row>
					</Form.Provider>
				</div>
				<div className='d-flex justify-content-space pt-153'>
					<div className='btn-deploy btn-deploy-round d-flex align-items-center justify-content-center cursor-pointer mr-41'>
						<span>Deploy the round</span>
					</div>
					<div
						className='btn-sale-round-create btn-update-round d-flex align-items-center justify-content-center'
						onClick={handlerSubmitUpdate}
					>
						<span>Create the round</span>
					</div>
				</div>
			</div>
		</>
	);
}
