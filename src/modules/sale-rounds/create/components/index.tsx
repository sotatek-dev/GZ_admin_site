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

		await formsSaleRound[SaleRoundCreateForm.GENERAL_INFOR]
			.validateFields()
			.then((data: any) => {
				console.log('GENERAL_INFOR', data);
			})
			.catch((err: any) => {
				console.log('GENERAL_INFOR err', err, err.errorFields.length);
				satusValidate = false;
			});

		await formsSaleRound[SaleRoundCreateForm.SR_ABOUNT]
			.validateFields()
			.then((data: any) => {
				console.log('SR_ABOUNT', data);
			})
			.catch((err: any) => {
				console.log('SR_ABOUNT err', err);
				satusValidate = false;
			});

		await formsSaleRound[SaleRoundCreateForm.SR_BOX_TIME]
			.validateFields()
			.then((data: any) => {
				console.log('SR_BOX_TIME', data);
			})
			.catch((err: any) => {
				console.log('SR_BOX_TIME err', err);
				satusValidate = false;
			});

		await formsSaleRound[SaleRoundCreateForm.SR_DETAIL]
			.validateFields()
			.then((data: any) => {
				console.log('SR_DETAIL', data);
			})
			.catch((err: any) => {
				console.log('SR_DETAIL err', err);
				satusValidate = false;
			});

		await formsSaleRound[SaleRoundCreateForm.SR_EXCHANGE_RATE]
			.validateFields()
			.then((data: any) => {
				console.log('SR_EXCHANGE_RATE', data);
			})
			.catch((err: any) => {
				console.log('SR_EXCHANGE_RATE err', err);
				satusValidate = false;
			});

		if (!satusValidate) return;

		const name =
			formsSaleRound[SaleRoundCreateForm.GENERAL_INFOR].getFieldValue('name') ||
			'';
		const buy_limit: number =
			formsSaleRound[SaleRoundCreateForm.SR_DETAIL].getFieldValue(
				'buy_limit'
			) || 0;
		const network: string =
			formsSaleRound[SaleRoundCreateForm.SR_DETAIL].getFieldValue('network') ||
			'BSC';
		const address: string =
			formsSaleRound[SaleRoundCreateForm.SR_DETAIL].getFieldValue('address') ||
			'';
		const total_sold_coin: number =
			formsSaleRound[SaleRoundCreateForm.SR_DETAIL].getFieldValue(
				'total_sold_coin'
			);

		const ex_rate_get: number =
			formsSaleRound[SaleRoundCreateForm.SR_EXCHANGE_RATE].getFieldValue(
				'ex_rate_get'
			);
		const exchange_rate: number = (1 / ex_rate_get) | 1;
		const buy_time = {
			start_time: 0,
			end_time: 0,
		};
		buy_time.start_time = formsSaleRound[SaleRoundCreateForm.SR_BOX_TIME]
			.getFieldValue('start_time')
			.unix();
		buy_time.end_time = formsSaleRound[SaleRoundCreateForm.SR_BOX_TIME]
			.getFieldValue('end_time')
			.unix();

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
			console.log(123, totalMaxClaim);
		});
		if (claimConfig.length === 0) {
			claim_configs.push({
				start_time: buy_time.start_time + 1000,
				max_claim: 10000,
			});
		}
		console.log('claimConfig', claim_configs, totalMaxClaim);

		if (totalMaxClaim < 100 || totalMaxClaim > 100) {
			setMessageErrClaimConfig(MessageValidations.MSC_1_16);
			// return;
		} else setMessageErrClaimConfig('');
		const payload = {
			name,
			details: {
				network,
				buy_limit,
			},
			claim_configs,
			have_list_user: isEvryCanJoin,
			description: 'string',
			token_info: {
				address: address,
				token_address: 'string',
				symbol: 'BSC',
				token_icon: 'BSC',
				total_sold_coin,
			},
			buy_time,
			exchange_rate,
		};
		setSaleroundForm(payload);
		clearTimeout(debounceCreate);
		debounceCreate = setTimeout(() => {
			// createSaleRound(saleroundForm)
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
