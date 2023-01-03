import { MintPhase } from '@settings/nft-mint/types';
import MintedUsers from '../MintedUsers';
import WhitelistUsers from '../WhitelistUsers';

interface Props {
	activePhaseTab: MintPhase;
}

export default function Users({ activePhaseTab }: Props) {
	if (
		activePhaseTab === MintPhase.Launch ||
		activePhaseTab === MintPhase.Presale1 ||
		activePhaseTab === MintPhase.Presale2
	) {
		return <MintedUsers activePhaseTab={activePhaseTab} />;
	}

	return <WhitelistUsers activePhaseTab={activePhaseTab} />;
}
