import './scss/BoxTime.style.scss';
import { DatePicker, Form } from 'antd';
import { ISRBoxTimeProps } from './types';

export default function SaleRoundBoxTime(props: ISRBoxTimeProps) {
	const { form } = props;
	return (
		<>
			<div className='sr-block-contents'>
				<div className={'sale-round-title sr-datetime-title--h'}>
					Start/End Buy Time
				</div>
				<div className='pt-5 px-20 sr-datetime-showip--h'>
					<Form
						form={form}
						layout='vertical'
						name='srExchangeRate'
						className='d-flex w-100'
					>
						<Form.Item
							name='start_time'
							className='w-100 pr-20'
							label='Start Buy Time'
							rules={[{ required: true }]}
						>
							<DatePicker
								className={'ip-box-datetime'}
								renderExtraFooter={() => 'extra footer'}
								showTime
							/>
						</Form.Item>
						<Form.Item
							name='end_time'
							className='w-100 pl-20'
							label='End Buy Time'
							rules={[{ required: true }]}
						>
							<DatePicker
								className={'ip-box-datetime'}
								renderExtraFooter={() => 'extra footer'}
								showTime
							/>
						</Form.Item>
					</Form>
				</div>
			</div>
		</>
	);
}
