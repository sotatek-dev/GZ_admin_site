import './NFTInfo.style.scss';
import type { FormInstance } from 'antd/es/form';
import { Button, Card, Col, Row } from '@common/components';
import {
	MinPhaseLabel,
	MintPhase,
	NFTInfoFormValue,
} from '@settings/nft-mint/types';
import { useDeploySalePhase } from '@settings/nft-mint/services/useDeploySalePhase';
import { useGetCurrentPhase } from '@settings/nft-mint/services/useGetCurrentPhase';
import NFTInfoForm from '../NFTInfoForm';
import { toWei } from '@common/helpers/converts';
import dayjs from 'dayjs';
import { useGetNFTMintUsers } from '@settings/nft-mint/services/useGetNFTMintUsers';
import { DEFAULT_PAGINATION } from '@common/constants/pagination';
import { useIsSuperAdmin } from '@common/hooks/useIsSuperAdmin';
import { removeComanString } from '@common/helpers/formats';
import { useGetLaunchPrice } from '@settings/nft-mint/services/useGetLaunchPrice';

const TAB_LIST = [
	{
		key: MintPhase.WhiteList,
		tab: MinPhaseLabel[MintPhase.WhiteList],
	},
	{
		key: MintPhase.Presale1,
		tab: MinPhaseLabel[MintPhase.Presale1],
	},
	{
		key: MintPhase.Presale2,
		tab: MinPhaseLabel[MintPhase.Presale2],
	},
	{
		key: MintPhase.Launch,
		tab: MinPhaseLabel[MintPhase.Launch],
	},
];

interface Props {
	activePhaseTab: MintPhase;
	form: {
		instance: FormInstance<NFTInfoFormValue>;
		onFinish: (values: NFTInfoFormValue) => void;
	};
	setCurrentPhaseTab: (phase: MintPhase) => void;
}

export default function NFTInfo({
	form,
	activePhaseTab,
	setCurrentPhaseTab,
}: Props) {
	const isSuperAdmin = useIsSuperAdmin();
	const { currentPhase } = useGetCurrentPhase();
	const { deploySalePhase, isDeploySalePhase } = useDeploySalePhase();
	const { data: whiteListedUsers, isFetched } = useGetNFTMintUsers({
		limit: DEFAULT_PAGINATION.limit,
		page: DEFAULT_PAGINATION.page,
		phase: activePhaseTab,
	});
	const { launchPrice } = useGetLaunchPrice();
	const isLaunchPhase = activePhaseTab === MintPhase.Launch;

	const onTabChange = (key: string) => {
		setCurrentPhaseTab(key as MintPhase);
	};

	const handleSetCurrentRound = async () => {
		if (!launchPrice) return;

		try {
			await form.instance.validateFields();

			const {
				nft_mint_limit,
				price,
				price_after_24h,
				mint_time,
				start_mint_time,
			} = form.instance.getFieldsValue();

			const launchPhasePrice = {
				price: toWei(launchPrice),
				price_after_24h: toWei(launchPrice),
			};

			const phasePricing = isLaunchPhase
				? launchPhasePrice
				: {
						price: toWei(removeComanString(price)),
						price_after_24h: toWei(removeComanString(price_after_24h)),
				  };

			const mintTime = {
				start_mint_time: dayjs(
					isLaunchPhase ? start_mint_time : mint_time[0]
				).unix(),
				end_mint_time: isLaunchPhase
					? dayjs(start_mint_time).unix() + 1 // Require if Launch phase, but just need end_mint_time > start_mint_time
					: dayjs(mint_time[1]).unix(),
			};

			deploySalePhase({
				_id: activePhaseTab,
				...phasePricing,
				nft_mint_limit: removeComanString(nft_mint_limit),
				...mintTime,
			});
		} catch {
			return;
		}
	};

	const isShowDeployRoundButton =
		currentPhase != undefined && currentPhase < activePhaseTab;

	const isEnabledDeployButton =
		activePhaseTab === MintPhase.Launch ||
		(isFetched && !!whiteListedUsers?.pagination.total);

	return (
		<Row className='nft-info'>
			<Col span={12}>
				<Card
					tabList={TAB_LIST}
					tabBarExtraContent='NFT Info'
					activeTabKey={activePhaseTab}
					onTabChange={onTabChange}
					actions={
						isSuperAdmin && isShowDeployRoundButton
							? [
									<Button
										key='setting-current-round'
										type='primary'
										onClick={handleSetCurrentRound}
										loading={isDeploySalePhase}
										disabled={!isEnabledDeployButton}
									>
										Set Current Round
									</Button>,
							  ]
							: undefined
					}
				>
					<NFTInfoForm
						activePhaseTab={activePhaseTab}
						form={form.instance}
						onFinish={form.onFinish}
					/>
				</Card>
			</Col>
		</Row>
	);
}
