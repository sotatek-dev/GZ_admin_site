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
	const [isupdate, setIsUpdate] = useState<boolean>(() => false);
	const [totalMaxClaim, setTotalMaxClaim] = useState<number>(() => 0);
	const [rows, setRows] = useState<Array<rowsTableClaim>>([]);
	const [dialogClaim, setDialogClaim] = useState<Array<rowsTableClaim>>([]);
	const [objectConfig, setobjectConfig] = useState<DataClaimConfig>({
		max_claim: 0,
		start_time: 0,
	});
	const { onSubmitClaimConfig, message } = props;
	const [idCount, setIdcount] = useState<number>(0);

	const handleClickOpen = async () => {
		if (isDisableBtnCreate) return;
		await setobjectConfig({
			max_claim: 0,
			start_time: 0,
		});
		await setIsUpdate(false);
		await setOpen(true);
	};

	const handleClickEdit = async (val: rowsTableClaim) => {
		await setIsUpdate(true);
		await setobjectConfig({
			max_claim: val.maxClaim,
			start_time: dayjs(val.startTime, 'YYYY-MM-DD HH:mm:ss').unix(),
		});
		console.log(
			'objectConfig',
			dayjs(val.startTime, 'YYYY-MM-DD HH:mm:ss').unix()
		);
		setOpen(true);
	};

	const handleClose = async (val: DataClaimConfig, status: number) => {
		setOpen(false);
		if (status === -1) {
			await setobjectConfig({
				max_claim: 0,
				start_time: 0,
			});
			return;
		}

		const row: rowsTableClaim = {
			id: idCount,
			startTime: dayjs.unix(val.start_time).format('YYYY-MM-DD HH:mm:ss'),
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
											<span className='pl-16'>{el.startTime}</span>
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
				open={open}
				isUpdate={isupdate}
				selectedValue={objectConfig}
				onClose={handleClose}
			/>
		</>
	);
}
