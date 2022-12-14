/* eslint-disable @typescript-eslint/no-explicit-any */
import './UploadCSV.style.scss';
import { useCSVReader } from 'react-papaparse';
import { Button } from '@common/components';

interface Props {
	onUploadSuccess: (result: File) => void;
	disabled?: boolean;
}

export default function UploadCSV({ onUploadSuccess, disabled }: Props) {
	const { CSVReader } = useCSVReader();

	return (
		<CSVReader
			onUploadAccepted={(_: any, file: File) => {
				onUploadSuccess(file);
			}}
		>
			{({ getRootProps, acceptedFile, ProgressBar }: any) => {
				return (
					<>
						<div className='upload-csv'>
							<div>
								<div>{acceptedFile && acceptedFile.name}</div>
								<ProgressBar />
							</div>
							<Button type='primary' {...getRootProps()} disabled={disabled}>
								Add CSV File
							</Button>
						</div>
					</>
				);
			}}
		</CSVReader>
	);
}
