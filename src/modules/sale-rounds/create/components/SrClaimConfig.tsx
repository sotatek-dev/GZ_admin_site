import './scss/SrClaimConfig.style.scss';
import { useEffect, useMemo, useState } from 'react';
import DialogClaim from './DialogClaim';
import {
	DataClaimConfig,
	rowsTableClaim,
	FORMAT_DATETIME_SALEROUND,
} from './types';
import dayjs from 'dayjs';
import { Button } from '@common/components';
import { Card } from '@common/components';
import BigNumber from 'bignumber.js';
import { convertHexToNumber } from '@common/helpers/converts';
import { useSalePhaseStatistics } from '../hooks/useGetSalePhase';

interface SaleRoundClaimConfigProps {
	data: {
		max_claim: number;
		start_time: number;
	}[];
	message: string;
	saleRound: number;
	onSubmitClaimConfig: (val: rowsTableClaim[]) => void;
}

function createData(val: rowsTableClaim): rowsTableClaim {
	return val;
}

const initDefaultClaim = () => ({
	id: 0,
	maxClaim: '',
	startTime: 0,
});

const removeItem = (arr: Array<rowsTableClaim>, item: number) =>
	arr.filter((e) => e.id !== item);

export default function SaleRoundClaimConfig(props: SaleRoundClaimConfigProps) {
	const { onSubmitClaimConfig, message, data, saleRound } = props;
	const { data: endBuyTimePrevious } = useSalePhaseStatistics(saleRound);
	const totalClaimedAmount =
		endBuyTimePrevious?.totalClaimedAmount &&
		convertHexToNumber(endBuyTimePrevious?.totalClaimedAmount);

	const [open, setOpen] = useState<boolean>(() => false);
	const [totalMaxClaim, setTotalMaxClaim] = useState<number>(() => 0);
	const [rows, setRows] = useState<Array<rowsTableClaim>>([]);
	const [objectConfig, setobjectConfig] =
		useState<rowsTableClaim>(initDefaultClaim);
	const [idCount, setIdcount] = useState<number>(0);
	useEffect(() => {
		if (data && data.length > 0) {
			let sumTotal = 0;
			const newData = data.map((el, idx) => {
				sumTotal += Number(el.max_claim) / 100;
				return {
					id: idx,
					maxClaim: String(Number(el.max_claim) / 100),
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
		if (!totalClaimedAmount) return;
		setobjectConfig({
			id: val.id,
			maxClaim: val.maxClaim,
			startTime: val.startTime,
		});
	};

	const handlerCreate = (val: DataClaimConfig) => {
		const row: rowsTableClaim = {
			id: idCount,
			startTime: val.start_time,
			maxClaim: val.max_claim,
		};
		rows.push(createData(row));

		setTotalMaxClaim(
			new BigNumber(totalMaxClaim).plus(val.max_claim).toNumber()
		);

		onSubmitClaimConfig(rows);
		setobjectConfig(initDefaultClaim);
		setOpen(false);
		setIdcount(idCount + 1);
	};

	const handlerUpdate = (val: rowsTableClaim) => {
		let _totalMaxClaim = 0;
		rows.forEach((el) => {
			if (el.id === val.id) {
				el.maxClaim = val.maxClaim;
				el.startTime = val.startTime;
			}
			_totalMaxClaim = new BigNumber(_totalMaxClaim)
				.plus(el.maxClaim)
				.toNumber();
		});
		setTotalMaxClaim(_totalMaxClaim);

		onSubmitClaimConfig(rows);
		setobjectConfig(initDefaultClaim);
		setOpen(false);
	};

	const handleClose = () => {
		if (open) {
			setOpen(false);
			return;
		}
		setobjectConfig(initDefaultClaim);
	};
	const handlerRemove = (val: rowsTableClaim) => {
		if (!totalClaimedAmount) return;
		setTotalMaxClaim(Number(totalMaxClaim) - Number(val.maxClaim));
		let newArr = [];
		newArr = removeItem(rows, val.id);
		setRows(newArr);
		onSubmitClaimConfig(newArr);
	};

	const isDisableBtnCreate = useMemo((): boolean => {
		if (totalMaxClaim >= 100) return true;
		return false;
	}, [totalMaxClaim, rows, open]);

	const formatDateTime = (val: number) =>
		dayjs.unix(val).format(FORMAT_DATETIME_SALEROUND);

	return (
		<>
			<Card title='Claim Configuration'>
				<div className='sale-round-contents sr-claimconfig-showip--h'>
					<div className='sr-detail-box-radio'>
						<Button
							id='btn-create-config-claim'
							disabled={isDisableBtnCreate}
							onClick={handleClickOpen}
						>
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
			</Card>
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
