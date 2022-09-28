import './SettingNFTMint.style.scss';
import dayjs from 'dayjs';
import { Button, Col, Form } from '@common/components';
import NFTInfo from './components/NFTInfo';
import UserList from './components/UserList';
import { useState } from 'react';
import { MintPhase, NFTInfoFormValue } from './types';
import NFTInfoForm from './components/NFTInfoForm';
import { useNFTMintPhaseSetting } from './services/useGetSettingNFTMint';
import { useUpdateNFTMintSetting } from './services/useUpdateNFTMintSetting';
import { useRedirectBack } from '@common/hooks';

export default function SettingNFTMint() {
	const goBack = useRedirectBack();
	const [currentPhaseTab, setCurrentPhase] = useState<MintPhase>(
		MintPhase.WhiteList
	);

	const { currentPhase, currentPhaseSetting } =
		useNFTMintPhaseSetting(currentPhaseTab);
	const { updateNftMintSetting, isUpdateNftMintSetting } =
		useUpdateNFTMintSetting();

	const forms = {
		[MintPhase.WhiteList]: Form.useForm()[0],
		[MintPhase.Presale1]: Form.useForm()[0],
		[MintPhase.Presale2]: Form.useForm()[0],
		[MintPhase.Public]: Form.useForm()[0],
	};

	function handleSaveSetting(values: NFTInfoFormValue) {
		const { price, price_after_24h, nft_mint_limit, mint_time } = values;

		const newSetting = {
			_id: currentPhaseTab,
			price,
			price_after_24h,
			nft_mint_limit,
			start_mint_time: dayjs(mint_time[0]).unix(),
			end_mint_time: dayjs(mint_time[1]).unix(),
		};

		updateNftMintSetting(newSetting);
	}

	function handleChangeCurrentPhase(phase: MintPhase) {
		setCurrentPhase(phase);
	}

	return (
		<Col className='setting-nft'>
			<Button onClick={goBack}>Back</Button>
			<NFTInfo
				form={
					<NFTInfoForm
						form={forms[currentPhaseTab]}
						phaseSetting={currentPhaseSetting}
						onFinish={handleSaveSetting}
						key={currentPhase}
					/>
				}
				currentPhase={currentPhaseTab}
				setCurrentPhase={handleChangeCurrentPhase}
			/>
			<UserList />
			<div className='setting-nft-button_group'>
				<Button danger onClick={() => forms[currentPhaseTab].resetFields()}>
					Cancel
				</Button>
				<Button
					htmlType='submit'
					onClick={() => forms[currentPhaseTab].submit()}
					loading={isUpdateNftMintSetting}
				>
					Save
				</Button>
			</div>
		</Col>
	);
}
