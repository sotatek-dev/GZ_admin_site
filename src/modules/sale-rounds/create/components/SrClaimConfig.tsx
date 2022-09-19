import './scss/SrClaimConfig.style.scss';
import { useState } from 'react';
import DialogClaim from './DialogClaim';

function createData(id: number, startTime: string, maxClaim: number) {
	return { id, startTime, maxClaim };
}

const rows = [
	createData(1, 'Frozen yoghurt', 159),
	createData(2, 'Ice cream sandwich', 237),
	createData(3, 'Eclair', 262),
	createData(4, 'Cupcake', 305),
];

export default function SaleRoundClaimConfig() {
	const [open, setOpen] = useState<boolean>(() => false);
	const [objectConfig, setobjectConfig] = useState<string>(() => '');

	const handleClickOpen = () => {
		setOpen(true);
		setobjectConfig('');
	};

	const handleClickEdit = () => {
		setOpen(true);
		setobjectConfig('ahihi');
	};

	const handleClose = () => {
		setOpen(false);
	};

	return (
		<>
			<div className='sr-block-contents'>
				<div className={'sale-round-title sr-claimconfig-title--h'}>
					Claim Configuration
				</div>
				<div className='sale-round-contents sr-claimconfig-showip--h'>
					<div className={'sr-detail-box-radio'}>
						<div
							className={'btn-sale-round-create btn-claim-create'}
							onClick={handleClickOpen}
						>
							<span>Create</span>
						</div>
					</div>
					<div className='claim-table'>
						<div className='claim-table-header d-flex claim-table-row-style'>
							<div className='td-datetime d-flex align-items-center'>
								<span className='pl-59'>Start Time</span>
							</div>
							<div className='td-maxclaim d-flex align-items-center justify-content-center'>
								<span>Max Claim (%)</span>
							</div>
							<div className='td-actions d-flex align-items-center justify-content-center'>
								<span>Actions</span>
							</div>
						</div>
						<div className='claim-table-body'>
							{rows.map((el, index) => (
								<>
									<div
										key={`table-claim-rows-${index}`}
										className='claim-table-row d-flex claim-table-row-style'
									>
										<div className='td-datetime d-flex align-items-center'>
											<span className='pl-16'>{el.startTime}</span>
										</div>
										<div className='td-maxclaim d-flex align-items-center justify-content-center'>
											<span>{el.maxClaim}</span>
										</div>
										<div className='td-actions d-flex align-items-center justify-content-center'>
											<div className='d-flex align-items-center justify-content-center'>
												<div
													className='pr-16 cursor-pointer'
													onClick={handleClickEdit}
												>
													Edit
												</div>
												<div className='cursor-pointer'>Remove</div>
											</div>
										</div>
									</div>
								</>
							))}
						</div>
					</div>
				</div>
			</div>
			<DialogClaim
				open={open}
				selectedValue={objectConfig}
				onClose={handleClose}
			/>
		</>
	);
}
