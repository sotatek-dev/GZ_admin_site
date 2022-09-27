import './scss/ExchangeRate.style.scss';
import arrowLeft from './icons/arrow-left-icon.svg';
import { Input, Form } from 'antd';
import { MessageValidations } from './types';
import { useState } from 'react';
import NumericInputGet from './NumericInput';
import type { FormInstance } from 'antd/es/form/Form';

interface ExchangeRatePropsForm {
	form: FormInstance;
	ex_rate_get: string;
	isUpdate: boolean;
}

export default function SaleRoundExchangeRate(props: ExchangeRatePropsForm) {
	const { form, ex_rate_get, isUpdate } = props;
	console.log('ex_rate_get', ex_rate_get, isUpdate);

	const [getRates, setGetRates] = useState<string>('11');

	return (
		<div className='sr-block-contents'>
			<div className='sale-round-title sr-exchangerate-title--h'>
				Exchange Rates
			</div>
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
						rules={[{ required: true, message: MessageValidations.MSC_1_15 }]}
						initialValue={isUpdate ? ex_rate_get : ''}
					>
						<NumericInputGet
							className='ip-sr-exchange-rate'
							suffix={<div>GXZ</div>}
							value={getRates}
							onChange={() => setGetRates}
						/>
					</Form.Item>
				</Form>
			</div>
		</div>
	);
}
