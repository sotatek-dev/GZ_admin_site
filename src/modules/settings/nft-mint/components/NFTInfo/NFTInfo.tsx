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
	activePhaseTab: MintPhase;
	setCurrentPhaseTab: (phase: MintPhase) => void;
	// setStatusDeploySettingMint: (val: boolean) => void;
}

export default function NFTInfo({
	form,
	activePhaseTab,
	setCurrentPhaseTab,
}: // setStatusDeploySettingMint,
Props) {
	const onTabChange = (key: string) => {
		setCurrentPhaseTab(key as MintPhase);
	};

	// setStatusDeploySettingMint(false)

	// const handleSetCurrentRound = () => {
	// 	if (!currentPhaseSetting) return;
	// 	deploySalePhase({ ...currentPhaseSetting, _id: activePhaseTab });
	// };

	return (
		<Row className='nft-info'>
			<Col span={12}>
				<Card
					tabList={TAB_LIST}
					tabBarExtraContent='NFT Info'
					activeTabKey={activePhaseTab}
					onTabChange={onTabChange}
					// actions={[
					// 	<Button
					// 		key='setting-current-round'
					// 		type='primary'
					// 		htmlType="submit"
					// 		onClick={handleSetCurrentRound}
					// 		loading={isDeploySalePhase}
					// 		disabled={!currentPhase}
					// 	>
					// 		Set Current Round
					// 	</Button>,
					// ]}
				>
					{form}
				</Card>
			</Col>
		</Row>
	);
}
