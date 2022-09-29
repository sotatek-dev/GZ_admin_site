import { MintPhase } from '@settings/nft-mint/types';
import MintedUsers from '../MintedUsers';
import WhitelistUsers from '../WhitelistUsers';

interface Props {
	activePhaseTab: MintPhase;
}

export default function Users({ activePhaseTab }: Props) {
	if (activePhaseTab === MintPhase.Public) {
		return <MintedUsers activePhaseTab={activePhaseTab} />;
	}

	return <WhitelistUsers activePhaseTab={activePhaseTab} />;
}
