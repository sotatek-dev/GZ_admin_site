import './SaleRoundCreate.style.scss';
import Generalinfor from './Generalinfor';
import SrDetails from './SrDetails';
import SrClaimConfig from './SrClaimConfig';
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
					<Row className='pt-41'>
						<Col span={12}>
							<SrClaimConfig />
						</Col>
						<Col span={12}>Token Info</Col>
					</Row>
					<Row>
						<Col span={12}>Exchange Rates</Col>
						<Col span={12}>Start/End Buy Time</Col>
					</Row>
					<Row>About the Sale Round</Row>
					<Row>List User</Row>
				</div>
				<div>Bot</div>
			</div>
		</>
	);
}
