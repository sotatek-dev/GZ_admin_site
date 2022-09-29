import './scss/AboutSaleRaound.style.scss';
import { Input, Form } from 'antd';
import { MessageValidations } from './types';
import type { FormInstance } from 'antd/es/form/Form';

const { TextArea } = Input;

interface AboutSaleRoundProps {
	description: string;
	form: FormInstance;
}

export default function AboutSaleRound(props: AboutSaleRoundProps) {
	const { form, description } = props;
	return (
		<>
			<div className='sr-block-contents'>
				<div className='sale-round-title sr-about-title--h'>
					About the Sale Round
				</div>
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
							<TextArea className='about-sr-textarea' rows={13} />
						</Form.Item>
					</Form>
				</div>
			</div>
		</>
	);
}
