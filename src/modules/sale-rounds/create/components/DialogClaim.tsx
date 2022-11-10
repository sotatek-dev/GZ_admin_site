import { Modal, Form } from 'antd';
import DatePicker from 'src/modules/common/components/DatePicker';
import {
	DataClaimConfig,
	FORMAT_DATETIME_SALEROUND,
	rowsTableClaim,
} from './types';
import { MessageValidations } from '@common/constants/messages';
import NumericInput from './NumericInput';
import { useMemo, useState } from 'react';
import dayjs from 'dayjs';
import { Button } from '@common/components';

interface DialogClaimConfigProps {
	open: boolean;
	selectedValue: rowsTableClaim;
	onClose: () => void;
	onCreate: (value: DataClaimConfig) => void;
	onUpdate: (value: rowsTableClaim) => void;
}

export default function DialogClaim(props: DialogClaimConfigProps) {
	const { onClose, onCreate, onUpdate, selectedValue, open } = props;

	const { id, maxClaim, startTime } = selectedValue;
	const handlerEdit = useMemo(
		() => (startTime ? true : false),
		[startTime, open]
	);

	const [form] = Form.useForm();
	const [ipMaxclaim, setIpMaxClaim] = useState<string>(maxClaim);

	const handleClose = () => {
		form.resetFields();
		onClose();
	};

	const handlerSubmit = () => {
		form.submit();
	};

	const handlerMaxClaimChangeRules = () => ({
		validator(_: unknown, value: string) {
			if (value && (Number(value) <= 0 || Number(value) > 100))
				return Promise.reject(
					new Error('Please enter a valid number between 1 and 100')
				);
			return Promise.resolve();
		},
	});

	const handlerFinish = (values: {
		claim_start_time: dayjs.Dayjs;
		max_claim: string;
	}) => {
		if (!handlerEdit) {
			onCreate({
				max_claim: values.max_claim || '10000',
				start_time: values.claim_start_time.unix(),
			});
		} else {
			onUpdate({
				id,
				maxClaim: values.max_claim || '10000',
				startTime: values.claim_start_time.unix(),
			});
		}
		form.resetFields();
	};

	return (
		<>
			<Modal
				closable={false}
				centered
				open={open || handlerEdit}
				onCancel={handleClose}
				width={408}
				footer={null}
				bodyStyle={{
					padding: '0px',
				}}
				maskStyle={{
					borderRadius: '15px',
				}}
			>
				<div className='Dialog-claim'>
					<div className='Dialog-claim-contents'>
						<div className='dl-claim-title'>
							{handlerEdit ? 'Edit claim' : 'Create a claim'}
						</div>
						<Form
							form={form}
							layout='vertical'
							name='srDialogClaim'
							onFinish={handlerFinish}
						>
							<Form.Item
								name='claim_start_time'
								label='Start Time'
								className='pt-16'
								rules={[
									{ required: true, message: MessageValidations.MSC_1_15 },
								]}
								initialValue={(handlerEdit && dayjs.unix(startTime)) || ''}
							>
								<DatePicker
									format={FORMAT_DATETIME_SALEROUND}
									className='dialog-claim-datetime'
									showTime
								/>
							</Form.Item>
							<Form.Item
								name='max_claim'
								label='Max Claim (%)'
								className='pt-33'
								rules={[
									{ required: true, message: MessageValidations.MSC_1_15 },
									handlerMaxClaimChangeRules,
								]}
								initialValue={maxClaim || ''}
							>
								<NumericInput
									disabled={false}
									className='ipdl-claim-max'
									suffix=''
									regex={/^\d{0,10}(\.\d{0,2})?$/}
									value={ipMaxclaim}
									onChange={setIpMaxClaim}
								/>
							</Form.Item>
						</Form>
						<div className='d-flex dl-claim-btn-bot'>
							<Button
								onClick={handlerSubmit}
								className='d-flex align-items-center justify-content-center'
							>
								<span>{!handlerEdit ? 'Create' : 'Update'}</span>
							</Button>
							<Button
								danger
								className='d-flex align-items-center justify-content-center'
								onClick={handleClose}
							>
								<span>Cancel</span>
							</Button>
						</div>
					</div>
				</div>
			</Modal>
		</>
	);
}
