import './scss/Generalinfor.style.scss';
import { useState } from 'react';
import { Checkbox, Form } from 'antd';
import type { FormInstance } from 'antd/es/form/Form';
import { MessageValidations } from '@common/constants/messages';
import { Card, Input } from '@common/components';
interface GeneralInforProps {
	srName: string;
	form: FormInstance;
	isUpdate: boolean;
	isShowClaimDate: boolean;
	isSaleRound: boolean;
}

export default function SaleRoundGeneralInfor(props: GeneralInforProps) {
	const { srName, form, isUpdate, isShowClaimDate, isSaleRound } = props;
	const [checkedSaleRound, setCheckedSaleRound] = useState(
		isSaleRound ?? false
	);
	const [checkedShowClaimDate, setCheckedShowClaimDate] = useState(
		isShowClaimDate ?? false
	);

	return (
		<Card title='Sale Round general info'>
			<div className='px-20 pt-31 sr-generalinfor-showip--h'>
				<Form form={form} layout='vertical' name='generalInforForm'>
					<div className='sr-name-sale-round'>
						<Form.Item
							name='name'
							label='Sale Round name'
							className='sr-input-name-sale-round'
							initialValue={srName}
							rules={[{ required: true, message: MessageValidations.MSC_1_15 }]}
						>
							<Input
								className='sr-input-name'
								disabled={isUpdate}
								name='name'
							/>
						</Form.Item>
						<Form.Item
							name='is_hidden'
							className='sr-checkbox-show'
							valuePropName='checked'
						>
							<div className='d-flex'>
								<div className='d-flex align-items-center'>
									<Checkbox
										checked={checkedSaleRound}
										value={checkedSaleRound}
										onChange={(e) => setCheckedSaleRound(e.target.checked)}
										className='sr-checkbox-user-round'
									/>
								</div>
								<span className='pl-10'>Hidden</span>
							</div>
						</Form.Item>
					</div>

					<Form.Item name='is_claim_configs_hidden' valuePropName='checked'>
						<div className='d-flex sr-user-date'>
							<div className='d-flex align-items-center'>
								<Checkbox
									checked={checkedShowClaimDate}
									onChange={(e) => setCheckedShowClaimDate(e.target.checked)}
									className='sr-checkbox-user-date'
								/>
							</div>
							<span className='pl-10'>Hide Claim Time</span>
						</div>
					</Form.Item>
				</Form>
			</div>
		</Card>
	);
}
