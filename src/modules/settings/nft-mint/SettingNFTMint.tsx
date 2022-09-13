import './SettingNFTMint.style.scss';
import dayjs from 'dayjs';
import { Button, Form } from '@common/components';
import NFTInfo from './components/NFTInfo';
import UserList from './components/UserList';
import { useState } from 'react';
import { MintPhase, NFTInfoFormValue } from './types';
import NFTInfoForm from './components/NFTInfoForm';
import { useNFTMintPhaseSetting } from './SettingNFTMint.query';
import { useUpdateNFTMintSetting } from './services/useUpdateNFTMintSetting';

export default function SettingNFTMint() {
	const [currentPhase, setCurrentPhase] = useState<MintPhase>(
		MintPhase.WhiteList
	);

	const { data: phaseSetting } = useNFTMintPhaseSetting(currentPhase);
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
			_id: phaseSetting?._id as string,
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
		<div className='setting-nft'>
			<Button>Back</Button>
			<NFTInfo
				form={
					<NFTInfoForm
						form={forms[currentPhase]}
						phaseSetting={phaseSetting}
						onFinish={handleSaveSetting}
						key={currentPhase}
					/>
				}
				currentPhase={currentPhase}
				setCurrentPhase={handleChangeCurrentPhase}
			/>
			<UserList />
			<div className='setting-nft-button_group'>
				<Button onClick={() => forms[currentPhase].resetFields()}>
					Cancel
				</Button>
				<Button
					htmlType='submit'
					onClick={() => forms[currentPhase].submit()}
					loading={isUpdateNftMintSetting}
				>
					Save
				</Button>
			</div>
		</div>
	);
}
