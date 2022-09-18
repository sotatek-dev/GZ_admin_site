import './SaleRoundCreate.style.scss';
import Generalinfor from './Generalinfor';
import SrDetails from './SrDetails';
import SrClaimConfig from './SrClaimConfig';
import TokenInfor from './TokenInfor';
import ExchangeRate from './ExchangeRate';
import BoxTime from './BoxTime';
import AboutSaleRaound from './AboutSaleRaound';
import { Col, Row } from 'antd';

export default function SaleRoundList() {
	return (
		<>
			<div className='sale-round-container'>
				<div className=''>Top</div>
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
					<Row>List User</Row>
				</div>
				<div>Bot</div>
			</div>
		</>
	);
}
