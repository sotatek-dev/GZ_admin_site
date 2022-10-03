import './NFTInfo.style.scss';
import { Button, Card, Col, Row } from '@common/components';
import { MinPhaseLabel, MintPhase } from '@settings/nft-mint/types';
import { useDeploySalePhase } from '@settings/nft-mint/services/useDeploySalePhase';
import { useGetCurrentPhase } from '@settings/nft-mint/services/useGetCurrentPhase';
import { useNFTMintPhaseSetting } from '@settings/nft-mint/services/useGetSettingNFTMint';

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
	form: React.ReactNode;
	activePhaseTab: MintPhase;
	setCurrentPhaseTab: (phase: MintPhase) => void;
}

export default function NFTInfo({
	form,
	activePhaseTab,
	setCurrentPhaseTab,
}: Props) {
	const { currentPhase } = useGetCurrentPhase();
	const { deploySalePhase, isDeploySalePhase } = useDeploySalePhase();
	const { currentPhaseSetting } = useNFTMintPhaseSetting(activePhaseTab);

	const onTabChange = (key: string) => {
		setCurrentPhaseTab(key as MintPhase);
	};

	const handleSetCurrentRound = () => {
		if (!currentPhaseSetting) return;
		deploySalePhase({ ...currentPhaseSetting, _id: activePhaseTab });
	};

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
							disabled={!currentPhase}
						>
							Set Current Round
						</Button>,
					]}
				>
					{form}
				</Card>
			</Col>
		</Row>
	);
}
