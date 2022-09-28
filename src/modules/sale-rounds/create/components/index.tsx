import './scss/SaleRoundCreate.style.scss';
import './scss/DialogClaim.style.scss';

import Generalinfor from './Generalinfor';
import SrDetails from './SrDetails';
import SrClaimConfig from './SrClaimConfig';
import ExchangeRate from './ExchangeRate';
import BoxTime from './BoxTime';
import AboutSaleRaound from './AboutSaleRaound';
import ListUser from './ListUser';
import { Col, Row, Form } from 'antd';
import {
	ISaleRoundCreateForm,
	SaleRoundCreateForm,
	rowsTableClaim,
} from './types';
import { useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import { PATHS } from '@common/constants/paths';
import { MessageValidations } from './types';
import {
	useCreateSaleRound,
	useUpdateSaleRound,
	useUpdateSaleRoundDeployed,
} from './services/saleRoundUpdate';
import { useSaleRoundGetDetail } from './services/saleRoundGetDetail';
import { usePresalePoolContract } from '@web3/contracts';
import { useActiveWeb3React } from '@web3/hooks';
import { message } from '@common/components';
import BigNumber from 'bignumber.js';
import { Loading } from '@common/components';

export default function SaleRoundList() {
	const { account } = useActiveWeb3React();
	const tokenContract = usePresalePoolContract();
	const { createSaleRound } = useCreateSaleRound();
	const { updateSaleRound } = useUpdateSaleRound();
	const { updateSaleRoundDeployed } = useUpdateSaleRoundDeployed();
	const [_idSaleRound, setIdSaleRound] = useState<number>();

	const { id } = useParams<{ id: string }>();
	const idSaleRoundUpdate = id as string;

	const { data, isLoading } = useSaleRoundGetDetail(id);

	const isUpdateSaleRound = useMemo(() => {
		if (data && data.status === 'deployed') return true;
		return false;
	}, [isLoading]);

	const navigate = useNavigate();
	const [saleroundForm, setSaleroundForm] = useState<ISaleRoundCreateForm>({
		name: '',
		details: {
			network: 'BSC',
			buy_limit: 0,
		},
		claim_configs: [
			{
				start_time: 1,
				max_claim: 2,
			},
		],
		have_list_user: true,
		description: '',
		token_info: {
			address: '',
			total_sold_coin: 0,
		},
		buy_time: {
			start_time: 0,
			end_time: 0,
		},
		exchange_rate: 0,
	});
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	let debounceCreate: any;

	const [claimConfig, setClaimConfig] = useState<rowsTableClaim[]>([]);
	const [messageErrClaimConfig, setMessageErrClaimConfig] =
		useState<string>('');
	const [isEvryCanJoin, setEveryCanJoin] = useState<boolean>(false);

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
				await updateSaleRound({
					...data,
					_id: idSaleRoundUpdate,
				});
				return;
			}

			const response = await createSaleRound(data);

			if (response) {
				setIdSaleRound(response.sale_round);
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
				buy_limit: 0,
			},
			claim_configs: [
				{
					start_time: 0,
					max_claim: 0,
				},
			],
			have_list_user: isEvryCanJoin,
			description: '',
			token_info: {
				address: '',
				total_sold_coin: 0,
			},
			buy_time: {
				start_time: 0,
				end_time: 0,
			},
			exchange_rate: 1,
		};

		await formsSaleRound[SaleRoundCreateForm.GENERAL_INFOR]
			.validateFields()
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			.then((data: any) => {
				payload = {
					...payload,
					name: data.name,
				};
			})
			.catch(() => {
				satusValidate = false;
			});

		await formsSaleRound[SaleRoundCreateForm.SR_ABOUNT]
			.validateFields()
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			.then((data: any) => {
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
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			.then((data: any) => {
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
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			.then((data: any) => {
				payload.details.network = data.network;
				payload.details.buy_limit = data.buyLimit || 0;
				payload.token_info.address = data.address;
				payload.token_info.total_sold_coin = Number(data.total_sold_coin);
			})
			.catch(() => {
				satusValidate = false;
			});

		await formsSaleRound[SaleRoundCreateForm.SR_EXCHANGE_RATE]
			.validateFields()
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			.then((data: any) => {
				payload.exchange_rate = (1 / Number(data.ex_rate_get)) | 1;
			})
			.catch(() => {
				satusValidate = false;
			});

		if (!satusValidate)
			return {
				statusValidateForm: satusValidate as boolean,
				data: payload as ISaleRoundCreateForm,
			};

		let claim_configs: {
			start_time: number;
			max_claim: number;
		}[] = [];
		let totalMaxClaim = 0;
		claimConfig.forEach((el) => {
			claim_configs.push({
				start_time: Number(el.startTime),
				max_claim: Number(el.maxClaim) * 100,
			});

			totalMaxClaim += Number(el.maxClaim);
		});
		claim_configs = claim_configs.sort((a, b) => a.start_time - b.start_time);
		if (claimConfig.length === 0) {
			claim_configs.push({
				start_time: payload.buy_time.start_time + 10,
				max_claim: 10000,
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
		if (!tokenContract || !account || !_idSaleRound) {
			return;
		}

		await tokenContract
			.deployNewSalePhase(
				_idSaleRound,
				saleroundForm.buy_time.start_time,
				saleroundForm.buy_time.end_time,
				saleroundForm.claim_configs.map((el) => el.start_time),
				saleroundForm.claim_configs.map((el) => el.max_claim),
				saleroundForm.details.buy_limit === 0 ? true : false,
				BigNumber(saleroundForm.details.buy_limit)
					.times(BigNumber(10).pow(18))
					.toNumber(),
				saleroundForm.exchange_rate,
				saleroundForm.token_info.total_sold_coin,
				saleroundForm.token_info.address
			)
			.then(() => {
				message.error('Deploy success');
				handlerResetForm();
			})
			.catch(() => {
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
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			.then((data: any) => {
				name = data.name;
			})
			.catch(() => {
				satusValidate = false;
			});
		await formsSaleRound[SaleRoundCreateForm.SR_ABOUNT]
			.validateFields()
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			.then((data: any) => {
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
	};

	if (isLoading) {
		return <Loading />;
	}

	return (
		<>
			<div className='sale-round-container'>
				<div className='pb-62'>
					<div
						className='btn-sale-round-create btn-back d-flex align-items-center justify-content-center'
						onClick={() => navigate(PATHS.saleRounds.list())}
					>
						<span>Back</span>
					</div>
				</div>
				<div className='sale-round-mid'>
					<Form.Provider>
						<Row gutter={41}>
							<Col span={12}>
								<div className='w-100'>
									<Generalinfor
										key={data?.name}
										isUpdate={isUpdateSaleRound}
										form={formsSaleRound[SaleRoundCreateForm.GENERAL_INFOR]}
										srName={data?.name}
									/>
								</div>
								<div className='w-100 pt-42'>
									<SrClaimConfig
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
								<ListUser
									isUpdated={idSaleRoundUpdate}
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
						<div
							className='btn-deploy btn-deploy-round d-flex align-items-center justify-content-center cursor-pointer mr-41'
							onClick={handlerSubmitDeploy}
						>
							<span>Deploy the round</span>
						</div>
					)}
					{!isDisableBtnAfterCreate && (
						<div
							className='btn-sale-round-create btn-update-round d-flex align-items-center justify-content-center'
							onClick={handlerSubmitUpdate}
						>
							<span>
								{isUpdateSaleRound ? 'Update the Round' : 'Create the round'}
							</span>
						</div>
					)}
				</div>
			</div>
		</>
	);
}
