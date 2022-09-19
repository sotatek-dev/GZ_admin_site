import './scss/Generalinfor.style.scss';
import { Input, Form } from 'antd';
import { GeneralInforProps } from './types';
import { useEffect } from 'react';

export default function SaleRoundGeneralInfor(props: GeneralInforProps) {
	const [form] = Form.useForm();
	const { srName } = props;
	useEffect(() => {
		form.setFieldValue('name', srName);
	}, [form]);

	const handlerFormChange = (changedValues: string, allValues: any) => {
		console.log(456, changedValues, allValues);
	};
	const handlerFinish = (values: any) => {
		console.log(789, values);
	};
	const handlerFinishFalse = () => {
		console.log('FinishFalse');
	};
	const handlerBlur = () => {
		console.log(888);
		form.submit();
	};
	return (
		<>
			<div className='sr-block-contents'>
				<div className={'sale-round-title sr-generalinfor-title--h'}>
					Sale Round general info
				</div>
				<div className='px-20 sr-generalinfor-showip--h'>
					<Form
						form={form}
						layout='vertical'
						name='userForm'
						onValuesChange={handlerFormChange}
						onFinish={handlerFinish}
						onFinishFailed={handlerFinishFalse}
					>
						<Form.Item
							colon
							name='name'
							label='Sale Round name'
							rules={[{ required: true }]}
						>
							<Input
								className='ip-sale-round-general'
								name='name'
								onBlur={handlerBlur}
							/>
						</Form.Item>
					</Form>
				</div>
			</div>
		</>
	);
}
