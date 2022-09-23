import './scss/Generalinfor.style.scss';
import { Input, Form } from 'antd';
import { GeneralInforProps } from './types';

export default function SaleRoundGeneralInfor(props: GeneralInforProps) {
	const { srName, form } = props;

	return (
		<>
			<div className='sr-block-contents'>
				<div className='sale-round-title sr-generalinfor-title--h'>
					Sale Round general info
				</div>
				<div className='px-20 pt-31 sr-generalinfor-showip--h'>
					<Form form={form} layout='vertical' name='generalInforForm'>
						<Form.Item
							name='name'
							label='Sale Round name'
							initialValue={srName}
							rules={[{ required: true }]}
						>
							<Input className='ip-sale-round-general' name='name' />
						</Form.Item>
					</Form>
				</div>
			</div>
		</>
	);
}
