import './scss/SrClaimConfig.style.scss';
import { useEffect, useMemo, useState } from 'react';
import DialogClaim from './DialogClaim';
import { DataClaimConfig, rowsTableClaim } from './types';
import dayjs from 'dayjs';
import { Button } from '@common/components';

interface SaleRoundClaimConfigProps {
	isUpdate: boolean;
	data: {
		max_claim: number;
		start_time: number;
	}[];
	message: string;
	onSubmitClaimConfig: (val: rowsTableClaim[]) => void;
}

function createData(val: rowsTableClaim): rowsTableClaim {
	return val;
}

const removeItem = (arr: Array<rowsTableClaim>, item: number) =>
	arr.filter((e) => e.id !== item);

export default function SaleRoundClaimConfig(props: SaleRoundClaimConfigProps) {
	const { onSubmitClaimConfig, message, data, isUpdate } = props;

	const [open, setOpen] = useState<boolean>(() => false);
	const [totalMaxClaim, setTotalMaxClaim] = useState<number>(() => 0);
	const [rows, setRows] = useState<Array<rowsTableClaim>>([]);
	const [objectConfig, setobjectConfig] = useState<rowsTableClaim>({
		id: 0,
		maxClaim: 0,
		startTime: 0,
	});
	const [idCount, setIdcount] = useState<number>(0);
	useEffect(() => {
		if (data && data.length > 0) {
			let sumTotal = 0;
			const newData = data.map((el, idx) => {
				sumTotal += el.max_claim / 100;
				return {
					id: idx,
					maxClaim: el.max_claim / 100,
					startTime: el.start_time,
				};
			});
			setTotalMaxClaim(sumTotal);
			onSubmitClaimConfig(newData);
			setRows(newData);
			setIdcount(idCount + 1);
		}
	}, [data]);

	const handleClickOpen = () => {
		if (isDisableBtnCreate) return;
		setOpen(true);
	};

	const handleClickEdit = (val: rowsTableClaim) => {
		if (isUpdate) return;
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

		setTotalMaxClaim(Number(totalMaxClaim) + Number(val.max_claim));

		onSubmitClaimConfig(rows);
		setobjectConfig({
			id: 0,
			maxClaim: 0,
			startTime: 0,
		});
		setOpen(false);
		setIdcount(idCount + 1);
	};

	const handlerUpdate = (val: rowsTableClaim) => {
		rows.forEach((el) => {
			if (el.id === val.id) {
				el.maxClaim = Number(val.maxClaim);
				el.startTime = val.startTime;
			}
		});
		onSubmitClaimConfig(rows);
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
		if (isUpdate) return;
		setTotalMaxClaim(Number(totalMaxClaim) - Number(val.maxClaim));
		let newArr = [];
		newArr = removeItem(rows, val.id);
		setRows(newArr);
		onSubmitClaimConfig(newArr);
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
						<Button disabled={isDisableBtnCreate} onClick={handleClickOpen}>
							<span>Create</span>
						</Button>
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
						<div
							key={`claim-table-body-${idCount}`}
							className='claim-table-body'
						>
							{idCount > 0 &&
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
