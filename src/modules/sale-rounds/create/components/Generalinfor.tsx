import './scss/Generalinfor.style.scss';
import { Input, Form } from 'antd';
import type { FormInstance } from 'antd/es/form/Form';
import { MessageValidations } from './types';

interface GeneralInforProps {
	srName: string;
	form: FormInstance;
	isUpdate: boolean;
}

export default function SaleRoundGeneralInfor(props: GeneralInforProps) {
	const { srName, form, isUpdate } = props;

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
							rules={[{ required: true, message: MessageValidations.MSC_1_15 }]}
						>
							<Input
								disabled={isUpdate}
								className='ip-sale-round-general'
								name='name'
							/>
						</Form.Item>
					</Form>
				</div>
			</div>
		</>
	);
}
