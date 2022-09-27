import { Modal, Form } from 'antd';
import DatePicker from 'src/modules/common/components/DatePicker';
import {
	DataClaimConfig,
	MessageValidations,
	FORMAT_DATETIME_SALEROUND,
} from './types';
import NumericInput from './NumericInput';
import { useState } from 'react';
import dayjs from 'dayjs';

interface DialogClaimConfigProps {
	open: boolean;
	isUpdate: boolean;
	selectedValue: DataClaimConfig;
	onClose: (value: DataClaimConfig, isStatusCreate: number) => void;
}

export default function DialogClaim(props: DialogClaimConfigProps) {
	const { onClose, selectedValue, open, isUpdate } = props;

	const [form] = Form.useForm();
	const [ipMaxclaim, setIpMaxClaim] = useState<string>('');

	const handleClose = () => {
		form.resetFields();
		onClose(
			{
				max_claim: 0,
				start_time: 0,
			},
			-1
		);
	};

	const handlerSubmit = () => {
		form.submit();
	};

	const handlerFinish = async (values: {
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		claim_start_time: any;
		max_claim: number;
	}) => {
		await onClose(
			{
				max_claim: values.max_claim || 10000,
				start_time: values.claim_start_time.unix(),
			},
			1
		);
		form.resetFields();
	};

	return (
		<Modal
			closable={false}
			centered
			open={open}
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
						{isUpdate ? 'Edit claim' : 'Create a claim'}
					</div>
					<div>{selectedValue.start_time}</div>
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
							rules={[{ required: true, message: MessageValidations.MSC_1_15 }]}
							initialValue={isUpdate && dayjs.unix(selectedValue.start_time)}
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
							rules={[{ required: true, message: MessageValidations.MSC_1_15 }]}
							initialValue={isUpdate ? selectedValue.max_claim : ipMaxclaim}
						>
							<NumericInput
								className='ipdl-claim-max'
								suffix=''
								value={ipMaxclaim}
								onChange={setIpMaxClaim}
							/>
						</Form.Item>
					</Form>
					<div className='d-flex dl-claim-btn-bot'>
						<div
							onClick={handlerSubmit}
							className='btn-sale-round-create btn-apply d-flex align-items-center justify-content-center'
						>
							<span>Apply</span>
						</div>
						<div
							className='btn-sale-round-cancel btn-cancel d-flex align-items-center justify-content-center'
							onClick={handleClose}
						>
							<span>Cancel</span>
						</div>
					</div>
				</div>
			</div>
		</Modal>
	);
}
