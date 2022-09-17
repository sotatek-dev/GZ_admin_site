import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

function createData(
	name: string,
	calories: number,
	fat: number,
	carbs: number,
	protein: number
) {
	return { name, calories, fat, carbs, protein };
}

const rows = [
	createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
	createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
	createData('Eclair', 262, 16.0, 24, 6.0),
	createData('Cupcake', 305, 3.7, 67, 4.3),
];

export default function SaleRoundBoxDetails() {
	return (
		<>
			<Box
				component='form'
				noValidate
				sx={{
					display: 'grid',
					gridTemplateRows: { sm: '56px 381px' },
					gap: 0,
					border: '1px solid #000000',
					borderRadius: '15px',
				}}
			>
				<div className={'sale-round-title'}>Claim Configuration</div>
				<div className={'sale-round-contents'}>
					<div className={'sr-detail-box-radio'}>
						<div className={'btn-sale-round-create btn-claim-create'}>
							<span>Create</span>
						</div>
					</div>
					<div>
						<TableContainer component={Paper}>
							<Table sx={{ minWidth: 650 }} aria-label='simple table'>
								<TableHead>
									<TableRow>
										<TableCell>Dessert (100g serving)</TableCell>
										<TableCell align='right'>Calories</TableCell>
										<TableCell align='right'>Fat&nbsp;(g)</TableCell>
										<TableCell align='right'>Carbs&nbsp;(g)</TableCell>
										<TableCell align='right'>Protein&nbsp;(g)</TableCell>
									</TableRow>
								</TableHead>
								<TableBody>
									{rows.map((row) => (
										<TableRow
											key={row.name}
											sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
										>
											<TableCell component='th' scope='row'>
												{row.name}
											</TableCell>
											<TableCell align='right'>{row.calories}</TableCell>
											<TableCell align='right'>{row.fat}</TableCell>
											<TableCell align='right'>{row.carbs}</TableCell>
											<TableCell align='right'>{row.protein}</TableCell>
										</TableRow>
									))}
								</TableBody>
							</Table>
						</TableContainer>
					</div>
				</div>
			</Box>
		</>
	);
}
