import './scss/SrDetails.style.scss';
// import aboutIcon from './icons/about-icon.svg';
import { Input, Radio, Form, Checkbox } from 'antd';
import {
	MessageValidations,
	SrTokenInforForm,
	SrTokenDetailForm,
} from './types';
import type { CheckboxChangeEvent } from 'antd/es/checkbox';
import { useState } from 'react';
import type { FormInstance } from 'antd/es/form/Form';
import NumericInput from './NumericInput';

interface SrDetailProps {
	tokenInfo: SrTokenInforForm;
	details: SrTokenDetailForm;
	form: FormInstance;
}

export default function SaleRoundBoxDetails(props: SrDetailProps) {
	const { tokenInfo, form, details } = props;
	const [buyLimit, setBuyLimit] = useState<string>('');
	const [totalSoldCoin, setTotalSoldCoin] = useState<string>('');
	const [checkedBuyLimit, setCheckedBuyLimit] = useState(true);
	const [disabledBuyLimit, setDisabledBuyLimit] = useState(false);

	const handlerCheckboxChange = (e: CheckboxChangeEvent) => {
		setCheckedBuyLimit(e.target.checked);
		setDisabledBuyLimit(!e.target.checked);
	};

	return (
		<>
			<div className='sr-block-contents'>
				<div className='sale-round-title sr-showdetail-title--h'>
					Sale Round details
				</div>
				<div className='px-20 sale-round-contents sr-showdetail-showip--h'>
					<Form form={form} layout='vertical' name='srDetailForm'>
						<Form.Item
							name='network'
							label='Network available'
							className='mb-0 pt-12'
							initialValue={details.network}
						>
							<Radio.Group>
								<Radio value={'BSC'}>BSC</Radio>
							</Radio.Group>
						</Form.Item>
						<Form.Item
							name='buyLimit'
							label={
								<div className='SR-contents-title d-flex'>
									<span className='pr-4'>Buy Limit (BUSD)</span>
									<div className='d-flex align-items-center'>
										<Checkbox
											checked={checkedBuyLimit}
											onChange={handlerCheckboxChange}
											className='sr-checkbox-user pl-21'
										>
											No limit
										</Checkbox>
									</div>
								</div>
							}
							className='pt-14 mb-9'
							initialValue={details.buy_limit}
						>
							{disabledBuyLimit ? (
								<NumericInput
									key='buyLimit'
									className='ip-sale-round-detail'
									suffix=''
									value={buyLimit}
									onChange={setBuyLimit}
								/>
							) : (
								<Input
									disabled
									className={`ip-sale-round-detail ${
										!disabledBuyLimit ? 'ip-disable' : ''
									}`}
								/>
							)}
						</Form.Item>
						{/* <Form.Item
							name='buyLimit'
							label={
								<div className='SR-contents-title d-flex'>
									<span className={'pr-4'}>Buy Limit (BUSD)</span>
									<div className={'d-flex align-items-center'}>
										<Tooltip
											placement='bottom'
											title={'Set this value to 0 for no limitation'}
										>
											<img src={aboutIcon} alt='' />
										</Tooltip>
									</div>
								</div>
							}
							className='pt-14 mb-9'
							initialValue={data.buy_limit}
						>
							<NumericInput
								key='buyLimit'
								className='ip-sale-round-detail'
								suffix=''
								value={buyLimit}
								onChange={setBuyLimit}
							/>
						</Form.Item> */}
						<Form.Item
							name='address'
							className='mb-22'
							label='Address (Recieve Money)'
							initialValue={tokenInfo.address}
							rules={[{ required: true, message: MessageValidations.MSC_1_15 }]}
						>
							<Input className='ip-sr-token-infor' placeholder='Basic usage' />
						</Form.Item>
						<Form.Item
							name='total_sold_coin'
							className='mb-22'
							label='Total Sold Coin'
							rules={[{ required: true, message: MessageValidations.MSC_1_15 }]}
							initialValue={tokenInfo.total_sold_coin}
						>
							<NumericInput
								key='total_sold_coin'
								className='ip-sr-token-infor'
								suffix=''
								value={totalSoldCoin}
								onChange={setTotalSoldCoin}
							/>
						</Form.Item>
					</Form>
				</div>
			</div>
		</>
	);
}
