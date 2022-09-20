import './scss/ExchangeRate.style.scss';
import arrowLeft from './icons/arrow-left-icon.svg';
import { Input, Form } from 'antd';
import { ISRExchangeRateProps } from './types';

export default function SaleRoundExchangeRate(props: ISRExchangeRateProps) {
	const { form } = props;
	return (
		<>
			<div className='sr-block-contents'>
				<div className={'sale-round-title sr-exchangerate-title--h'}>
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
							rules={[{ required: true }]}
						>
							<Input
								className='ip-sr-exchange-rate'
								suffix='BUSD'
								defaultValue='mysite'
							/>
						</Form.Item>
						<div className='pt-31 icon-arrow-exchange'>
							<img src={arrowLeft} alt='' />
						</div>
						<Form.Item
							name='ex_rate_get'
							className='w-45'
							label='You get'
							rules={[{ required: true }]}
						>
							<Input
								className='ip-sr-exchange-rate'
								addonAfter='GXZ'
								defaultValue='mysite'
							/>
						</Form.Item>
					</Form>
					{/* <div className='w-45'>
						<div className='ip-sale-round-general-label'>
							You have <span className='ip-requirement'>*</span>
						</div>
						<Input
							className='ip-sr-exchange-rate'
							suffix='BUSD'
							defaultValue='mysite'
						/>
					</div> */}
					{/* <div className='pt-31 icon-arrow-exchange'>
						<img src={arrowLeft} alt='' />
					</div>
					<div className='w-45'>
						<div className='ip-sale-round-general-label'>You get</div>
						<Input
							className='ip-sr-exchange-rate'
							addonAfter='GXZ'
							defaultValue='mysite'
						/>
					</div> */}
				</div>
			</div>
		</>
	);
}
