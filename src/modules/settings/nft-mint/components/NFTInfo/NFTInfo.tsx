import './NFTInfo.style.scss';
import { Card, Col, Row } from '@common/components';
import { MinPhaseLabel, MintPhase } from '@settings/nft-mint/types';

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
	currentPhase: MintPhase;
	setCurrentPhase: (phase: MintPhase) => void;
}

export default function NFTInfo({
	form,
	currentPhase,
	setCurrentPhase,
}: Props) {
	const onTab2Change = (key: MintPhase) => {
		setCurrentPhase(key);
	};

	return (
		<Row className='nft-info'>
			<Col span={12}>
				<Card
					tabList={TAB_LIST}
					tabBarExtraContent='NFT Info'
					activeTabKey={currentPhase}
					onTabChange={(key) => {
						onTab2Change(key as MintPhase);
					}}
					style={{ padding: 0, minHeight: 450 }}
				>
					{form}
				</Card>
			</Col>
		</Row>
	);
}
