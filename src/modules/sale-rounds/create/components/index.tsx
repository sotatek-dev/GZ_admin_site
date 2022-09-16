import './SaleRoundCreate.style.scss';
import Grid from '@mui/material/Unstable_Grid2';
import Box from '@mui/material/Box';
import Generalinfor from './Generalinfor';

export default function SaleRoundList() {
	return (
		<>
			<div className='sale-round-container'>
				<div className=''>Top</div>
				<div className='sale-round-mid'>
					<Box sx={{ flexGrow: 1 }}>
						<Grid container>
							<Grid xs={6}>
								<Generalinfor />
							</Grid>
							<Grid xs={6}>Sale Round details</Grid>
						</Grid>
						<Grid container>
							<Grid xs={6}>Claim Configuration</Grid>
							<Grid xs={6}>Token Info</Grid>
						</Grid>
						<Grid container>
							<Grid xs={6}>Exchange Rates</Grid>
							<Grid xs={6}>Start/End Buy Time</Grid>
						</Grid>
						<Grid xs={12}>About the Sale Round</Grid>
						<Grid xs={12}>List User</Grid>
					</Box>
				</div>
				<div>Bot</div>
			</div>
		</>
	);
}
