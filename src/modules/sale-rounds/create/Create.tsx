import './components/scss/SaleRoundCreate.style.scss';
import './components/scss/DialogClaim.style.scss';

import Generalinfor from './components/Generalinfor';
import SrDetails from './components/SrDetails';
import SrClaimConfig from './components/SrClaimConfig';
import ExchangeRate from './components/ExchangeRate';
import BoxTime from './components/BoxTime';
import AboutSaleRaound from './components/AboutSaleRaound';
import ListUser from './components/ListUser';
import { Col, Row, Form } from 'antd';
import { useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import { PATHS } from '@common/constants/paths';
import {
	MessageValidations,
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
import { useSaleRoundGetDetail } from './components/services/saleRoundGetDetail';
import { usePresalePoolContract } from '@web3/contracts';
import { useActiveWeb3React } from '@web3/hooks';
import { message } from '@common/components';
import BigNumber from 'bignumber.js';
import { Loading, Button } from '@common/components';
import dayjs from 'dayjs';

export default function SaleRoundList() {
	const { account } = useActiveWeb3React();
	const tokenContract = usePresalePoolContract();
	const { createSaleRound } = useCreateSaleRound();
	const { updateSaleRound } = useUpdateSaleRound();
	const { updateSaleRoundDeployed } = useUpdateSaleRoundDeployed();
	const [_idSaleRound, setIdSaleRound] = useState<number>();
	const [isEvryCanJoin, setEveryCanJoin] = useState<boolean>(true);
	const [_idSaleRoundAfterCreate, setIdSaleRoundAfterCreate] =
		useState<string>();

	const { id } = useParams<{ id: string }>();
	const idSaleRoundUpdate = id as string;

	const { data, isLoading } = useSaleRoundGetDetail(id);

	const isUpdateSaleRound = useMemo(() => {
		if (data && data.status === 'deployed') return true;
		return false;
	}, [isLoading]);

	const navigate = useNavigate();
	const [saleroundForm, setSaleroundForm] = useState<ISaleRoundCreateForm>();
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	let debounceCreate: any;

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

	const handlerSubmitUpdate = async () => {
		clearTimeout(debounceCreate);
		debounceCreate = setTimeout(async () => {
			if (isUpdateSaleRound) {
				await handlerUpdateSaleRound();
				return;
			}

			const { statusValidateForm, data } = await handlerFnDebouceCreate();
			if (!statusValidateForm) return;

			if (idSaleRoundUpdate) {
				const response = await updateSaleRound({
					...data,
					_id: idSaleRoundUpdate,
				});

				if (response) {
					setIdSaleRound(response.sale_round);
				}
				return;
			}

			const response = await createSaleRound(data);

			if (response) {
				setIdSaleRound(response.sale_round);
				setIdSaleRoundAfterCreate(response._id);
			}
		}, 500);
	};

	const handlerFnDebouceCreate = async (): Promise<{
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
			details: {
				network: '',
				buy_limit: '0',
			},
			claim_configs: [
				{
					start_time: 0,
					max_claim: '0',
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
			.then((data: SaleRoundDetailsType) => {
				payload = {
					...payload,
					name: data.name || '',
				};
			})
			.catch(() => {
				satusValidate = false;
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
			.then((data: { end_time: dayjs.Dayjs; start_time: dayjs.Dayjs }) => {
				payload = {
					...payload,
					buy_time: {
						start_time: data.start_time.unix(),
						end_time: data.end_time.unix(),
					},
				};
			})
			.catch(() => {
				satusValidate = false;
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
			});

		await formsSaleRound[SaleRoundCreateForm.SR_EXCHANGE_RATE]
			.validateFields()
			.then((data: SaleRoundExchangeRateType) => {
				payload.exchange_rate = data.ex_rate_have;
			})
			.catch(() => {
				satusValidate = false;
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
			return {
				statusValidateForm: false,
				data: payload as ISaleRoundCreateForm,
			};
		} else setMessageErrClaimConfig('');

		claim_configs = claim_configs.sort((a, b) => a.start_time - b.start_time);

		// if claimConfig is null then auto create default start time after end buy time and max claim is 10000
		if (claimConfig.length === 0) {
			claim_configs.push({
				start_time: payload.buy_time.end_time + 10,
				max_claim: '10000',
			});
			totalMaxClaim = 100;
		}

		if (totalMaxClaim < 100 || totalMaxClaim > 100) {
			setMessageErrClaimConfig(MessageValidations.MSC_1_16);
			return {
				statusValidateForm: false,
				data: payload as ISaleRoundCreateForm,
			};
		} else setMessageErrClaimConfig('');

		payload.claim_configs = claim_configs;

		await setSaleroundForm(payload);

		return {
			statusValidateForm: true,
			data: payload as ISaleRoundCreateForm,
		};
	};

	const handlerResetForm = () => {
		formsSaleRound[SaleRoundCreateForm.GENERAL_INFOR].resetFields();
		formsSaleRound[SaleRoundCreateForm.SR_ABOUNT].resetFields();
		formsSaleRound[SaleRoundCreateForm.SR_BOX_TIME].resetFields();
		formsSaleRound[SaleRoundCreateForm.SR_DETAIL].resetFields();
		formsSaleRound[SaleRoundCreateForm.SR_EXCHANGE_RATE].resetFields();
	};

	const handlerSubmitDeploy = async () => {
		if (!tokenContract || !account || !_idSaleRound || !saleroundForm) {
			return;
		}

		await tokenContract
			.deployNewSalePhase(
				_idSaleRound,
				saleroundForm.buy_time.start_time,
				saleroundForm.buy_time.end_time,
				saleroundForm.claim_configs.map((el) => el.start_time),
				saleroundForm.claim_configs.map((el) => el.max_claim),
				saleroundForm.details.buy_limit === '0' ? true : false,
				new BigNumber(saleroundForm.details.buy_limit.replace(/,/g, ''))
					.times(1e18)
					.toString(),
				new BigNumber(saleroundForm.exchange_rate.replace(/,/g, ''))
					.times(1e18)
					.toString(),
				new BigNumber(
					saleroundForm.token_info.total_sold_coin.replace(/,/g, '')
				)
					.times(1e18)
					.toString(),
				saleroundForm.token_info.address
			)
			.then(() => {
				message.success('Deploy success');
				handlerResetForm();
				navigate(PATHS.saleRounds.list());
			})
			.catch((err: unknown) => {
				// eslint-disable-next-line no-console
				console.log(err);

				message.error('Deploy failed');
			});
	};

	const handlerUpdateSaleRound = async () => {
		formsSaleRound[SaleRoundCreateForm.SR_ABOUNT].submit();
		let description = '';
		let satusValidate = true;
		let name = '';
		await formsSaleRound[SaleRoundCreateForm.GENERAL_INFOR]
			.validateFields()
			.then((data: { name: string }) => {
				name = data.name;
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

		if (!satusValidate) return;

		await updateSaleRoundDeployed({
			description,
			name,
			_id: idSaleRoundUpdate,
		});

		navigate(PATHS.saleRounds.list());
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
									/>
								</div>
								<div className='w-100 pt-42'>
									<SrClaimConfig
										key='SrClaimConfig'
										isUpdate={isUpdateSaleRound}
										data={data?.claim_configs || []}
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
										form={formsSaleRound[SaleRoundCreateForm.SR_EXCHANGE_RATE]}
									/>
								</div>
								<div className='pt-19'>
									<BoxTime
										isUpdate={isUpdateSaleRound}
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
					{!isUpdateSaleRound && (
						<Button
							danger
							className='btn-deploy-round d-flex align-items-center justify-content-center mr-41'
							onClick={handlerSubmitDeploy}
						>
							<span>Deploy the round</span>
						</Button>
					)}
					{!isDisableBtnAfterCreate && (
						<Button
							className='btn-update-round d-flex align-items-center justify-content-center'
							onClick={handlerSubmitUpdate}
						>
							<span>
								{idSaleRoundUpdate ? 'Update the Round' : 'Create the round'}
							</span>
						</Button>
					)}
				</div>
			</div>
		</>
	);
}
