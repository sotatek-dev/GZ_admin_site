import { Modal } from 'antd';

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
			title='Modal 1000px width'
			centered
			open={open}
			onCancel={handleClose}
			width={1000}
		>
			<div className='Dialog-claim'>
				<div className='Dialog-claim-contents'>
					<div className='dl-claim-title'>Edit claim</div>
					<div>
						<div>111</div>
						<div></div>
					</div>
					<div>box 2</div>
					<div className='d-flex'>
						<div>btn1</div>
						<div onClick={handleClose}>btn2</div>
					</div>
				</div>
			</div>
		</Modal>
	);
}
