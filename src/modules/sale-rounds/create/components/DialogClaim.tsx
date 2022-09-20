import { Modal, Form, DatePicker, Input } from 'antd';
import { IDialogClaimConfigProps } from './types';

export default function DialogClaim(props: IDialogClaimConfigProps) {
	const { onClose, selectedValue, open } = props;
	const [form] = Form.useForm();

	const handleClose = () => {
		form.resetFields();
		onClose(selectedValue);
	};

	const handlerSubmit = () => {
		form.submit();
	};

	const handlerFinish = () => {
		const start_time = form.getFieldValue('claim_start_time').format('x');
		const max_claim = form.getFieldValue('max_claim') || 10000;
		onClose({
			max_claim,
			start_time,
		});
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
						{selectedValue ? 'Edit claim' : 'Create a claim'}
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
							rules={[{ required: true }]}
						>
							<DatePicker
								className={'dialog-claim-datetime'}
								renderExtraFooter={() => 'extra footer'}
								showTime
							/>
						</Form.Item>
						<Form.Item
							name='max_claim'
							label='Max Claim (%)'
							className='pt-33'
							rules={[{ required: true }]}
						>
							<Input className='ipdl-claim-max' placeholder='Basic usage' />
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
