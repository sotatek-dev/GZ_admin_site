import './scss/SrClaimConfig.style.scss';
import { useMemo, useState } from 'react';
import DialogClaim from './DialogClaim';
import { DataClaimConfig, rowsTableClaim } from './types';
import dayjs from 'dayjs';

function createData(val: rowsTableClaim): rowsTableClaim {
	return val;
}

const removeItem = (arr: Array<rowsTableClaim>, item: number) =>
	arr.filter((e) => e.id !== item);

export default function SaleRoundClaimConfig(props: {
	message: string;
	onSubmitClaimConfig: (val: rowsTableClaim[]) => void;
}) {
	const [open, setOpen] = useState<boolean>(() => false);
	const [totalMaxClaim, setTotalMaxClaim] = useState<number>(() => 0);
	const [rows, setRows] = useState<Array<rowsTableClaim>>([]);
	const [dialogClaim, setDialogClaim] = useState<Array<rowsTableClaim>>([]);
	const [objectConfig, setobjectConfig] = useState<rowsTableClaim>({
		id: 0,
		maxClaim: 0,
		startTime: 0,
	});
	const { onSubmitClaimConfig, message } = props;
	const [idCount, setIdcount] = useState<number>(0);

	const handleClickOpen = () => {
		if (isDisableBtnCreate) return;
		setOpen(true);
	};

	const handleClickEdit = (val: rowsTableClaim) => {
		setobjectConfig({
			id: 0,
			maxClaim: val.maxClaim,
			startTime: val.startTime,
		});

		// setOpen(true);
	};

	const handlerCreate = (val: DataClaimConfig) => {
		const row: rowsTableClaim = {
			id: idCount,
			startTime: val.start_time,
			maxClaim: Number(val.max_claim),
		};
		rows.push(createData(row));

		const claimData: rowsTableClaim = {
			id: idCount,
			startTime: val.start_time,
			maxClaim: Number(val.max_claim),
		};

		setTotalMaxClaim(Number(totalMaxClaim) + Number(val.max_claim));

		dialogClaim.push(claimData);

		onSubmitClaimConfig(dialogClaim);
		setIdcount(idCount + 1);
		setobjectConfig({
			id: 0,
			maxClaim: 0,
			startTime: 0,
		});
		setOpen(false);
	};

	const handlerUpdate = (val: rowsTableClaim) => {
		rows.forEach((el) => {
			if (el.id === val.id) {
				el.maxClaim = Number(val.maxClaim);
				el.startTime = val.startTime;
			}
		});
		dialogClaim.forEach((el) => {
			if (el.id === val.id) {
				el.maxClaim = Number(val.maxClaim);
				el.startTime = val.startTime;
			}
		});
		setobjectConfig({
			id: 0,
			maxClaim: 0,
			startTime: 0,
		});
		setOpen(false);
	};

	const handleClose = () => {
		if (open) {
			setOpen(false);
			return;
		}
		setobjectConfig({
			id: 0,
			maxClaim: 0,
			startTime: 0,
		});
	};
	const handlerRemove = (val: rowsTableClaim) => {
		setTotalMaxClaim(Number(totalMaxClaim) - Number(val.maxClaim));

		setRows(removeItem(rows, val.id));
		setDialogClaim(removeItem(dialogClaim, val.id));
		onSubmitClaimConfig(dialogClaim);
	};

	const isDisableBtnCreate = useMemo((): boolean => {
		if (totalMaxClaim >= 100) return true;
		return false;
	}, [totalMaxClaim, rows]);

	const formatDateTime = (val: number) =>
		dayjs.unix(val).format('YYYY-MM-DD HH:mm:ss');

	return (
		<>
			<div className='sr-block-contents'>
				<div className='sale-round-title sr-claimconfig-title--h'>
					Claim Configuration
				</div>
				<div className='sale-round-contents sr-claimconfig-showip--h'>
					<div className='sr-detail-box-radio'>
						<div
							className={`${
								isDisableBtnCreate
									? 'btn-sale-round-disable'
									: 'btn-sale-round-create'
							} btn-claim-create`}
							onClick={handleClickOpen}
						>
							<span>Create</span>
						</div>
						<div className='ant-form-item-explain-error'>{message}</div>
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
											<span className='pl-16'>
												{formatDateTime(el.startTime)}
											</span>
										</div>
										<div className='td-maxclaim d-flex align-items-center justify-content-center'>
											<span>{el.maxClaim}</span>
										</div>
										<div className='td-actions d-flex align-items-center justify-content-center'>
											<div className='d-flex align-items-center justify-content-center'>
												<div
													className='pr-16 cursor-pointer'
													onClick={() => handleClickEdit(el)}
												>
													Edit
												</div>
												<div
													className='cursor-pointer'
													onClick={() => handlerRemove(el)}
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
				key={`${objectConfig.startTime}-${open}`}
				open={open}
				selectedValue={objectConfig}
				onClose={handleClose}
				onCreate={handlerCreate}
				onUpdate={handlerUpdate}
			/>
		</>
	);
}
