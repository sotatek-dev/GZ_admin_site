import './SettingNFTMint.style.scss';
import { useState } from 'react';
import dayjs from 'dayjs';
import { Button, Col, Form } from '@common/components';
import { BackButton, NFTInfo, Users } from '@settings/nft-mint/components';
import { useUpdateNFTMintSetting } from '@settings/nft-mint/services/useUpdateNFTMintSetting';
import { MintPhase, NFTInfoFormValue } from '@settings/nft-mint/types';
import { useNFTMintPhaseSetting } from './services/useGetSettingNFTMint';
import { toWei } from '@common/helpers/converts';
import { useIsSuperAdmin } from '@common/hooks/useIsSuperAdmin';
import { removeComanString } from '@common/helpers/formats';
import { useGetLaunchPrice } from './services/useGetLaunchPrice';

export default function SettingNFTMint() {
	const isSuperAdmin = useIsSuperAdmin();
	const [activePhaseTab, setActivePhaseTab] = useState<MintPhase>(
		MintPhase.WhiteList
	);
	const { updateNftMintSetting, isUpdateNftMintSetting } =
		useUpdateNFTMintSetting();

	const { currentPhaseSetting } = useNFTMintPhaseSetting(activePhaseTab);
	const { launchPrice } = useGetLaunchPrice();

	const forms = {
		[MintPhase.WhiteList]: Form.useForm<NFTInfoFormValue>()[0],
		[MintPhase.Presale1]: Form.useForm<NFTInfoFormValue>()[0],
		[MintPhase.Presale2]: Form.useForm<NFTInfoFormValue>()[0],
		[MintPhase.Launch]: Form.useForm<NFTInfoFormValue>()[0],
	};

	const isLaunchPhase = activePhaseTab === MintPhase.Launch;

	function handleSaveSetting(values: NFTInfoFormValue) {
		if (!currentPhaseSetting || !launchPrice) return;

		const { _id } = currentPhaseSetting;
		const {
			price,
			price_after_24h,
			nft_mint_limit,
			mint_time,
			start_mint_time,
		} = values;

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

		const newSetting = {
			_id,
			...phasePricing,
			nft_mint_limit: removeComanString(nft_mint_limit),
			...mintTime,
		};

		updateNftMintSetting(newSetting);
	}

	function handleChangePhaseTab(phase: MintPhase) {
		setActivePhaseTab(phase);
	}

	return (
		<Col className='setting-nft'>
			<BackButton />
			<NFTInfo
				activePhaseTab={activePhaseTab}
				setCurrentPhaseTab={handleChangePhaseTab}
				form={{
					instance: forms[activePhaseTab],
					onFinish: handleSaveSetting,
				}}
			/>
			<Users activePhaseTab={activePhaseTab} />
			{isSuperAdmin && (
				<div className='setting-nft-button_group'>
					<Button danger onClick={() => forms[activePhaseTab].resetFields()}>
						Cancel
					</Button>
					<Button
						htmlType='submit'
						onClick={() => forms[activePhaseTab].submit()}
						loading={isUpdateNftMintSetting}
					>
						Save
					</Button>
				</div>
			)}
		</Col>
	);
}
