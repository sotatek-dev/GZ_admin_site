import InputBase from '@mui/material/InputBase';
import InputLabel from '@mui/material/InputLabel';
import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import { styled } from '@mui/material/styles';

const BootstrapInput = styled(InputBase)(({ theme }) => ({
	'label + &': {
		marginTop: theme.spacing(3),
	},
	'& .MuiInputBase-input': {
		borderRadius: 4,
		position: 'relative',
		backgroundColor: theme.palette.mode === 'light' ? '#fcfcfb' : '#2b2b2b',
		border: '1px solid #ced4da',
		fontSize: 16,
		width: 'auto',
		padding: '10px 12px',
		transition: theme.transitions.create([
			'border-color',
			'background-color',
			'box-shadow',
		]),
		// Use the system font instead of the default Roboto font.
		fontFamily: [
			'-apple-system',
			'BlinkMacSystemFont',
			'"Segoe UI"',
			'Roboto',
			'"Helvetica Neue"',
			'Arial',
			'sans-serif',
			'"Apple Color Emoji"',
			'"Segoe UI Emoji"',
			'"Segoe UI Symbol"',
		].join(','),
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
					gridTemplateColumns: { sm: '1fr 1fr' },
					gap: 2,
				}}
			>
				<FormControl variant='standard'>
					<InputLabel shrink htmlFor='bootstrap-input'>
						Bootstrap
					</InputLabel>
					<BootstrapInput defaultValue='react-bootstrap' id='bootstrap-input' />
				</FormControl>
			</Box>
		</>
	);
}
