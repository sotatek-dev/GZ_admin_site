import './scss/SrClaimConfig.style.scss';
import { useState } from 'react';
import DialogClaim from './DialogClaim';
import { IDataClaimConfig } from './types';
import dayjs from 'dayjs';
import { rowsTableClaim } from './types';

function createData(val: rowsTableClaim): rowsTableClaim {
	return val;
}

const removeItem = (arr: Array<rowsTableClaim>, item: number) =>
	arr.filter((e) => e.id !== item);

export default function SaleRoundClaimConfig(props: {
	onSubmitClaimConfig: (val: rowsTableClaim[]) => void;
}) {
	const [open, setOpen] = useState<boolean>(() => false);
	const [rows, setRows] = useState<Array<rowsTableClaim>>([]);
	const [dialogClaim, setDialogClaim] = useState<Array<rowsTableClaim>>([]);
	const [objectConfig, setobjectConfig] = useState<IDataClaimConfig>(() => ({
		start_time: 0,
		max_claim: 0,
	}));
	const { onSubmitClaimConfig } = props;
	const [idConut, setIdcount] = useState<number>(0);

	const handleClickOpen = () => {
		setOpen(true);
	};

	const handleClickEdit = () => {
		setOpen(true);
	};

	const handleClose = (val: IDataClaimConfig) => {
		setOpen(false);
		if (!val.start_time) return;

		setobjectConfig(val);
		const row: rowsTableClaim = {
			id: idConut,
			startTime: dayjs(val.start_time).format('YYYY-MM-DD HH:mm:ss'),
			maxClaim: val.max_claim,
		};
		rows.push(createData(row));

		const claimData: rowsTableClaim = {
			id: idConut,
			startTime: val.start_time,
			maxClaim: val.max_claim,
		};

		dialogClaim.push(claimData);

		onSubmitClaimConfig(dialogClaim);
		setIdcount(idConut + 1);
	};
	const handlerRemove = (val: number) => {
		setRows(removeItem(rows, val));
		setDialogClaim(removeItem(dialogClaim, val));
		onSubmitClaimConfig(dialogClaim);
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
							{rows.length > 0 &&
								rows.map((el, index) => (
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
												<div
													className='cursor-pointer'
													onClick={() => handlerRemove(el.id)}
												>
													Remove
												</div>
											</div>
										</div>
									</div>
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
