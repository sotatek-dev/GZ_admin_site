import dayjs from 'dayjs';
import { DatePicker, Form, InputNumber, Loading } from '@common/components';
import { MintPhase, NFTInfoFormValue } from '@settings/nft-mint/types';
import type { FormInstance } from 'antd/es/form/Form';
import { useNFTMintPhaseSetting } from '@settings/nft-mint/services/useGetSettingNFTMint';

interface Props {
	activePhaseTab: MintPhase;
	form: FormInstance;
	onFinish: (values: NFTInfoFormValue) => void;
}

export default function NFTInfoForm({ form, onFinish, activePhaseTab }: Props) {
	const { currentPhaseSetting, isGetPhaseSetting } =
		useNFTMintPhaseSetting(activePhaseTab);

	if (isGetPhaseSetting) {
		return <Loading />;
	}

	if (!currentPhaseSetting) {
		return null;
	}

	const {
		price,
		price_after_24h,
		nft_mint_limit,
		start_mint_time,
		end_mint_time,
	} = currentPhaseSetting;

	return (
		<Form
			form={form}
			onFinish={onFinish}
			layout='vertical'
			name='basic'
			autoComplete='off'
		>
			<Form.Item
				wrapperCol={{ span: 12 }}
				initialValue={price}
				label='Price'
				name='price'
				rules={[{ required: true, message: 'Please input price!' }]}
			>
				<InputNumber addonAfter='BUSD' min={0} />
			</Form.Item>
			<Form.Item
				wrapperCol={{ span: 12 }}
				initialValue={price_after_24h}
				label='Price after 24h'
				name='price_after_24h'
				rules={[{ required: true, message: 'Please input price!' }]}
			>
				<InputNumber addonAfter='BUSD' min={0} />
			</Form.Item>
			<Form.Item
				wrapperCol={{ span: 12 }}
				initialValue={nft_mint_limit}
				label='NFT Mint Limit'
				name='nft_mint_limit'
				rules={[{ required: true, message: 'Please input price!' }]}
			>
				<InputNumber addonAfter='BUSD' min={0} />
			</Form.Item>
			<Form.Item
				initialValue={[
					start_mint_time && dayjs.unix(start_mint_time),
					end_mint_time && dayjs.unix(end_mint_time),
				]}
				label='Mint Time'
				name='mint_time'
				rules={[{ required: true, message: 'Please input price!' }]}
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
