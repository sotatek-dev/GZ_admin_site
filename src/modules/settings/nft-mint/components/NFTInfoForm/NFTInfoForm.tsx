import dayjs from 'dayjs';
import type { FormInstance } from 'antd/es/form/Form';
import { DatePicker, Form, Loading } from '@common/components';
import { MintPhase, NFTInfoFormValue } from '@settings/nft-mint/types';
import { useNFTMintPhaseSetting } from '@settings/nft-mint/services/useGetSettingNFTMint';
import { MessageValidations } from '@common/constants/messages';
import NumericInput from '@common/components/NumericInput';
import { useState } from 'react';

interface Props {
	activePhaseTab: MintPhase;
	form: FormInstance;
	onFinish: (values: NFTInfoFormValue) => void;
}

export default function NFTInfoForm({ form, onFinish, activePhaseTab }: Props) {
	const { currentPhaseSetting, isGetPhaseSetting } =
		useNFTMintPhaseSetting(activePhaseTab);
	const [price, setPrice] = useState<string>('');
	const [priceAfter24h, setPriceAfter24h] = useState<string>('');
	const [nftMintLimit, setNftMintLimit] = useState<string>('');

	if (isGetPhaseSetting) {
		return <Loading />;
	}

	if (!currentPhaseSetting) {
		return null;
	}

	const { start_mint_time, end_mint_time } = currentPhaseSetting;
	const mint_time = [dayjs.unix(start_mint_time), dayjs.unix(end_mint_time)];

	return (
		<Form
			form={form}
			onFinish={onFinish}
			layout='vertical'
			name='basic'
			autoComplete='off'
			initialValues={{
				...currentPhaseSetting,
				mint_time,
			}}
			key={activePhaseTab}
		>
			<Form.Item
				wrapperCol={{ span: 12 }}
				label='Price'
				name='price'
				rules={[{ required: true, message: MessageValidations.MSC_1_15 }]}
			>
				<NumericInput addonAfter='BUSD' value={price} onChange={setPrice} />
			</Form.Item>
			<Form.Item
				wrapperCol={{ span: 12 }}
				label='Price after 24h'
				name='price_after_24h'
				tooltip={{
					title: 'Set this value equal to price if you don’t want to change',
				}}
				rules={[{ required: true, message: MessageValidations.MSC_1_15 }]}
			>
				<NumericInput
					addonAfter='BUSD'
					value={priceAfter24h}
					onChange={setPriceAfter24h}
				/>
			</Form.Item>
			<Form.Item
				wrapperCol={{ span: 12 }}
				label='NFT Mint Limit'
				name='nft_mint_limit'
				tooltip={{
					title: 'Set this value to 0 for no limitation how much user can buy',
				}}
				rules={[{ required: true, message: MessageValidations.MSC_1_15 }]}
			>
				<NumericInput
					addonAfter='NFT'
					value={nftMintLimit}
					onChange={setNftMintLimit}
				/>
			</Form.Item>
			<Form.Item
				label='Mint Time'
				name='mint_time'
				rules={[{ required: true, message: MessageValidations.MSC_1_15 }]}
			>
				<DatePicker.RangePicker
					showTime
					format='YYYY/MM/DD HH:mm'
					style={{ width: '100%' }}
					placeholder={['Start mint time', 'End mint time']}
				/>
			</Form.Item>
		</Form>
	);
}
