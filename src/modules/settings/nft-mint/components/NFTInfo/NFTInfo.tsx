import './NFTInfo.style.scss';
import { Button, Card, Col, Row } from '@common/components';
import { MinPhaseLabel, MintPhase } from '@settings/nft-mint/types';
import { useSetCurrentRound } from '@settings/nft-mint/services/useSetCurrentRound';
import { useGetCurrentPhase } from '@settings/nft-mint/services/useGetCurrentPhase';

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
	const { setCurrentRound, isSetCurrentRound } = useSetCurrentRound();

	const onTabChange = (key: string) => {
		setCurrentPhaseTab(key as MintPhase);
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
							onClick={() => setCurrentRound(activePhaseTab)}
							loading={isSetCurrentRound}
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
