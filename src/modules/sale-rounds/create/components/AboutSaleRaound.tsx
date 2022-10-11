import './scss/AboutSaleRaound.style.scss';
import { Input } from 'antd';
import { MessageValidations } from '@common/constants/messages';
import type { FormInstance } from 'antd/es/form/Form';
import { Card, Form } from '@common/components';

const { TextArea } = Input;

interface AboutSaleRoundProps {
	description: string;
	form: FormInstance;
}

export default function AboutSaleRound(props: AboutSaleRoundProps) {
	const { form, description } = props;
	return (
		<Card title='About the Sale Round'>
			<div className='px-20 sr-about-show-ip--h'>
				<Form
					form={form}
					layout='vertical'
					name='srAbout'
					className='d-flex w-100'
				>
					<Form.Item
						name='description'
						className='w-100 mb-0'
						rules={[
							{
								max: 500,
								message: MessageValidations.MSC_1_4__M500,
							},
						]}
						initialValue={description ? description : ''}
					>
						<TextArea rows={13} />
					</Form.Item>
				</Form>
			</div>
		</Card>
	);
}
