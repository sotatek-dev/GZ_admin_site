import './SettingNFTMint.style.scss';
import { useState } from 'react';
import { Button, Col, Form } from '@common/components';
import {
	BackButton,
	NFTInfo,
	Users,
	NFTInfoForm,
} from '@settings/nft-mint/components';
import { useUpdateNFTMintSetting } from '@settings/nft-mint/services/useUpdateNFTMintSetting';
import { MintPhase, NFTInfoFormValue } from '@settings/nft-mint/types';
import { useDeploySalePhase } from '@settings/nft-mint/services/useDeploySalePhase';
import { useGetCurrentPhase } from '@settings/nft-mint/services/useGetCurrentPhase';
import { useNFTMintPhaseSetting } from '@settings/nft-mint/services/useGetSettingNFTMint';

export default function SettingNFTMint() {
	const [activePhaseTab, setActivePhaseTab] = useState<MintPhase>(
		MintPhase.WhiteList
	);
	const { updateNftMintSetting, isUpdateNftMintSetting } =
		useUpdateNFTMintSetting();

	const { currentPhaseSetting } = useNFTMintPhaseSetting(activePhaseTab);
	const { currentPhase } = useGetCurrentPhase();
	const { deploySalePhase, isDeploySalePhase } = useDeploySalePhase();

	const forms = {
		[MintPhase.WhiteList]: Form.useForm()[0],
		[MintPhase.Presale1]: Form.useForm()[0],
		[MintPhase.Presale2]: Form.useForm()[0],
		[MintPhase.Public]: Form.useForm()[0],
	};

	async function handleSaveSetting(values: NFTInfoFormValue) {
		if (!currentPhaseSetting) return;

		const { _id } = currentPhaseSetting;
		const { price, price_after_24h, nft_mint_limit, start_time, end_time } =
			values;

		const newSetting = {
			_id,
			price,
			price_after_24h,
			nft_mint_limit,
			start_mint_time: start_time.unix(),
			end_mint_time: end_time.unix(),
		};

		const result = await updateNftMintSetting(newSetting);

		if (!result) return;

		if (!currentPhaseSetting) return;
		deploySalePhase({ ...currentPhaseSetting, _id: activePhaseTab });
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
				// setStatusDeploySettingMint={handlerStatusDeploySetting}
				form={
					<NFTInfoForm
						isloading={isDeploySalePhase}
						isDisableBtn={!currentPhase}
						activePhaseTab={activePhaseTab}
						form={forms[activePhaseTab]}
						onFinish={handleSaveSetting}
					/>
				}
			/>
			<Users activePhaseTab={activePhaseTab} />
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
		</Col>
	);
}
