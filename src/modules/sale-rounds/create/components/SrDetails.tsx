import InputBase from '@mui/material/InputBase';
import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Radio from '@mui/material/Radio';
import Tooltip, { TooltipProps, tooltipClasses } from '@mui/material/Tooltip';

const BootstrapInput = styled(InputBase)(({ theme }) => ({
	'label + &': {
		marginTop: theme.spacing(2),
	},
	'& .MuiInputBase-input': {
		borderRadius: '10px',
		position: 'relative',
		border: '1px solid #001F4D',
		fontSize: 16,
		width: '92px',
		height: '25px',
		padding: 0,
		transition: theme.transitions.create([
			'border-color',
			'background-color',
			'box-shadow',
		]),
		// Use the system font instead of the default Roboto font.
	},
}));

const BootstrapTooltip = styled(({ className, ...props }: TooltipProps) => (
	<Tooltip {...props} arrow classes={{ popper: className }} />
))(() => ({
	[`& .${tooltipClasses.arrow}`]: {
		color: 'rgba(0, 0, 0, 0.75)',
	},
	[`& .${tooltipClasses.tooltip}`]: {
		backgroundColor: 'rgba(0, 0, 0, 0.75)',
		marginTop: '9.39px !important',
		height: '34px',
		borderRadius: '2px',
		lineHeight: '22px',
	},
}));

export default function SaleRoundBoxDetails() {
	return (
		<>
			<Box
				component='form'
				noValidate
				sx={{
					display: 'grid',
					gridTemplateRows: { sm: '60px 283px' },
					gap: 0,
					border: '1px solid #000000',
					borderRadius: '15px',
				}}
			>
				<div className={'sale-round-title'}>Sale Round details</div>
				<div className={'sale-round-contents'}>
					<div className={'sr-detail-box-radio'}>
						<div className='SR-contents-title'>Network available</div>
						<RadioGroup
							sx={{
								paddingTop: '6px',
								paddingLeft: '12px',
							}}
							row
							aria-labelledby='demo-radio-buttons-group-label'
							defaultValue='female'
							name='radio-buttons-group'
						>
							<FormControlLabel
								sx={{ lineHeight: '175%' }}
								value='female'
								control={<Radio />}
								label='Female'
							/>
							<FormControlLabel
								sx={{ lineHeight: '175%' }}
								value='male'
								control={<Radio />}
								label='Male'
							/>
							<FormControlLabel
								sx={{ lineHeight: '175%' }}
								value='other'
								control={<Radio />}
								label='Other'
							/>
						</RadioGroup>
					</div>
					<div>
						<div className='SR-contents-title d-flex pt-10 pb-10'>
							<span className={'pr-4'}>Buy Limit (BUSD)</span>
							<div className={'d-flex align-items-center'}>
								<BootstrapTooltip
									title={
										<>
											<div className={'d-flex h-100 align-items-center'}>
												<span>Set this value to 0 for no limitation</span>
											</div>
										</>
									}
								>
									<svg
										width='16'
										height='16'
										viewBox='0 0 16 16'
										fill='none'
										xmlns='http://www.w3.org/2000/svg'
									>
										<path
											d='M8 0.125C3.65117 0.125 0.125 3.65117 0.125 8C0.125 12.3488 3.65117 15.875 8 15.875C12.3488 15.875 15.875 12.3488 15.875 8C15.875 3.65117 12.3488 0.125 8 0.125ZM7.4375 4.20312C7.4375 4.12578 7.50078 4.0625 7.57812 4.0625H8.42188C8.49922 4.0625 8.5625 4.12578 8.5625 4.20312V8.98438C8.5625 9.06172 8.49922 9.125 8.42188 9.125H7.57812C7.50078 9.125 7.4375 9.06172 7.4375 8.98438V4.20312ZM8 11.9375C7.77921 11.933 7.56898 11.8421 7.41442 11.6844C7.25986 11.5266 7.1733 11.3146 7.1733 11.0938C7.1733 10.8729 7.25986 10.6609 7.41442 10.5031C7.56898 10.3454 7.77921 10.2545 8 10.25C8.22079 10.2545 8.43103 10.3454 8.58558 10.5031C8.74014 10.6609 8.8267 10.8729 8.8267 11.0938C8.8267 11.3146 8.74014 11.5266 8.58558 11.6844C8.43103 11.8421 8.22079 11.933 8 11.9375Z'
											fill='#002E58'
										/>
									</svg>
								</BootstrapTooltip>
							</div>
						</div>
						<BootstrapInput defaultValue='react-bootstrap' id='fullWidth' />
					</div>
				</div>
			</Box>
		</>
	);
}
