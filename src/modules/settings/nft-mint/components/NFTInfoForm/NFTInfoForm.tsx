import dayjs from 'dayjs';
import type { FormInstance } from 'antd/es/form/Form';
import { DatePicker, Form, InputNumber, Loading } from '@common/components';
import { MintPhase, NFTInfoFormValue } from '@settings/nft-mint/types';
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
				rules={[{ required: true, message: 'Please input price!' }]}
			>
				<InputNumber addonAfter='BUSD' min={0} />
			</Form.Item>
			<Form.Item
				wrapperCol={{ span: 12 }}
				label='Price after 24h'
				name='price_after_24h'
				rules={[{ required: true, message: 'Please input price!' }]}
			>
				<InputNumber addonAfter='BUSD' min={0} />
			</Form.Item>
			<Form.Item
				wrapperCol={{ span: 12 }}
				label='NFT Mint Limit'
				name='nft_mint_limit'
				rules={[{ required: true, message: 'Please input price!' }]}
			>
				<InputNumber addonAfter='NFT' min={0} />
			</Form.Item>
			<Form.Item
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
