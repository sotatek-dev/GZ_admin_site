import dayjs from 'dayjs';
import {
	Button,
	DatePicker,
	Form,
	InputNumber,
	Loading,
} from '@common/components';
import { useSetCurrentRound } from '@settings/nft-mint/services/useSetCurrentRound';
import {
	MintPhase,
	NFTInfoFormValue,
	NftMintSetting,
} from '@settings/nft-mint/types';
import type { FormInstance } from 'antd/es/form/Form';

interface Props {
	currentPhase: MintPhase;
	form: FormInstance;
	onFinish: (values: NFTInfoFormValue) => void;
	phaseSetting?: NftMintSetting;
}

export default function NFTInfoForm({
	form,
	onFinish,
	currentPhase,
	phaseSetting,
}: Props) {
	const { setCurrentRound, isSetCurrentRound } = useSetCurrentRound();

	if (!phaseSetting) {
		return <Loading />;
	}

	const {
		price,
		price_after_24h,
		nft_mint_limit,
		start_mint_time,
		end_mint_time,
	} = phaseSetting;

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
			<Button
				type='primary'
				onClick={() => setCurrentRound(currentPhase)}
				loading={isSetCurrentRound}
			>
				Set Current Round
			</Button>
		</Form>
	);
}
