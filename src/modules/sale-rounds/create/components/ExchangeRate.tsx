import './scss/ExchangeRate.style.scss';
import arrowLeft from './icons/arrow-left-icon.svg';
import { MessageValidations } from './types';
import { useState } from 'react';
import NumericInputGet from './NumericInput';
import type { FormInstance } from 'antd/es/form/Form';
import { Card, Form, Input } from '@common/components';
import BigNumber from 'bignumber.js';

interface ExchangeRatePropsForm {
	form: FormInstance;
	ex_rate_get: string | undefined;
	isUpdate: boolean;
}

const handlerYouGetChange = () => ({
	validator(_: unknown, value: string) {
		if (value && new BigNumber(value).gt(0)) return Promise.resolve();
		if (value && !Number(value))
			return Promise.reject(new Error('Must be geater than 0'));
		return Promise.reject();
	},
});

export default function SaleRoundExchangeRate(props: ExchangeRatePropsForm) {
	const { form, ex_rate_get, isUpdate } = props;

	const [getRates, setGetRates] = useState<string>('');

	return (
		<Card title='Exchange Rates'>
			<div className='pt-16 px-20 sr-exchangerate-showip--h'>
				<Form
					form={form}
					layout='vertical'
					name='srExchangeRate'
					className='d-flex w-100'
				>
					<Form.Item
						name='ex_rate_have'
						className='w-45'
						label='You have'
						initialValue='1'
					>
						<Input disabled className='ip-sr-exchange-rate' suffix='BUSD' />
					</Form.Item>
					<div className='pt-31 icon-arrow-exchange'>
						<img src={arrowLeft} alt='' />
					</div>
					<Form.Item
						name='ex_rate_get'
						className='w-45'
						label='You get'
						rules={[
							{ required: true, message: MessageValidations.MSC_1_15 },
							handlerYouGetChange,
						]}
						initialValue={
							ex_rate_get
								? new BigNumber(1).div(new BigNumber(ex_rate_get)).toString()
								: '0.00'
						}
					>
						<NumericInputGet
							disabled={isUpdate}
							className='ip-sr-exchange-rate'
							suffix={<div>GXZ</div>}
							value={getRates}
							onChange={setGetRates}
						/>
					</Form.Item>
				</Form>
			</div>
		</Card>
	);
}
