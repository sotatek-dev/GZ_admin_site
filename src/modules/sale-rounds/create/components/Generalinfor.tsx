import './scss/Generalinfor.style.scss';
import { Form } from 'antd';
import type { FormInstance } from 'antd/es/form/Form';
import { MessageValidations } from '@common/helpers/message';
import { Card, Input } from '@common/components';
interface GeneralInforProps {
	srName: string;
	form: FormInstance;
	isUpdate: boolean;
}

export default function SaleRoundGeneralInfor(props: GeneralInforProps) {
	const { srName, form, isUpdate } = props;

	return (
		<Card title='Sale Round general info'>
			<div className='px-20 pt-31 sr-generalinfor-showip--h'>
				<Form form={form} layout='vertical' name='generalInforForm'>
					<Form.Item
						name='name'
						label='Sale Round name'
						initialValue={srName}
						rules={[{ required: true, message: MessageValidations.MSC_1_15 }]}
					>
						<Input disabled={isUpdate} name='name' />
					</Form.Item>
				</Form>
			</div>
		</Card>
	);
}
