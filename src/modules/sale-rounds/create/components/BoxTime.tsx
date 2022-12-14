import './scss/BoxTime.style.scss';
import DatePicker from 'src/modules/common/components/DatePicker';
import { Card, Form } from '@common/components';
import { FORMAT_DATETIME_SALEROUND } from './types';
import { MessageValidations } from '@common/constants/messages';
import dayjs from 'dayjs';
import type { FormInstance } from 'antd/es/form/Form';

interface SaleRoundBoxTimeProps {
	isUpdate: boolean;
	startTime: number;
	endTime: number;
	endBuyTimePrevious?: string;
	form: FormInstance;
}

export default function SaleRoundBoxTime(props: SaleRoundBoxTimeProps) {
	const { form, startTime, endTime, isUpdate } = props;

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	const handlerStartDateChange = ({ getFieldValue }: any) => ({
		validator(_: unknown, value: dayjs.Dayjs) {
			if (value && dayjs() > value)
				return Promise.reject(
					new Error('Start buy time must be after current')
				);
			// hidden to test
			// if (endBuyTimePrevious && dayjs.unix(Number(endBuyTimePrevious)) > value)
			// 	return Promise.reject(
			// 		new Error('MessageValidations.MSC_1_33')
			// 	);
			if (
				!value ||
				!getFieldValue('end_time') ||
				getFieldValue('end_time') >= value
			) {
				return Promise.resolve();
			}
			return Promise.reject(new Error(MessageValidations.MSC_1_20));
		},
	});

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	const handlerEndDateChange = ({ getFieldValue }: any) => ({
		validator(_: unknown, value: dayjs.Dayjs) {
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
		<Card title='Start/End Buy Time'>
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
						initialValue={(startTime && dayjs.unix(startTime)) || ''}
					>
						<DatePicker
							disabled={isUpdate}
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
						initialValue={(endTime && dayjs.unix(endTime)) || ''}
					>
						<DatePicker
							disabled={isUpdate}
							format={FORMAT_DATETIME_SALEROUND}
							showTime
						/>
					</Form.Item>
				</Form>
			</div>
		</Card>
	);
}
