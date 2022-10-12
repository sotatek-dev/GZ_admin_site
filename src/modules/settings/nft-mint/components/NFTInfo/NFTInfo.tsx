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
		key: MintPhase.Public,
		tab: MinPhaseLabel[MintPhase.Public],
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
	const { currentPhase } = useGetCurrentPhase();
	const { deploySalePhase, isDeploySalePhase } = useDeploySalePhase();

	const onTabChange = (key: string) => {
		setCurrentPhaseTab(key as MintPhase);
	};

	const handleSetCurrentRound = () => {
		const { nft_mint_limit, price, price_after_24h, mint_time } =
			form.instance.getFieldsValue();

		deploySalePhase({
			_id: activePhaseTab,
			price: toWei(price),
			price_after_24h: toWei(price_after_24h),
			nft_mint_limit,
			start_mint_time: dayjs(mint_time[0]).unix(),
			end_mint_time: dayjs(mint_time[1]).unix(),
		});
	};

	const isEnableDeployRound = currentPhase && currentPhase < activePhaseTab;

	return (
		<Row className='nft-info'>
			<Col span={12}>
				<Card
					tabList={TAB_LIST}
					tabBarExtraContent='NFT Info'
					activeTabKey={activePhaseTab}
					onTabChange={onTabChange}
					actions={[
						<Button
							key='setting-current-round'
							type='primary'
							onClick={handleSetCurrentRound}
							loading={isDeploySalePhase}
							disabled={!isEnableDeployRound}
						>
							Set Current Round
						</Button>,
					]}
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
