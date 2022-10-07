import './scss/ExchangeRate.style.scss';
import arrowLeft from 'src/assets/icons/arrow-left-icon.svg';
import { MessageValidations } from '@common/helpers/message';
import { Card, Form, Input } from '@common/components';
import { removeComanString } from './services/helper';
import { useState } from 'react';
import type { FormInstance } from 'antd/es/form/Form';
import NumericInputGet from './NumericInput';
import BigNumber from 'bignumber.js';

interface ExchangeRatePropsForm {
	form: FormInstance;
	ex_rate_get: string | undefined;
	isUpdate: boolean;
}

const handlerYouGetChange = () => ({
	validator(_: unknown, value: string) {
		if (value && new BigNumber(removeComanString(value)).gt(0))
			return Promise.resolve();
		if (value && !Number(removeComanString(value)))
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
						rules={[
							{ required: true, message: MessageValidations.MSC_1_15 },
							handlerYouGetChange,
						]}
						initialValue={ex_rate_get || '0.00'}
					>
						<NumericInputGet
							disabled={isUpdate}
							className='ip-sr-exchange-rate'
							suffix={<div>BUSD</div>}
							value={getRates}
							onChange={setGetRates}
						/>
					</Form.Item>
					<div className='pt-31 icon-arrow-exchange'>
						<img src={arrowLeft} alt='' />
					</div>
					<Form.Item
						name='ex_rate_get'
						className='w-45'
						label='You get'
						initialValue='1'
					>
						<Input disabled className='ip-sr-exchange-rate' suffix='GXC' />
					</Form.Item>
				</Form>
			</div>
		</Card>
	);
}
