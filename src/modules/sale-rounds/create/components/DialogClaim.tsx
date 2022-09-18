import { Modal } from 'antd';
import { DatePicker } from 'antd';
import { Input } from 'antd';

export interface SimpleDialogProps {
	open: boolean;
	selectedValue: string;
	onClose: (value: string) => void;
}

export default function DialogClaim(props: SimpleDialogProps) {
	const { onClose, selectedValue, open } = props;

	const handleClose = () => {
		onClose(selectedValue);
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
					<div className='pt-16'>
						<div className='dialog-claim-contents-title'>Start Time</div>
						<div>
							<DatePicker
								className={'dialog-claim-datetime'}
								renderExtraFooter={() => 'extra footer'}
								showTime
							/>
						</div>
					</div>
					<div className='pt-33 '>
						<div className='dialog-claim-contents-title'>Max Claim (%)</div>
						<div>
							<Input className='ipdl-claim-max' placeholder='Basic usage' />
						</div>
					</div>
					<div className='d-flex dl-claim-btn-bot'>
						<div className='btn-sale-round-create btn-apply d-flex align-items-center justify-content-center'>
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
