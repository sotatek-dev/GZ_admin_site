import './SettingNFTMint.style.scss';
import { useState } from 'react';
import dayjs from 'dayjs';
import { Button, Col, Form } from '@common/components';
import {
	BackButton,
	NFTInfo,
	Users,
	NFTInfoForm,
} from '@settings/nft-mint/components';
import { useUpdateNFTMintSetting } from '@settings/nft-mint/services/useUpdateNFTMintSetting';
import { MintPhase, NFTInfoFormValue } from '@settings/nft-mint/types';
import { useNFTMintPhaseSetting } from './services/useGetSettingNFTMint';
import { toWei } from '@common/helpers/converts';

export default function SettingNFTMint() {
	const [activePhaseTab, setActivePhaseTab] = useState<MintPhase>(
		MintPhase.WhiteList
	);
	const { updateNftMintSetting, isUpdateNftMintSetting } =
		useUpdateNFTMintSetting();

	const { currentPhaseSetting } = useNFTMintPhaseSetting(activePhaseTab);

	const forms = {
		[MintPhase.WhiteList]: Form.useForm()[0],
		[MintPhase.Presale1]: Form.useForm()[0],
		[MintPhase.Presale2]: Form.useForm()[0],
		[MintPhase.Public]: Form.useForm()[0],
	};

	function handleSaveSetting(values: NFTInfoFormValue) {
		if (!currentPhaseSetting) return;

		const { _id } = currentPhaseSetting;
		const { price, price_after_24h, nft_mint_limit, mint_time } = values;

		const newSetting = {
			_id,
			price: toWei(price),
			price_after_24h: toWei(price_after_24h),
			nft_mint_limit,
			start_mint_time: dayjs(mint_time[0]).unix(),
			end_mint_time: dayjs(mint_time[1]).unix(),
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
				form={
					<NFTInfoForm
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
