import InputBase from '@mui/material/InputBase';
import InputLabel from '@mui/material/InputLabel';
import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import { styled } from '@mui/material/styles';

const BootstrapInput = styled(InputBase)(({ theme }) => ({
	'label + &': {
		marginTop: theme.spacing(2),
	},
	'& .MuiInputBase-input': {
		borderRadius: '10px',
		position: 'relative',
		backgroundColor: theme.palette.mode === 'light' ? '#fcfcfb' : '#2b2b2b',
		border: '1px solid #001F4D',
		fontSize: 16,
		width: '100%',
		height: '44.65px',
		transition: theme.transitions.create([
			'border-color',
			'background-color',
			'box-shadow',
		]),
		// Use the system font instead of the default Roboto font.
		fontFamily: ['-apple-system', 'BlinkMacSystemFont'].join(','),
	},
}));

export default function SaleRoundList() {
	return (
		<>
			<Box
				component='form'
				noValidate
				sx={{
					display: 'grid',
					gridTemplateRows: { sm: '97.33px 244.67px' },
					gap: 0,
					border: '1px solid #000000',
					borderRadius: '15px',
				}}
			>
				<div className={'sale-round-title'}>Sale Round general info</div>
				<FormControl variant='standard'>
					<InputLabel shrink htmlFor='fullWidth'>
						Sale Round name *
					</InputLabel>
					<BootstrapInput defaultValue='react-bootstrap' id='fullWidth' />
				</FormControl>
			</Box>
		</>
	);
}
