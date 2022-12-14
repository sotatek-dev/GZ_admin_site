import './scss/SrDetails.style.scss';
import type { CheckboxChangeEvent } from 'antd/es/checkbox';
import type { FormInstance } from 'antd/es/form/Form';
import { Radio, Checkbox } from 'antd';
import { MessageValidations } from '@common/constants/messages';
import { SrTokenInforForm, SrTokenDetailForm } from './types';
import { addressValidator } from '@common/helpers/validate';
import { Card, Form, Input } from '@common/components';
import { useEffect, useRef, useState } from 'react';
import { removeComanString } from './services/helper';
import NumericInput from './NumericInput';
import BigNumber from 'bignumber.js';

interface SrDetailProps {
	isUpdate: boolean;
	tokenInfo: SrTokenInforForm;
	details: SrTokenDetailForm;
	form: FormInstance;
}

export default function SaleRoundBoxDetails(props: SrDetailProps) {
	const { tokenInfo, form, details, isUpdate } = props;
	const buyLimit = useRef<string>('');
	const [totalSoldCoin, setTotalSoldCoin] = useState<string>('');
	const [checkedBuyLimit, setCheckedBuyLimit] = useState(false);
	const [disabledBuyLimit, setDisabledBuyLimit] = useState(false);

	const setBuyLimit = (val: string) => (buyLimit.current = val);

	const handlerCheckboxChange = (e: CheckboxChangeEvent) => {
		setCheckedBuyLimit(e.target.checked);
		setDisabledBuyLimit(e.target.checked);
		if (e.target.checked) {
			setBuyLimit('');
			form.resetFields(['buyLimit']);
			form.setFieldValue('buyLimit', '');
		} else {
			setBuyLimit('');
			form.setFieldValue('buyLimit', '');
		}
	};

	const handlerBuyLimitChangeRules = () => ({
		validator(_: unknown, value: string) {
			if (details && checkedBuyLimit) return Promise.resolve();
			if (new BigNumber(removeComanString(value)).isGreaterThan(0)) {
				return Promise.resolve();
			}
			if (new BigNumber(removeComanString(value)).isEqualTo(0))
				return Promise.reject(new Error('Buy limit must be greater than 0'));
			return Promise.resolve();
		},
	});

	const handlerTotalSoldCoinChangeRules = () => ({
		validator(_: unknown, value: string) {
			if (new BigNumber(removeComanString(value)).isGreaterThan(0)) {
				return Promise.resolve();
			}
			if (new BigNumber(removeComanString(value)).isEqualTo(0))
				return Promise.reject(
					new Error('Total sold coin must be greater than 0')
				);
			return Promise.resolve();
		},
	});

	useEffect(() => {
		if (!tokenInfo || !details) return;

		// BE handler buy limit is 0, it is mean use can buy no Limit -> CheckBox can be tick and disable input buy limit
		if (details.buy_limit === '0') {
			setCheckedBuyLimit(true);
			setDisabledBuyLimit(true);
			form.setFieldValue('buyLimit', '');
		} else {
			setCheckedBuyLimit(false);
			setDisabledBuyLimit(false);
			form.setFieldValue('buyLimit', details.buy_limit);
			if (isUpdate) setDisabledBuyLimit(true);
		}
	}, [tokenInfo, details]);

	return (
		<Card title='Sale Round details'>
			<div className='px-20 sale-round-contents sr-showdetail-showip--h'>
				<Form form={form} layout='vertical' name='srDetailForm'>
					<Form.Item
						name='network'
						label='Network available'
						className='mb-0 pt-12'
						initialValue={'BSC'}
					>
						<Radio.Group disabled={isUpdate}>
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
										disabled={isUpdate}
										onChange={handlerCheckboxChange}
										className='sr-checkbox-user pl-21'
									>
										No limit
									</Checkbox>
								</div>
							</div>
						}
						className='pt-14 mb-9'
						initialValue={details?.buy_limit}
						rules={[
							{
								required: !checkedBuyLimit,
								message: MessageValidations.MSC_1_15,
							},
							handlerBuyLimitChangeRules,
						]}
					>
						<NumericInput
							key={`buyLimit`}
							disabled={disabledBuyLimit || isUpdate}
							className=''
							suffix=''
							value={buyLimit.current}
							onChange={setBuyLimit}
						/>
					</Form.Item>
					<Form.Item
						name='address'
						className='mb-22'
						label='Address (Recieve Money)'
						initialValue={tokenInfo?.address}
						rules={[
							{ required: true, message: MessageValidations.MSC_1_15 },
							{
								validator: addressValidator,
							},
						]}
					>
						<Input disabled={isUpdate} />
					</Form.Item>
					<Form.Item
						name='total_sold_coin'
						className='mb-22'
						label='Total Sold Coin'
						rules={[
							{ required: true, message: MessageValidations.MSC_1_15 },
							handlerTotalSoldCoinChangeRules,
						]}
						initialValue={tokenInfo?.total_sold_coin}
					>
						<NumericInput
							disabled={isUpdate}
							key='total_sold_coin'
							className=''
							suffix=''
							value={totalSoldCoin}
							onChange={setTotalSoldCoin}
						/>
					</Form.Item>
				</Form>
			</div>
		</Card>
	);
}
