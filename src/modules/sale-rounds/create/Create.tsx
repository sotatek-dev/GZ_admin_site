import './components/scss/SaleRoundCreate.style.scss';
import './components/scss/DialogClaim.style.scss';

import Generalinfor from './components/Generalinfor';
import SrDetails from './components/SrDetails';
import SrClaimConfig from './components/SrClaimConfig';
import ExchangeRate from './components/ExchangeRate';
import BoxTime from './components/BoxTime';
import AboutSaleRaound from './components/AboutSaleRaound';
import ListUser from './components/ListUser';
import { useEffect, useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import { PATHS } from '@common/constants/paths';
import { useSaleRoundGetDetail } from './components/services/saleRoundGetDetail';
import { usePresalePoolContract } from '@web3/contracts';
// import { useGetEndBuyTimePrevious } from '@web3/hooks';message
import { Loading, Button, Col, Row, Form } from '@common/components';
import { useDeploySaleRound } from './components/services/useDeploySaleRound.mutation';
import { MessageValidations } from '@common/constants/messages';
import {
	SaleRoundExchangeRateType,
	SaleRoundDetailsType,
	ISaleRoundCreateForm,
	SaleRoundCreateForm,
	rowsTableClaim,
	DataClaimConfig,
	MAXCLAIM_TO_SC,
} from './components/types';
import {
	useCreateSaleRound,
	useUpdateSaleRound,
	useUpdateSaleRoundDeployed,
} from './components/services/saleRoundUpdate';
import dayjs from 'dayjs';
import { useIsSuperAdmin } from '@common/hooks/useIsSuperAdmin';
import { useUpdateClaimSetting } from './components/services/useUpdateClaimSetting.mutation';
import { message } from '@common/components';

export default function SaleRoundList() {
	const isSuperAdmin = useIsSuperAdmin();
	const tokenContract = usePresalePoolContract();
	// hidden to test
	// const { data: endBuyTimePrevious, isLoading } = useGetEndBuyTimePrevious();
	const { createSaleRound } = useCreateSaleRound();
	const { deploySaleRound, isDeployState } = useDeploySaleRound();
	const { updateClaimSetting, isUpdateClaimSetting, statusUpdateClaimSetting } =
		useUpdateClaimSetting();

	const { updateSaleRound, isUpdateSaleRoundApi } = useUpdateSaleRound();
	const { updateSaleRoundDeployed, isCreateSaleRoundDeployed } =
		useUpdateSaleRoundDeployed();
	const [isEvryCanJoin, setEveryCanJoin] = useState<boolean>(true);
	const [_idSaleRoundAfterCreate, setIdSaleRoundAfterCreate] =
		useState<string>();

	let _idSaleRound = 0;
	let isValidateBtnDeployClick = false;

	const { id } = useParams<{ id: string }>();
	const idSaleRoundUpdate = id as string;

	const { data, isLoading, refetch } = useSaleRoundGetDetail(id);
	const [exchangeRate, setExchangeRate] = useState<string | undefined>();

	const isUpdateSaleRound = useMemo(() => {
		if (data && data.status === 'deployed') return true;
		return false;
	}, [isLoading]);

	const navigate = useNavigate();
	let saleroundForm: ISaleRoundCreateForm;
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	// let debounceCreate: any;

	const [claimConfig, setClaimConfig] = useState<rowsTableClaim[]>([]);
	const [messageErrClaimConfig, setMessageErrClaimConfig] =
		useState<string>('');

	const formsSaleRound = {
		[SaleRoundCreateForm.GENERAL_INFOR]: Form.useForm()[0],
		[SaleRoundCreateForm.SR_DETAIL]: Form.useForm()[0],
		[SaleRoundCreateForm.SR_EXCHANGE_RATE]: Form.useForm()[0],
		[SaleRoundCreateForm.SR_BOX_TIME]: Form.useForm()[0],
		[SaleRoundCreateForm.SR_ABOUNT]: Form.useForm()[0],
	};

	const handlerSubClaimConfig = (val: rowsTableClaim[]) => {
		setClaimConfig(val);
	};

	const isDisableBtnAfterCreate = useMemo(
		() => (_idSaleRound ? true : false),
		[_idSaleRound]
	);

	const handlerSubmitUpdate = async (dataSaleRound?: any) => {
		if (isUpdateSaleRound) {
			// handle update case status deloyed
			// return; // if you use, move it down.
			let isChangeCheckBoxShow = false;
			let isChangeClaim = false;

			const claim_configs: DataClaimConfig[] = [];
			let totalMaxClaim = 0;
			// if claimConfig is null then auto create default start time after end buy time and max claim is 10000
			if (claimConfig.length === 0 && dataSaleRound) {
				const timeAuto = new Date();
				timeAuto.setDate(timeAuto.getDate() + 30);
				claim_configs.push({
					start_time: dataSaleRound.buy_time.end_time
						? Number(dataSaleRound.buy_time.end_time) + 10
						: timeAuto.getTime() / 1000,
					max_claim: '10000',
				});
				totalMaxClaim = 100;
			} else {
				let checkClaimTime = true;

				claimConfig.forEach((item) => {
					if (item.startTime < Number(dataSaleRound.buy_time.end_time)) {
						checkClaimTime = false;
					}
					claim_configs.push({
						start_time: item.startTime,
						max_claim: String(Number(item.maxClaim) * MAXCLAIM_TO_SC),
					});
					totalMaxClaim += Number(item.maxClaim);
				});

				if (!checkClaimTime) {
					setMessageErrClaimConfig(MessageValidations.MSC_1_27);
					location.href = '#btn-create-config-claim';
					return;
				} else setMessageErrClaimConfig('');
			}

			if (totalMaxClaim < 100 || totalMaxClaim > 100) {
				setMessageErrClaimConfig(MessageValidations.MSC_1_16);
				location.href = '#btn-create-config-claim';
				return;
			} else setMessageErrClaimConfig('');

			//handle logic check change claim config
			if (claimConfig.length === 0) {
				isChangeClaim = true;
			} else if (dataSaleRound.claim_configs) {
				for (const element of dataSaleRound.claim_configs) {
					isChangeClaim = !claimConfig.find(
						(item) =>
							Number(item.maxClaim) * 100 === Number(element.max_claim) &&
							item.startTime === element.start_time
					);
					if (isChangeClaim) break;
				}
			}
			if (isChangeClaim) {
				updateClaimSetting({
					claim_configs,
					salePhase: dataSaleRound?.sale_round,
				});
			}
			isChangeCheckBoxShow = await handlerUpdateSaleRound();

			if (!isChangeCheckBoxShow && !isChangeClaim) {
				message.warn(MessageValidations.MSC_3_6);
				return;
			}

			if (!isChangeClaim) {
				navigate(PATHS.saleRounds.list());
				return;
			}
			return;
			isValidateBtnDeployClick = true;
		}
		// case deploy don't send dataSaleRound
		const { statusValidateForm, data } = await handlerFnDebouceCreate(
			dataSaleRound ? false : true
		);
		if (!statusValidateForm) {
			isValidateBtnDeployClick = false;
			return;
		}

		if (idSaleRoundUpdate) {
			const response = await updateSaleRound({
				...data,
				_id: idSaleRoundUpdate || String(_idSaleRoundAfterCreate),
			});

			if (response) {
				_idSaleRound = response.sale_round;
				isValidateBtnDeployClick = true;
				await refetch();
				return;
			}
			isValidateBtnDeployClick = false;
			return;
		}

		const response = await createSaleRound(data);

		if (response) {
			_idSaleRound = response.sale_round;
			setIdSaleRoundAfterCreate(response._id);
			isValidateBtnDeployClick = true;
			navigate(PATHS.saleRounds.list());
		}
		isValidateBtnDeployClick = false;
	};

	useEffect(() => {
		if (statusUpdateClaimSetting === 'success') {
			navigate(PATHS.saleRounds.list());
		}
	}, [statusUpdateClaimSetting]);

	const handlerFnDebouceCreate = async (
		isDeploy: boolean
	): Promise<{
		statusValidateForm: boolean;
		data: ISaleRoundCreateForm;
	}> => {
		formsSaleRound[SaleRoundCreateForm.GENERAL_INFOR].submit();
		formsSaleRound[SaleRoundCreateForm.SR_ABOUNT].submit();
		formsSaleRound[SaleRoundCreateForm.SR_BOX_TIME].submit();
		formsSaleRound[SaleRoundCreateForm.SR_DETAIL].submit();
		formsSaleRound[SaleRoundCreateForm.SR_EXCHANGE_RATE].submit();

		let satusValidate = true;
		let payload = {
			name: '',
			is_hidden: false,
			is_claim_configs_hidden: false,
			is_buy_time_hidden: false,
			details: {
				network: '',
				buy_limit: '0',
			},
			claim_configs: [
				{
					start_time: 0,
					max_claim: '',
				},
			],
			have_list_user: !isEvryCanJoin,
			description: '',
			token_info: {
				address: '',
				total_sold_coin: '0',
			},
			buy_time: {
				start_time: 0,
				end_time: 0,
			},
			exchange_rate: '1',
		};

		await formsSaleRound[SaleRoundCreateForm.GENERAL_INFOR]
			.validateFields()
			.then((dataSaleRound: SaleRoundDetailsType) => {
				payload = {
					...payload,
					name: dataSaleRound.name || '',
					is_hidden: dataSaleRound.is_hidden ?? data?.is_hidden ?? false,
					is_claim_configs_hidden:
						dataSaleRound.is_claim_configs_hidden ??
						data?.is_claim_configs_hidden ??
						false,
				};
			})
			.catch(() => {
				satusValidate = false;
				formsSaleRound[SaleRoundCreateForm.GENERAL_INFOR]
					.getFieldInstance('name')
					?.focus();
			});

		await formsSaleRound[SaleRoundCreateForm.SR_ABOUNT]
			.validateFields()
			.then((data: { description: string }) => {
				payload = {
					...payload,
					description: data.description,
				};
			})
			.catch(() => {
				satusValidate = false;
			});

		await formsSaleRound[SaleRoundCreateForm.SR_BOX_TIME]
			.validateFields()
			.then(
				(dataBuyTime: {
					end_time: dayjs.Dayjs;
					start_time: dayjs.Dayjs;
					is_buy_time_hidden: boolean;
				}) => {
					if (isDeploy && !(dataBuyTime?.start_time && dataBuyTime?.end_time)) {
						if (!dataBuyTime?.start_time) {
							formsSaleRound[SaleRoundCreateForm.SR_BOX_TIME].setFields([
								{
									name: 'start_time',
									errors: [MessageValidations.MSC_1_15],
								},
							]);
						}
						if (!dataBuyTime?.end_time) {
							formsSaleRound[SaleRoundCreateForm.SR_BOX_TIME].setFields([
								{
									name: 'end_time',
									errors: [MessageValidations.MSC_1_15],
								},
							]);
						}
						satusValidate = false;
						if (!dataBuyTime?.start_time) {
							formsSaleRound[SaleRoundCreateForm.SR_BOX_TIME]
								.getFieldInstance('start_time')
								?.focus();
						} else if (!dataBuyTime?.end_time) {
							formsSaleRound[SaleRoundCreateForm.SR_BOX_TIME]
								.getFieldInstance('end_time')
								?.focus();
						}
						return;
					}
					payload = {
						...payload,
						is_buy_time_hidden:
							dataBuyTime.is_buy_time_hidden ??
							data?.is_buy_time_hidden ??
							false,
						buy_time: {
							start_time: dataBuyTime?.start_time
								? dataBuyTime.start_time.unix()
								: 0,
							end_time: dataBuyTime?.end_time ? dataBuyTime.end_time.unix() : 0,
						},
					};
				}
			)
			.catch(() => {
				satusValidate = false;
				formsSaleRound[SaleRoundCreateForm.SR_BOX_TIME]
					.getFieldInstance('start_time')
					?.focus();
			});

		await formsSaleRound[SaleRoundCreateForm.SR_DETAIL]
			.validateFields()
			.then((data: SaleRoundDetailsType) => {
				payload.details.network = data.network || '';
				payload.details.buy_limit = data.buyLimit || '0';
				payload.token_info.address = data.address || '';
				payload.token_info.total_sold_coin = data.total_sold_coin || '';
			})
			.catch(() => {
				satusValidate = false;
				formsSaleRound[SaleRoundCreateForm.SR_DETAIL]
					.getFieldInstance('network')
					?.focus();
			});

		await formsSaleRound[SaleRoundCreateForm.SR_EXCHANGE_RATE]
			.validateFields()
			.then((data: SaleRoundExchangeRateType) => {
				payload.exchange_rate = data.ex_rate_have;
			})
			.catch(() => {
				satusValidate = false;
				formsSaleRound[SaleRoundCreateForm.SR_EXCHANGE_RATE]
					.getFieldInstance('ex_rate_have')
					?.focus();
			});

		if (!satusValidate)
			return {
				statusValidateForm: satusValidate as boolean,
				data: payload as ISaleRoundCreateForm,
			};

		let claim_configs: DataClaimConfig[] = [];

		let checkClaimTime = true;
		let totalMaxClaim = 0;
		claimConfig.forEach((el) => {
			if (el.startTime < payload.buy_time.end_time) {
				checkClaimTime = false;
			}
			// total maxclaim in sc is 10000
			claim_configs.push({
				start_time: Number(el.startTime),
				max_claim: String(Number(el.maxClaim) * MAXCLAIM_TO_SC),
			});

			totalMaxClaim += Number(el.maxClaim);
		});

		if (!checkClaimTime) {
			setMessageErrClaimConfig(MessageValidations.MSC_1_27);
			location.href = '#btn-create-config-claim';
			return {
				statusValidateForm: false,
				data: payload as ISaleRoundCreateForm,
			};
		} else setMessageErrClaimConfig('');

		claim_configs = claim_configs.sort((a, b) => a.start_time - b.start_time);

		// if claimConfig is null then auto create default start time after end buy time and max claim is 10000
		if (claimConfig.length === 0) {
			const timeAuto = new Date();
			timeAuto.setDate(timeAuto.getDate() + 30);
			claim_configs.push({
				start_time: payload.buy_time.end_time
					? payload.buy_time.end_time + 10
					: timeAuto.getTime() / 1000,
				max_claim: '10000',
			});
			totalMaxClaim = 100;
		}

		if (totalMaxClaim < 100 || totalMaxClaim > 100) {
			setMessageErrClaimConfig(MessageValidations.MSC_1_16);
			location.href = '#btn-create-config-claim';
			return {
				statusValidateForm: false,
				data: payload as ISaleRoundCreateForm,
			};
		} else setMessageErrClaimConfig('');

		payload.claim_configs = claim_configs;

		saleroundForm = payload;

		return {
			statusValidateForm: true,
			data: payload as ISaleRoundCreateForm,
		};
	};

	const handlerSubmitDeploy = async () => {
		await handlerSubmitUpdate();

		if (
			!tokenContract ||
			!_idSaleRound ||
			!saleroundForm ||
			!isValidateBtnDeployClick
		) {
			return;
		}

		// if (endBuyTimePrevious && dayjs.unix(Number(endBuyTimePrevious)) > dayjs())
		// 	return message.error(MessageValidations.MSC_3_5);

		await deploySaleRound({
			...saleroundForm,
			salePhase: _idSaleRound,
		});
	};

	const handlerUpdateSaleRound = async () => {
		formsSaleRound[SaleRoundCreateForm.SR_ABOUNT].submit();
		let description = '';
		let satusValidate = true;
		let name = '';
		let is_hidden = false;
		let is_claim_configs_hidden = false;
		let is_buy_time_hidden = false;
		await formsSaleRound[SaleRoundCreateForm.GENERAL_INFOR]
			.validateFields()
			.then(
				(dataRound: {
					name: string;
					is_hidden: boolean;
					is_claim_configs_hidden: boolean;
				}) => {
					name = dataRound.name;
					is_hidden = dataRound.is_hidden ?? data.is_hidden;
					is_claim_configs_hidden =
						dataRound.is_claim_configs_hidden ?? data.is_claim_configs_hidden;
				}
			)
			.catch(() => {
				satusValidate = false;
			});
		await formsSaleRound[SaleRoundCreateForm.SR_BOX_TIME]
			.validateFields()
			.then((dataBuyTime: { is_buy_time_hidden: boolean }) => {
				is_buy_time_hidden =
					dataBuyTime.is_buy_time_hidden ?? data.is_buy_time_hidden;
			})
			.catch(() => {
				satusValidate = false;
			});

		await formsSaleRound[SaleRoundCreateForm.SR_ABOUNT]
			.validateFields()
			.then((data: { description: string }) => {
				description = data.description;
			})
			.catch(() => {
				satusValidate = false;
			});

		if (!satusValidate) return true;
		// handle not update case data sale round info not change
		if (
			data.description === description &&
			data.name === name &&
			data.is_hidden === is_hidden &&
			data.is_claim_configs_hidden === is_claim_configs_hidden &&
			data.is_buy_time_hidden === is_buy_time_hidden
		) {
			return false;
		}

		await updateSaleRoundDeployed({
			description,
			name,
			is_hidden,
			is_claim_configs_hidden,
			is_buy_time_hidden,
			_id: idSaleRoundUpdate,
		});
		return true;
	};

	if (isLoading) {
		return <Loading />;
	}

	return (
		<>
			<div className='sale-round-container'>
				<div className='pb-62'>
					<Button
						className='d-flex align-items-center justify-content-center'
						onClick={() => navigate(PATHS.saleRounds.list())}
					>
						<span>Back</span>
					</Button>
				</div>
				<div className='sale-round-mid'>
					<Form.Provider>
						<Row gutter={41}>
							<Col span={12}>
								<div className='w-100'>
									<Generalinfor
										key='Generalinfor'
										isUpdate={isUpdateSaleRound}
										form={formsSaleRound[SaleRoundCreateForm.GENERAL_INFOR]}
										srName={data?.name}
										isShowClaimDate={data?.is_claim_configs_hidden}
										isSaleRound={data?.is_hidden}
									/>
								</div>
								<div className='w-100 pt-42'>
									<SrClaimConfig
										key='SrClaimConfig'
										isUpdate={isUpdateSaleRound}
										data={data?.claim_configs || []}
										saleRound={data?.sale_round || 0}
										message={messageErrClaimConfig}
										onSubmitClaimConfig={handlerSubClaimConfig}
									/>
								</div>
							</Col>
							<Col span={12}>
								<div>
									<SrDetails
										isUpdate={isUpdateSaleRound}
										tokenInfo={data?.token_info}
										details={data?.details}
										form={formsSaleRound[SaleRoundCreateForm.SR_DETAIL]}
									/>
								</div>
								<div className='pt-15'>
									<ExchangeRate
										isUpdate={isUpdateSaleRound}
										ex_rate_get={data?.exchange_rate}
										setExchangeRate={setExchangeRate}
										form={formsSaleRound[SaleRoundCreateForm.SR_EXCHANGE_RATE]}
									/>
								</div>
								<div className='pt-19'>
									<BoxTime
										isUpdate={isUpdateSaleRound}
										isBuyTime={data?.is_buy_time_hidden}
										startTime={data?.buy_time?.start_time}
										endTime={data?.buy_time?.end_time}
										form={formsSaleRound[SaleRoundCreateForm.SR_BOX_TIME]}
									/>
								</div>
							</Col>
						</Row>
						<Row className='pt-41'>
							<Col span={24}>
								<AboutSaleRaound
									description={data?.description}
									form={formsSaleRound[SaleRoundCreateForm.SR_ABOUNT]}
								/>
							</Col>
						</Row>
						<Row className='pt-41'>
							<Col span={24}>
								{/* if have list use then BE saving is evry can join is False */}
								<ListUser
									idSaleRound={idSaleRoundUpdate || _idSaleRoundAfterCreate}
									isStateCanJoin={data?.have_list_user}
									isUpdated={isUpdateSaleRound}
									exchangeRate={
										idSaleRoundUpdate && exchangeRate != ''
											? exchangeRate
											: !idSaleRoundUpdate && exchangeRate
											? exchangeRate
											: data?.exchange_rate
									}
									isEveryCanJoin={setEveryCanJoin}
								/>
							</Col>
						</Row>
					</Form.Provider>
				</div>
				<div
					className={`d-flex pt-153 ${
						isDisableBtnAfterCreate || isUpdateSaleRound
							? 'justify-content-center'
							: 'justify-content-space'
					}`}
				>
					<Button
						danger
						loading={isDeployState || isUpdateSaleRoundApi}
						disabled={isUpdateSaleRound || !idSaleRoundUpdate}
						className='btn-deploy-round d-flex align-items-center justify-content-center mr-41'
						onClick={handlerSubmitDeploy}
					>
						<span>Deploy the round</span>
					</Button>
					<Button
						className='btn-update-round d-flex align-items-center justify-content-center'
						loading={
							isUpdateSaleRoundApi ||
							isCreateSaleRoundDeployed ||
							isUpdateClaimSetting
						}
						disabled={!isSuperAdmin}
						onClick={() => handlerSubmitUpdate(data)}
					>
						<span>
							{idSaleRoundUpdate ? 'Update the Round' : 'Create the round'}
						</span>
					</Button>
				</div>
			</div>
		</>
	);
}
