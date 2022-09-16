import { DatePicker, Form, InputNumber, Loading } from '@common/components';
import { NFTInfoFormValue, NftMintSetting } from '@settings/nft-mint/types';
import type { FormInstance } from 'antd/es/form/Form';
import dayjs from 'dayjs';

interface Props {
	form: FormInstance;
	onFinish: (values: NFTInfoFormValue) => void;
	phaseSetting?: NftMintSetting;
}

export default function NFTInfoForm({ form, onFinish, phaseSetting }: Props) {
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
				initialValue={price}
				wrapperCol={{ span: 10 }}
				label='Price'
				name='price'
				rules={[{ required: true, message: 'Please input price!' }]}
			>
				<InputNumber addonAfter='BUSD' min={0} />
			</Form.Item>
			<Form.Item
				initialValue={price_after_24h}
				wrapperCol={{ span: 10 }}
				label='Price after 24h'
				name='price_after_24h'
				rules={[{ required: true, message: 'Please input price!' }]}
			>
				<InputNumber addonAfter='BUSD' min={0} />
			</Form.Item>
			<Form.Item
				wrapperCol={{ span: 10 }}
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
				wrapperCol={{ span: 20 }}
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
