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
import { ISaleRoundCreateForm } from './types';
import { useState } from 'react';
import { SaleRoundCreateForm, rowsTableClaim } from './types';
import { useNavigate } from 'react-router';
import { PATHS } from '@common/constants/paths';
// import { createSaleRound } from './services/saleRoundUpdate'

export default function SaleRoundList() {
	const navigate = useNavigate();
	const [saleroundForm, setSaleroundForm] = useState<ISaleRoundCreateForm>({
		name: 'name',
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

	const handlerSubmitUpdate = () => {
		formsSaleRound[SaleRoundCreateForm.GENERAL_INFOR].submit();
		formsSaleRound[SaleRoundCreateForm.SR_ABOUNT].submit();
		formsSaleRound[SaleRoundCreateForm.SR_BOX_TIME].submit();
		formsSaleRound[SaleRoundCreateForm.SR_DETAIL].submit();
		formsSaleRound[SaleRoundCreateForm.SR_EXCHANGE_RATE].submit();
	};

	const handlerSubmitFinish = () => {
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
		setSaleroundForm({
			name,
			details: {
				network,
				buy_limit,
			},
			claim_configs: claimConfig.map((e) => ({
				start_time: Number(e.startTime),
				max_claim: e.maxClaim,
			})),
			have_list_user: true,
			description: 'string',
			token_info: {
				address: address,
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
		clearTimeout(debounceCreate);
		debounceCreate = setTimeout(() => {
			// createSaleRound(saleroundForm)
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
					<Form.Provider onFormFinish={handlerSubmitFinish}>
						<Row gutter={41}>
							<Col span={12}>
								<div className='w-100'>
									<Generalinfor
										form={formsSaleRound[SaleRoundCreateForm.GENERAL_INFOR]}
										srName={saleroundForm.name}
									/>
								</div>
								<div className='w-100 pt-42'>
									<SrClaimConfig onSubmitClaimConfig={handlerSubClaimConfig} />
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
								<ListUser />
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
						<span>Update the Round</span>
					</div>
				</div>
			</div>
		</>
	);
}
