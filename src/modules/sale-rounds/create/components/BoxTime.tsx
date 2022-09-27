import './scss/BoxTime.style.scss';
import { Form } from 'antd';
import DatePicker from 'src/modules/common/components/DatePicker';

import { MessageValidations, FORMAT_DATETIME_SALEROUND } from './types';
import dayjs from 'dayjs';
import type { FormInstance } from 'antd/es/form/Form';

export default function SaleRoundBoxTime(props: { form: FormInstance }) {
	const { form } = props;

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	const handlerStartDateChange = ({ getFieldValue }: any) => ({
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		validator(_: any, value: any) {
			if (value && dayjs() > value)
				return Promise.reject(
					new Error('Start buy time must be after current')
				);
			if (
				!value ||
				!getFieldValue('end_time') ||
				getFieldValue('end_time') >= value
			) {
				return Promise.resolve();
			}
			return Promise.reject(
				new Error('Start buy time must before End buy time')
			);
		},
	});

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	const handlerEndDateChange = ({ getFieldValue }: any) => ({
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		validator(_: any, value: any) {
			if (value && dayjs() > value)
				return Promise.reject(new Error('End buy time must be after current'));
			if (
				!value ||
				!getFieldValue('start_time') ||
				getFieldValue('start_time') < value
			) {
				return Promise.resolve();
			}
			return Promise.reject(
				new Error('Start buy time must before End buy time')
			);
		},
	});

	return (
		<>
			<div className='sr-block-contents'>
				<div className='sale-round-title sr-datetime-title--h'>
					Start/End Buy Time
				</div>
				<div className='pt-5 px-20 sr-datetime-showip--h'>
					<Form
						form={form}
						layout='vertical'
						name='srBoxTimeForm'
						className='d-flex w-100'
					>
						<Form.Item
							name='start_time'
							className='w-100 pr-20'
							label='Start Buy Time'
							rules={[
								{ required: true, message: MessageValidations.MSC_1_15 },
								handlerStartDateChange,
							]}
						>
							<DatePicker
								className='ip-box-datetime'
								format={FORMAT_DATETIME_SALEROUND}
								showTime
							/>
						</Form.Item>
						<Form.Item
							name='end_time'
							className='w-100 pl-20'
							label='End Buy Time'
							rules={[
								{ required: true, message: MessageValidations.MSC_1_15 },
								handlerEndDateChange,
							]}
						>
							<DatePicker
								format={FORMAT_DATETIME_SALEROUND}
								className='ip-box-datetime'
								showTime
							/>
						</Form.Item>
					</Form>
				</div>
			</div>
		</>
	);
}
