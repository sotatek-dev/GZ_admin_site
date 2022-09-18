import './SaleRoundCreate.style.scss';
import Generalinfor from './Generalinfor';
import SrDetails from './SrDetails';
import SrClaimConfig from './SrClaimConfig';
import TokenInfor from './TokenInfor';
import ExchangeRate from './ExchangeRate';
import BoxTime from './BoxTime';
import AboutSaleRaound from './AboutSaleRaound';
import ListUser from './ListUser';
import { Col, Row } from 'antd';

export default function SaleRoundList() {
	return (
		<>
			<div className='sale-round-container'>
				<div className='pb-62'>
					<div className='btn-sale-round-create btn-back d-flex align-items-center justify-content-center'>
						<span>Back</span>
					</div>
				</div>
				<div className='sale-round-mid'>
					<Row gutter={41}>
						<Col span={12}>
							<Generalinfor />
						</Col>
						<Col span={12}>
							<SrDetails />
						</Col>
					</Row>
					<Row className='pt-41' gutter={41}>
						<Col span={12}>
							<SrClaimConfig />
						</Col>
						<Col span={12}>
							<TokenInfor />
						</Col>
					</Row>
					<Row className='pt-41' gutter={41}>
						<Col span={12}>
							<ExchangeRate />
						</Col>
						<Col span={12}>
							<BoxTime />
						</Col>
					</Row>
					<Row className='pt-41'>
						<Col span={24}>
							<AboutSaleRaound />
						</Col>
					</Row>
					<Row className='pt-41'>
						<Col span={24}>
							<ListUser />
						</Col>
					</Row>
				</div>
				<div className='d-flex justify-content-space pt-153'>
					<div className='btn-deploy btn-deploy-round d-flex align-items-center justify-content-center cursor-pointer'>
						<span>Deploy the round</span>
					</div>
					<div className='btn-sale-round-create btn-update-round d-flex align-items-center justify-content-center'>
						<span>Update the Round</span>
					</div>
				</div>
			</div>
		</>
	);
}
