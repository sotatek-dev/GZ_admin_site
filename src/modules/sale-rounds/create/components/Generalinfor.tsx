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
	const [checkedSaleRound, setCheckedSaleRound] = useState(isSaleRound ?? true);
	const [checkedShowClaimDate, setCheckedShowClaimDate] = useState(
		isShowClaimDate ?? true
	);

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
						<Input className='sr-input-name' disabled={isUpdate} name='name' />
					</Form.Item>
					<Form.Item
						name='is_shown'
						className='sr-checkbox-show'
						valuePropName='checked'
					>
						<div className='d-flex'>
							<span className='pr-4'>Show Sale Round</span>
							<div className='d-flex align-items-center'>
								<Checkbox
									checked={checkedSaleRound}
									value={checkedSaleRound}
									onChange={(e) => setCheckedSaleRound(e.target.checked)}
									className='sr-checkbox-user-round'
								/>
							</div>
						</div>
					</Form.Item>

					<Form.Item
						name='is_claim_configs_shown'
						className='sr-checkbox-show'
						valuePropName='checked'
					>
						<div className='d-flex'>
							<span className='pr-4'>Show Claim Configs</span>
							<div className='d-flex align-items-center'>
								<Checkbox
									checked={checkedShowClaimDate}
									onChange={(e) => setCheckedShowClaimDate(e.target.checked)}
									className='sr-checkbox-user-date'
								/>
							</div>
						</div>
					</Form.Item>
				</Form>
			</div>
		</Card>
	);
}
