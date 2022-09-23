import './scss/AboutSaleRaound.style.scss';
import { Input, Form } from 'antd';
import { ISRAboutProps, MessageValidations } from './types';

const { TextArea } = Input;

export default function AboutSaleRound(props: ISRAboutProps) {
	const { form } = props;
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
						>
							<TextArea className='about-sr-textarea' rows={13} />
						</Form.Item>
					</Form>
				</div>
			</div>
		</>
	);
}
