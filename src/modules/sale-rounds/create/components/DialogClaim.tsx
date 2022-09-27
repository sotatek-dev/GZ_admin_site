import { Modal, Form } from 'antd';
import DatePicker from 'src/modules/common/components/DatePicker';
import {
	DataClaimConfig,
	MessageValidations,
	FORMAT_DATETIME_SALEROUND,
	rowsTableClaim,
} from './types';
import NumericInput from './NumericInput';
import { useMemo, useState } from 'react';
import dayjs from 'dayjs';

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
	const [ipMaxclaim, setIpMaxClaim] = useState<string>('');

	const handleClose = () => {
		form.resetFields();
		onClose();
	};

	const handlerSubmit = () => {
		form.submit();
	};

	const handlerFinish = (values: {
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		claim_start_time: any;
		max_claim: number;
	}) => {
		if (!handlerEdit) {
			onCreate({
				max_claim: values.max_claim || 10000,
				start_time: values.claim_start_time.unix(),
			});
		} else {
			onUpdate({
				id,
				maxClaim: values.max_claim || 10000,
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
						<div>{startTime}</div>
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
								initialValue={handlerEdit && dayjs.unix(startTime)}
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
								]}
								initialValue={(maxClaim && maxClaim) || ''}
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
		</>
	);
}
