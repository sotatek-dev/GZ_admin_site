import { Button } from '@common/components';
import { useNavigate } from 'react-router';
import { PATHS } from '@common/constants/paths';

export default function BackButton() {
	const navigate = useNavigate();
	const goBack = () => navigate(PATHS.saleRounds.list());
	return <Button onClick={goBack}>Back</Button>;
}
