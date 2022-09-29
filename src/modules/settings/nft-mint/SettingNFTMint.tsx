import './SettingNFTMint.style.scss';
import dayjs from 'dayjs';
import { Button, Col, Form } from '@common/components';
import NFTInfo from './components/NFTInfo';
import UserList from './components/UserList';
import { useState } from 'react';
import { MintPhase, NFTInfoFormValue } from './types';
import NFTInfoForm from './components/NFTInfoForm';
import { useUpdateNFTMintSetting } from './services/useUpdateNFTMintSetting';
import { useRedirectBack } from '@common/hooks';

export default function SettingNFTMint() {
	const goBack = useRedirectBack();
	const [activePhaseTab, setActivePhaseTab] = useState<MintPhase>(
		MintPhase.WhiteList
	);

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
			_id: activePhaseTab,
			price,
			price_after_24h,
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
			<Button onClick={goBack}>Back</Button>
			<NFTInfo
				activePhaseTab={activePhaseTab}
				setCurrentPhaseTab={handleChangePhaseTab}
				form={
					<NFTInfoForm
						activePhaseTab={activePhaseTab}
						form={forms[activePhaseTab]}
						onFinish={handleSaveSetting}
						key={activePhaseTab}
					/>
				}
			/>
			<UserList />
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
