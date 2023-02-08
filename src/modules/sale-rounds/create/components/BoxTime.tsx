import './scss/BoxTime.style.scss';
import DatePicker from 'src/modules/common/components/DatePicker';
import { Card, Form } from '@common/components';
import { FORMAT_DATETIME_SALEROUND } from './types';
import { MessageValidations } from '@common/constants/messages';
import dayjs from 'dayjs';
import type { FormInstance } from 'antd/es/form/Form';
import { Checkbox } from 'antd';
import { useState } from 'react';

interface SaleRoundBoxTimeProps {
	isUpdate: boolean;
	isBuyTime: boolean;
	startTime: number;
	endTime: number;
	endBuyTimePrevious?: string;
	form: FormInstance;
}

export default function SaleRoundBoxTime(props: SaleRoundBoxTimeProps) {
	const { form, startTime, endTime, isUpdate, isBuyTime } = props;
	const [checkedBuyTime, setCheckedBuyTime] = useState(isBuyTime ?? false);
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
	const handleObBlurStartTime = (e: React.FocusEvent<HTMLInputElement>) => {
		const isFormat = dayjs(
			e.target.value,
			FORMAT_DATETIME_SALEROUND,
			true
		).isValid();
		if (form.getFieldValue('start_time') && !isFormat) {
			form.setFieldValue('start_time', '');
		}
	};

	const handleObBlurEndTime = (e: React.FocusEvent<HTMLInputElement>) => {
		const isFormat = dayjs(
			e.target.value,
			FORMAT_DATETIME_SALEROUND,
			true
		).isValid();
		if (form.getFieldValue('end_time') && !isFormat) {
			form.setFieldValue('end_time', '');
		}
	};

	return (
		<Card title='Start/End Buy Time'>
			<div className='pt-5 px-20 sr-datetime-showip--h'>
				<Form form={form} layout='vertical' name='srBoxTimeForm'>
					<div className='d-flex w-100'>
						<Form.Item
							name='start_time'
							className='w-100 pr-20'
							label='Start Buy Time'
							rules={[handlerStartDateChange]}
							initialValue={(startTime && dayjs.unix(startTime)) || ''}
						>
							<DatePicker
								disabled={isUpdate}
								onBlur={handleObBlurStartTime}
								format={FORMAT_DATETIME_SALEROUND}
								showTime
							/>
						</Form.Item>
						<Form.Item
							name='end_time'
							className='w-100 pl-20'
							label='End Buy Time'
							rules={[handlerEndDateChange]}
							initialValue={(endTime && dayjs.unix(endTime)) || ''}
						>
							<DatePicker
								disabled={isUpdate}
								onBlur={handleObBlurEndTime}
								format={FORMAT_DATETIME_SALEROUND}
								showTime
							/>
						</Form.Item>
					</div>

					<Form.Item
						name='is_buy_time_hidden'
						valuePropName='checked'
						className='sr-checkbox-buy-time'
					>
						<div className='d-flex'>
							<div className='d-flex align-items-center'>
								<Checkbox
									checked={checkedBuyTime}
									onChange={(e) => setCheckedBuyTime(e.target.checked)}
								/>
							</div>
							<span className='pl-10'>Hide Start Buy Time</span>
						</div>
					</Form.Item>
				</Form>
			</div>
		</Card>
	);
}
