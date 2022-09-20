import './scss/SaleRoundCreate.style.scss';
import './scss/DialogClaim.style.scss';

import Generalinfor from './Generalinfor';
import SrDetails from './SrDetails';
import SrClaimConfig from './SrClaimConfig';
import TokenInfor from './TokenInfor';
import ExchangeRate from './ExchangeRate';
import BoxTime from './BoxTime';
import AboutSaleRaound from './AboutSaleRaound';
import ListUser from './ListUser';
import { Col, Row, Form } from 'antd';
import { ISaleRoundCreateForm } from './types';
import { useState } from 'react';
import { SaleRoundCreateForm, rowsTableClaim } from './types';

export default function SaleRoundList() {
	const [saleroundForm, setSaleroundForm] = useState<ISaleRoundCreateForm>({
		name: 'ahihihi',
		details: {
			network: '',
			buy_limit: '',
		},
	});

	const [claimConfig, setClaimConfig] = useState<rowsTableClaim[]>([]);

	const formsSaleRound = {
		[SaleRoundCreateForm.GENERAL_INFOR]: Form.useForm()[0],
		[SaleRoundCreateForm.SR_DETAIL]: Form.useForm()[0],
		[SaleRoundCreateForm.SR_TOKEN_INFOR]: Form.useForm()[0],
		[SaleRoundCreateForm.SR_EXCHANGE_RATE]: Form.useForm()[0],
		[SaleRoundCreateForm.SR_BOX_TIME]: Form.useForm()[0],
	};

	const handlerSubClaimConfig = (val: rowsTableClaim[]) => {
		console.log('handlerSubClaimConfig', val);

		setClaimConfig(val);
	};

	const handlerSubmitUpdate = () => {
		formsSaleRound[SaleRoundCreateForm.GENERAL_INFOR].submit();
		formsSaleRound[SaleRoundCreateForm.SR_DETAIL].submit();

		console.log('pass submit', saleroundForm);
	};

	const handlerSubmitFinish = () => {
		const name =
			formsSaleRound[SaleRoundCreateForm.GENERAL_INFOR].getFieldValue('name') ||
			'';
		const buy_limit =
			formsSaleRound[SaleRoundCreateForm.SR_DETAIL].getFieldValue(
				'buy_limit'
			) || 0;
		const network =
			formsSaleRound[SaleRoundCreateForm.SR_DETAIL].getFieldValue('network') ||
			'BSC';
		setSaleroundForm({
			name,
			details: {
				network,
				buy_limit,
			},
		});
		console.log('form finish', saleroundForm, claimConfig);
	};
	return (
		<>
			<div className='sale-round-container'>
				<div className='pb-62'>
					<div className='btn-sale-round-create btn-back d-flex align-items-center justify-content-center'>
						<span>Back</span>
					</div>
				</div>
				<div className='sale-round-mid'>
					<Form.Provider onFormFinish={handlerSubmitFinish}>
						<Row gutter={41}>
							<Col span={12}>
								<Generalinfor
									form={formsSaleRound[SaleRoundCreateForm.GENERAL_INFOR]}
									srName={saleroundForm.name}
								/>
							</Col>
							<Col span={12}>
								<SrDetails
									data={{
										buy_limit: 0,
										network: 'BSC',
									}}
									form={formsSaleRound[SaleRoundCreateForm.SR_DETAIL]}
								/>
							</Col>
						</Row>
						<Row className='pt-41' gutter={41}>
							<Col span={12}>
								<SrClaimConfig onSubmitClaimConfig={handlerSubClaimConfig} />
							</Col>
							<Col span={12}>
								<TokenInfor
									form={formsSaleRound[SaleRoundCreateForm.SR_TOKEN_INFOR]}
									data={{
										buy_limit: 0,
										network: '0',
									}}
								/>
							</Col>
						</Row>
						<Row className='pt-41' gutter={41}>
							<Col span={12}>
								<ExchangeRate
									form={formsSaleRound[SaleRoundCreateForm.SR_EXCHANGE_RATE]}
								/>
							</Col>
							<Col span={12}>
								<BoxTime
									form={formsSaleRound[SaleRoundCreateForm.SR_BOX_TIME]}
								/>
							</Col>
						</Row>
						<Row className='pt-41'>
							<Col span={24}>
								<AboutSaleRaound />
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
